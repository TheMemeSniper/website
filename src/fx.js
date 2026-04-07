let fx = localStorage.getItem("fx")
if (fx !== null) {
	fx = JSON.parse(fx)

	let escTimer = null
	const requiredDuration = 3000

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && !event.repeat) {
			escTimer = setTimeout(() => {
				localStorage.removeItem("fx")
				location.reload()
			}, requiredDuration)
			document.body.classList.add("powerwashing")
		}
	})

	document.addEventListener("keyup", (event) => {
		if (event.key === "Escape") {
			clearTimeout(escTimer)
			escTimer = null
			document.body.classList.remove("powerwashing")
		}
	})

	let style = "<style>"

	if (fx.spin.enabled) {
		style += `
    body {
        animation: spin ${fx.spin.speed}s linear infinite;
    }
    `
		if (fx.spin.direction) {
			style += `
        @keyframes spin {
            from {
                transform: rotate(360deg);
            }
            to {
                transform: rotate(0deg);
            }
        }
        `
		} else {
			style += `
        @keyframes spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        `
		}
	}

	style += "</style>"
	const parser = new DOMParser()
	const parsed = parser.parseFromString(style, "text/html")
	const node = parsed.head.firstChild

	document.head.appendChild(node)
}
