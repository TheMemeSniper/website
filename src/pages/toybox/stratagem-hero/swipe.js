var initialX = null
var initialY = null
var minSwipeDistance = 50
window.direction = ""

export function startTouch(e) {
	e.preventDefault()
	initialX = e.touches[0].clientX
	initialY = e.touches[0].clientY
}

export function moveTouch(e) {
	if (initialX === null) {
		return
	}
	if (initialY === null) {
		return
	}

	var currentX = e.touches[0].clientX
	var currentY = e.touches[0].clientY

	var diffX = initialX - currentX
	var diffY = initialY - currentY

	if (Math.abs(diffX) > Math.abs(diffY)) {
		if (Math.abs(diffX) > minSwipeDistance) {
			if (diffX > 0) {
				window.direction = "ArrowLeft"
			} else {
				window.direction = "ArrowRight"
			}
			initialX = null
			initialY = null
		}
	} else {
		if (Math.abs(diffY) > minSwipeDistance) {
			if (diffY > 0) {
				window.direction = "ArrowUp"
			} else {
				window.direction = "ArrowDown"
			}
			initialX = null
			initialY = null
		}
	}
}
window.startTouch = startTouch
window.moveTouch = moveTouch
window.direction = direction
