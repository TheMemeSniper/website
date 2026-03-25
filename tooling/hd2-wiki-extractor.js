// This tool extracts the stratagem codes from tables on the HD2 wiki @ https://helldivers.wiki.gg/wiki/Stratagems
// Paste into the devconsole on that page to generate the contents of the array @ ./stratagems.js

let finalConstruction = `
// This file was generated using hd2-wiki-extractor.js - only modify using prettier please :heart:
export const stratagems = [

`
let firstTable = true
let categories = {}

document.querySelectorAll("table").forEach((target) => {
	if (firstTable) {
		firstTable = false // the first table is just the page header
	} else {
		const tableEntries = target.querySelector("tbody").querySelectorAll("tr")
		const category = target.previousElementSibling.textContent
        categories[category] = []
        const categoryEntry = categories[category]
		finalConstruction += "// " + category + " Stratagems\n"
		tableEntries.forEach((entry) => {
			const columns = entry.querySelectorAll("td")
			let obj = { name: "", sequence: "" }
			obj.name = columns[1].textContent
			let seq = ""
			columns[2].querySelectorAll("span").forEach((codeImg) => {
				const itemInner = codeImg.innerHTML
				if (itemInner.includes("Up")) {
					seq += "U"
				} else if (itemInner.includes("Left")) {
					seq += "L"
				} else if (itemInner.includes("Right")) {
					seq += "R"
				} else if (itemInner.includes("Down")) {
					seq += "D"
				} else {
					seq += "?"
				}
			})
			obj.sequence = seq
			finalConstruction += JSON.stringify(obj, null, 4) + ",\n"
            categoryEntry.push(obj.name)
		})
	}
})
finalConstruction += `
];

export const categories = ${JSON.stringify(categories, null, 4)}
`
console.log(finalConstruction)
