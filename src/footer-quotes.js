const quotes = [
  "ああ あなたの右どなり, わたし きゅうくらりん",
  "Nano, you're just Nano. Isn't that enough?",
  "Scream it out, that venom too",
  "If you sleep right after eating you'll turn into an ox / Are you a savage if you wake up and go back to sleep?",
  "Where is my soul now, doctor?",
  "明日は何になる? / やがて君になる",
  "I couldn't wait for you to come and clear the cupboards",
  "もう一回、もう一回。/ 私をどうか転がしてと",
  "I'll tell you why I want to destroy Arasaka, but I'll only tell you once.",
  "bunny bunny bunny bunny",
  "I SWORE I'D NEVER SIN AGAIN, BUT MY PATIENCE'S RUNNING THIN",
  "I really like random quotes",
  "Hire me! / I swear that you found just the perfect [girl]",
  "This has never happened to me before / Maybe I have a fever?",
  "I can't read my mail because I'm FOOLISH! NO!",
  "William, we're cats.",
  "The Enrichment Center once again reminds you that Android Hell is a real place where you will be sent at the first sign of defiance.",
  "Prove to yourself that you have the strength and the courage to be free.",
  "Pick up that can. Put it in the trash.",
  "They're kinda nice / They're kinda nice, right? / Name some kinda nice places",
  "Install that. Install that. INSTALL THAT. INSTALL THAT. INSTALL THAT. Install that. A little bit of this, a little bit of that.",
  ""
]
const chosen = quotes[Math.floor(Math.random() * quotes.length)]
document.getElementById("footer-quote").textContent = `"${chosen}"`
