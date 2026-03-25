// I hate typescript so much
// Only good feature is enums

import { stratagems, categories} from "./stratagems"
const arrowContainer = document.getElementById("arrow-container") as HTMLDivElement
const arrowTemplate = document.getElementById("arrow-template") as HTMLTemplateElement
const nameHeader = document.getElementById("name-header")
const correctCounter = document.getElementById("correct-count")
const incorrectCounter = document.getElementById("incorrect-count")

const audioBaseURL = "/audio/toybox/stratagem-hero/"

const inputSound = new Audio(audioBaseURL + "input.mp3")
const incorrectSound = new Audio(audioBaseURL + "incorrect.mp3")
const correctSound = new Audio(audioBaseURL + "correct.mp3")

const updateSetButton = document.getElementById("update-sets")

let correct = 0
let incorrect = 0

enum StratagemInputs {
	ANY = "*",
	UP = "ArrowUp",
	DOWN = "ArrowDown",
	LEFT = "ArrowLeft",
	RIGHT = "ArrowRight",
}

let inputIndex = 0
let currentStratagem
let currentSequence: StratagemInputs[] = []

let activeStratagems = stratagems;

function addArrow(direction: StratagemInputs, inputIndex: number) {
	const arrowFragment = document.importNode(arrowTemplate!.content, true)
	const arrow = arrowFragment.querySelector("svg")
	switch (direction) {
		case StratagemInputs.LEFT:
			arrow!.style = "transform: rotate(-90deg)"
			break
		case StratagemInputs.DOWN:
			arrow!.style = "transform: rotate(180deg)"
			break
		case StratagemInputs.RIGHT:
			arrow!.style = "transform: rotate(90deg)"
			break
	}
	arrow!.id = "arrow-" + inputIndex
	arrowContainer!.appendChild(arrowFragment)
	return arrowFragment
}

function inputToInputEnum(input: string): StratagemInputs | false {
	if (Object.values(StratagemInputs).includes(input as StratagemInputs)) {
		return input as StratagemInputs
	}
	return false
}

function waitForStratagemInput() {
	return new Promise((resolve) => {
		function onKeyHandler(e: KeyboardEvent) {
			let input = e.key
			if (e.key == "ArrowUp" || e.key == "ArrowDown") {
				e.preventDefault() // prevents the arrow keys from scrolling the page
			}
			switch (input) {
				case "w":
					input = "ArrowUp"
					break
				case "a":
					input = "ArrowLeft"
					break
				case "s":
					input = "ArrowDown"
					break
				case "d":
					input = "ArrowRight"
					break
			}
			const inputCoerced = inputToInputEnum(input)
			if (inputCoerced) {
				resolve(inputCoerced)
			}
		}
		document.addEventListener("keydown", onKeyHandler)
	})
}

function pickNextStratagem() {
	arrowContainer!.innerHTML = ""
	currentStratagem = activeStratagems[Math.floor(Math.random() * activeStratagems.length)]
	nameHeader!.innerText = currentStratagem!.name
	currentSequence = []
	inputIndex = 0
	const splitRaw = currentStratagem?.sequence.split("")
	for (const input of splitRaw!) {
		switch (input) {
			case "U":
				currentSequence.push(StratagemInputs.UP)
				break
			case "L":
				currentSequence.push(StratagemInputs.LEFT)
				break
			case "R":
				currentSequence.push(StratagemInputs.RIGHT)
				break
			case "D":
				currentSequence.push(StratagemInputs.DOWN)
				break
		}
	}
	buildArrows()
}

function buildArrows() {
	currentSequence.forEach((arrow, index) => {
		addArrow(arrow, index)
	})
}

function changeArrowState(arrowIndex: number, state: boolean) {
	const arrow = document.getElementById("arrow-" + arrowIndex)
	if (state) {
		arrow?.classList.add("active")
	} else {
		arrow?.classList.remove("active")
	}
}

function updateStratagemList() {
	activeStratagems = []
	for (const category in categories) {
		const categoryCheckbox = document.getElementById(category) as HTMLInputElement
		if (!categoryCheckbox!.checked) {
			continue
		}
		const checkboxes = document.querySelectorAll("." + category)
		for (const input in checkboxes) {
			const gemCheckbox = checkboxes[input] as HTMLInputElement
			if (gemCheckbox.checked) {
				activeStratagems.push(stratagems.find(obj => obj!.name === checkboxes[input]!.id)!);
			}
		}
	}
}

updateStratagemList()

updateSetButton!.onclick = () => {
	updateStratagemList()

	pickNextStratagem()
}


while (true) {
	let input = await waitForStratagemInput()

	if (!currentStratagem) {
		pickNextStratagem()
	} else {
		if (input != currentSequence[inputIndex]) {
			incorrectSound.currentTime = 0
			incorrectSound.play()
			incorrect++
			incorrectCounter!.textContent = "incorrect: " + incorrect
			inputIndex = 0
			currentSequence.forEach((_arrow, index) => {
				changeArrowState(index, false)
			})
		} else if (input == currentSequence[inputIndex]) {
			changeArrowState(inputIndex, true)
			inputIndex++
			if (inputIndex == currentSequence.length) {
				pickNextStratagem()
				correctSound.play()
				correct++
				correctCounter!.textContent = "correct: " + correct
			} else {
				const sound = inputSound.cloneNode(true) as HTMLAudioElement
				sound.playbackRate = inputIndex * 1.2
				sound.play()
			}
		}
	}
}
