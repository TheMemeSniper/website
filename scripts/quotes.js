quotedb = [
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
  ""
];
var chosen = quotedb[Math.floor(Math.random() * quotedb.length)];
document.getElementById("quote").textContent = `"${chosen}"`;

function quoteReroll() {
  var chosen = quotedb[Math.floor(Math.random() * quotedb.length)];
  document.getElementById("quote").textContent = `"${chosen}"`;
}
