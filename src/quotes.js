const quotes = [
  "I'm Tim Sweeney, I'm the founder of Epic Games",
  "you gotta be as gay as possible on the computer otherwise alan turing died for nothing",
  "it's bare clients officThere are no bare clients",
  "Think twice before using PM2. It breaks everything!",
  "Yeah okay stupid ass",
  "I hit the juckport 17 old computers",
  "All Chromebooks post-2015 contain an enrollment chip.",
  "The enrollment chip is a large chip under a thermal pad",
  "lmk if the damn css sucks",
  "ERROR: Failed to mount the real root device. Bailing out, you are on your own.  Good luck.",
  "-- [ end Kernel panic - not syncing: Attempted to take 30%!",
  "Baka mitowers",
  "Z AXIS IS A FUCK",
  "there's nothing happening",
  "out of the ordinary i mean",
  "And the name of the new console is Wii U!",
  "I got food poisoned,,, That made me angry",
  "https://files.thememesniper.dev/sweeney.zip",
  "why the slop is a homebrew BEAST",
  "TheWoods.cs",
  "PaulMcCartney1994 world's best murder mystery 2 player",
  "If you don't like: Lua, you should try: AGAIN!",
  "hey watson",
  "Imm nano",
  "Nano Shinonome",
  "Give me direct access to port 631 on your machine :steamhappy:",
  "if you can't handle me at my lowercase then you don't deserve me at my uppercase",
  "Imagine if kaitlin got a low taper fade"
]

function quoteReroll() {
  const chosen = quotes[Math.floor(Math.random() * quotes.length)]
  document.getElementById("quote").textContent = `"${chosen}"`
}

window.quoteReroll = quoteReroll
quoteReroll()
