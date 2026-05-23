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

class BytesDeswizzle {
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
class BytesSwizzle {
	constructor(data, imSize, blockSize, bytesPerBlock, swizzleMode = null) {
		this.data = new Uint8Array(data)
		const datasize = this.data.length
		const [imWidth, imHeight] = imSize
		const [blockWidth, blockHeight] = blockSize

		const expectedDataSize =
			Math.floor((imWidth * imHeight) / (blockWidth * blockHeight)) *
			bytesPerBlock

		if (expectedDataSize !== datasize) {
			throw new Error(
				`Invalid data size.\nExpected datasize: ${expectedDataSize}\nActual datasize: ${datasize}`,
			)
		}

		let tileDatasize, tileWidth, tileHeight

		if (swizzleMode === null) {
			throw new Error(`Swizzle mode required`)
		}
		tileDatasize = 512 * 2 ** swizzleMode
		tileWidth = Math.floor(64 / bytesPerBlock) * blockWidth
		tileHeight = 8 * blockHeight * 2 ** swizzleMode
		this.swizzleDataList = [
			[2 ** swizzleMode, 0],
			[2, 1],
			[4, 0],
			[2, 1],
			[2, 0],
		]
		this.readSize = 16
		this.columnCount = Math.floor((bytesPerBlock * imWidth) / (blockWidth * 16))
		if (datasize % tileDatasize !== 0) {
			throw new Error(
				`Error: Invalid data size. In order to be swizzled, the data size must be a multiple of ${tileDatasize}, while the given datasize is ${datasize}.`,
			)
		}

		if (imWidth % tileWidth !== 0) {
			throw new Error(
				`Error: for this texture encoding, image width should be a multiple of ${tileWidth}, but the given width is ${imWidth}`,
			)
		}

		if (imHeight % tileHeight !== 0) {
			throw new Error(
				`Error: for this texture encoding, image height should be a multiple of ${tileHeight}, but the given height is ${imHeight}`,
			)
		}

		this.tileCount = Math.floor(datasize / tileDatasize)
		this.tilePerWidth = Math.floor(imWidth / tileWidth)
		this.tilePerHeight = Math.floor(imHeight / tileHeight)
		this.rowCount = Math.floor(imHeight / blockHeight)
	}

	_bytesToArray() {
		let readDataIdx = 0
		const array = []

		for (let i = 0; i < this.rowCount; i++) {
			const newRow = []
			for (let j = 0; j < this.columnCount; j++) {
				newRow.push(
					this.data.subarray(readDataIdx, readDataIdx + this.readSize),
				)
				readDataIdx += this.readSize
			}
			array.push(newRow)
		}

		return array
	}

	_splitArrays(arrayList, sectionNumber, axis) {
		const newArrayList = []

		for (const array of arrayList) {
			if (axis === 0) {
				// Split rows (axis 0)
				const chunkSize = Math.floor(array.length / sectionNumber)
				for (let i = 0; i < sectionNumber; i++) {
					newArrayList.push(array.slice(i * chunkSize, (i + 1) * chunkSize))
				}
			} else if (axis === 1) {
				// Split columns (axis 1)
				const chunkSize = Math.floor(array[0].length / sectionNumber)
				for (let i = 0; i < sectionNumber; i++) {
					const newArray = array.map((row) =>
						row.slice(i * chunkSize, (i + 1) * chunkSize),
					)
					newArrayList.push(newArray)
				}
			}
		}

		return newArrayList
	}

	_swizzleTile(arrayList) {
		for (const [sectionNumber, axis] of this.swizzleDataList) {
			arrayList = this._splitArrays(arrayList, sectionNumber, axis)
		}
		return arrayList
	}

	swizzle() {
		const swizzledData = new Uint8Array(this.data.length)
		let offset = 0

		const initialArrayList = [this._bytesToArray()]
		const splitArrayList = this._splitArrays(
			initialArrayList,
			this.tilePerHeight,
			0,
		)
		const finalArrayList = this._splitArrays(
			splitArrayList,
			this.tilePerWidth,
			1,
		)

		for (const array of finalArrayList) {
			const swizzledArrayList = this._swizzleTile([array])
			for (const block of swizzledArrayList) {
				// Extracting the final target chunk (mimics [0][0].item() from Python)
				const chunk = block[0][0]
				swizzledData.set(chunk, offset)
				offset += chunk.length
			}
		}

		if (offset !== this.data.length) {
			throw new Error(
				"An unknown error occurred while swizzling bytes: output data length is (somehow) different than input data length.",
			)
		}

		return swizzledData
	}
}

export { BytesDeswizzle, BytesSwizzle }
