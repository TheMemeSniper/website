const quotes = [
  "ああ あなたの右どなり, わたし きゅうくらりん",
  "Nano, you're just Nano. Isn't that enough?",
  "Scream it out, that venom too",
  "If you sleep right after eating you'll turn into an ox, are you a savage if you wake up and go back to sleep?",
  "Where is my soul now, doctor?",
  "明日は何になる? やがて君になる",
  "I couldn't wait for you to come and clear the cupboards",
  "もう一回、もう一回。私をどうか転がしてと",
  "I'll tell you why I want to destroy Arasaka, but I'll only tell you once.",
  "bunny bunny bunny bunny",
  "I SWORE I'D NEVER SIN AGAIN, BUT MY PATIENCE'S RUNNING THIN",
  "I really like random quotes"
]
const chosen = quotes[Math.floor(Math.random() * quotes.length)]
document.getElementById("footer-quote").textContent = `"${chosen}"`
