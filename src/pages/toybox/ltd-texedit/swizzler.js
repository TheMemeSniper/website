/*
	This is a JavaScript re-implementation of pyswizzle by Aclios
	https://github.com/Aclios/pyswizzle

	MIT License

	Copyright (c) 2024 Aclios

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

export default class BytesDeswizzle {
	constructor(data, im_size, block_size, bytes_per_block, swizzle_mode = null) {
		this.data = new Uint8Array(data)
		const datasize = this.data.length
		const [im_width, im_height] = im_size
		const [block_width, block_height] = block_size

		const expected_data_size =
			Math.floor((im_width * im_height) / (block_width * block_height)) *
			bytes_per_block

		if (expected_data_size !== datasize) {
			throw new Error(
				`Invalid data size. Expected: ${expected_data_size}, Actual: ${datasize}`,
			)
		}

		let tile_datasize, tile_width, tile_height

		if (swizzle_mode === null) {
			throw new Error("Swizzle mode required")
		}
		tile_datasize = 512 * Math.pow(2, swizzle_mode)
		tile_width = Math.floor(64 / bytes_per_block) * block_width
		tile_height = 8 * block_height * Math.pow(2, swizzle_mode)
		this.deswizzle_data_list = [
			[2, 0],
			[2, 1],
			[4, 0],
			[2, 1],
			[Math.pow(2, swizzle_mode), 0],
		]
		this.read_size = 16
		this.read_per_tile_count = 32 * Math.pow(2, swizzle_mode)

		if (datasize % tile_datasize !== 0) {
			throw new Error(
				`Invalid data size. Must be a multiple of ${tile_datasize}.`,
			)
		}

		this.tile_count = Math.floor(datasize / tile_datasize)

		if (im_width % tile_width !== 0 || im_height % tile_height !== 0) {
			throw new Error(
				`Image dimensions must be multiples of ${tile_width}x${tile_height}`,
			)
		}

		this.tile_per_width = Math.floor(im_width / tile_width)
		this.data_read_idx = 0
	}

	__get_tile_data() {
		const array_list = []
		for (let i = 0; i < this.read_per_tile_count; i++) {
			const chunk = this.data.slice(
				this.data_read_idx,
				this.data_read_idx + this.read_size,
			)
			array_list.push([chunk])
			this.data_read_idx += this.read_size
		}
		return array_list
	}

	__concat_arrays(array_list, section_number, axis) {
		const new_array_list = []
		for (let i = 0; i < array_list.length; i += section_number) {
			const section = array_list.slice(i, i + section_number)

			if (axis === 0) {
				// Vertical concat: just flatten the nested arrays into one array of rows
				new_array_list.push(section.flat(1))
			} else {
				// Horizontal concat: join the Uint8Arrays in each corresponding row
				const rowCount = section[0].length
				const combinedRows = []
				for (let r = 0; r < rowCount; r++) {
					const totalLength = section.reduce(
						(sum, block) => sum + block[r].length,
						0,
					)
					const mergedRow = new Uint8Array(totalLength)
					let offset = 0
					for (const block of section) {
						mergedRow.set(block[r], offset)
						offset += block[r].length
					}
					combinedRows.push(mergedRow)
				}
				new_array_list.push(combinedRows)
			}
		}
		return new_array_list
	}

	__deswizzle_tile() {
		let array_list = this.__get_tile_data()
		for (const [section_number, axis] of this.deswizzle_data_list) {
			array_list = this.__concat_arrays(array_list, section_number, axis)
		}
		return array_list[0]
	}

	deswizzle() {
		const tile_list = []
		for (let i = 0; i < this.tile_count; i++) {
			tile_list.push(this.__deswizzle_tile())
		}

		// Concatenate tiles horizontally across the image width
		const tiles_width_concat = this.__concat_arrays(
			tile_list,
			this.tile_per_width,
			1,
		)

		// Concatenate the resulting strips vertically
		const final_grid = this.__concat_arrays(
			tiles_width_concat,
			tiles_width_concat.length,
			0,
		)[0]

		// Flatten the array of Uint8Arrays into one final buffer
		const totalSize = final_grid.reduce((sum, row) => sum + row.length, 0)
		const deswizzled_data = new Uint8Array(totalSize)
		let offset = 0
		for (const row of final_grid) {
			deswizzled_data.set(row, offset)
			offset += row.length
		}

		if (deswizzled_data.length !== this.data.length) {
			throw new Error(
				`Output size mismatch: ${deswizzled_data.length} vs ${this.data.length}`,
			)
		}

		return deswizzled_data
	}
}
