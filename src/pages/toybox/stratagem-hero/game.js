import { stratagems, categories } from "./stratagems.js"

const arrowContainer = document.getElementById("arrow-container")
const arrowTemplate = document.getElementById("arrow-template")
const nameHeader = document.getElementById("name-header")
const correctCounter = document.getElementById("correct-count")
const incorrectCounter = document.getElementById("incorrect-count")
const updateSetButton = document.getElementById("update-sets")

const audioBaseURL = "/audio/toybox/stratagem-hero/"
const inputSound = new Audio(audioBaseURL + "input.mp3")
const incorrectSound = new Audio(audioBaseURL + "incorrect.mp3")
const correctSound = new Audio(audioBaseURL + "correct.mp3")

let correct = 0
let incorrect = 0
let inputIndex = 0
let currentStratagem
let currentSequence = []
let activeStratagems = stratagems

const StratagemInputs = Object.freeze({
	ANY: "*",
	UP: "ArrowUp",
	DOWN: "ArrowDown",
	LEFT: "ArrowLeft",
	RIGHT: "ArrowRight",
})

function addArrow(direction, index) {
	const arrowFragment = document.importNode(arrowTemplate.content, true)
	const arrow = arrowFragment.querySelector("svg")

	switch (direction) {
		case StratagemInputs.LEFT:
			arrow.style.transform = "rotate(-90deg)"
			break
		case StratagemInputs.DOWN:
			arrow.style.transform = "rotate(180deg)"
			break
		case StratagemInputs.RIGHT:
			arrow.style.transform = "rotate(90deg)"
			break
	}

	arrow.id = "arrow-" + index
	arrowContainer.appendChild(arrowFragment)
}

function inputToInputEnum(input) {
	if (Object.values(StratagemInputs).includes(input)) {
		return input
	}
	return false
}

function waitForStratagemInput() {
	return new Promise((resolve) => {
		function onKeyHandler(e) {
			let input = e.key

			// Prevent scrolling with arrows
			if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
				e.preventDefault()
			}

			// WASD Support
			const wasdMap = {
				w: "ArrowUp",
				a: "ArrowLeft",
				s: "ArrowDown",
				d: "ArrowRight",
			}
			input = wasdMap[input.toLowerCase()] || input

			const inputCoerced = inputToInputEnum(input)
			if (inputCoerced) {
				document.removeEventListener("keydown", onKeyHandler)
				resolve(inputCoerced)
			}
		}
		document.addEventListener("keydown", onKeyHandler)
	})
}

function pickNextStratagem() {
	arrowContainer.innerHTML = ""
	currentStratagem =
		activeStratagems[Math.floor(Math.random() * activeStratagems.length)]
	nameHeader.innerText = currentStratagem.name

	currentSequence = []
	inputIndex = 0

	const sequenceMap = { U: "UP", L: "LEFT", R: "RIGHT", D: "DOWN" }
	const splitRaw = currentStratagem.sequence.split("")

	for (const char of splitRaw) {
		currentSequence.push(StratagemInputs[sequenceMap[char]])
	}

	buildArrows()
}

function buildArrows() {
	currentSequence.forEach((arrow, index) => {
		addArrow(arrow, index)
	})
}

function changeArrowState(arrowIndex, state) {
	const arrow = document.getElementById("arrow-" + arrowIndex)
	if (arrow) {
		arrow.classList.toggle("active", state)
	}
}

function updateStratagemList() {
	activeStratagems = []
	for (const category in categories) {
		const categoryCheckbox = document.getElementById(category)
		if (!categoryCheckbox?.checked) continue

		const checkboxes = document.querySelectorAll("." + category)
		checkboxes.forEach((gemCheckbox) => {
			if (gemCheckbox.checked) {
				const found = stratagems.find((obj) => obj.name === gemCheckbox.id)
				if (found) activeStratagems.push(found)
			}
		})
	}
}

updateStratagemList()
updateSetButton.onclick = () => {
	updateStratagemList()
	pickNextStratagem()
}

// gam
async function runGame() {
	while (true) {
		let input = await waitForStratagemInput()

		if (!currentStratagem) {
			pickNextStratagem()
			continue
		}

		if (input !== currentSequence[inputIndex]) {
			// u SUCK
			incorrectSound.currentTime = 0
			incorrectSound.play()
			incorrect++
			incorrectCounter.textContent = `incorrect: ${incorrect}`
			inputIndex = 0
			currentSequence.forEach((_, idx) => changeArrowState(idx, false))
		} else {
			// u win
			changeArrowState(inputIndex, true)
			inputIndex++

			if (inputIndex === currentSequence.length) {
				correctSound.play()
				correct++
				correctCounter.textContent = `correct: ${correct}`
				pickNextStratagem()
			} else {
				const sound = inputSound.cloneNode(true)
				sound.playbackRate = 1 + inputIndex * 0.3
				sound.play()
			}
		}
	}
}

runGame()
