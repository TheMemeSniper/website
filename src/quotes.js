const date = new Date()

const conditionalQuotes = {
  browser: () => { // browser quotes
      if (/Firefox/.test(navigator.userAgent)) {
        return [
          date.getFullYear() - 2017 + " years without WebUSB. You know what that does to a person?",
          "https://www.google.com/chrome/",
          "I have google analytics and cloudflare analytics and i let mark zuckerberg put scripts on my site"
        ]
      } else if (/Edg/.test(navigator.userAgent)) {
        return [
          "You're looking at my website on a school computer aren't you",
          "At least you got that surf game right?"
        ]
      } else if (/Chrome/.test(navigator.userAgent)) {
        return [
          "Everything is Chrome in the future!",
          "I'm trying to think of something bad to say about Chrome but its just okay. They implemented everything"
        ]
      } else if (/Safari/.test(navigator.userAgent)) {
        return [
          "you're using safari on your phone i hope",
        ]
      } else {
        return ["are you using a 3DS? :sob:"]
      }
  },
  birthdays: () => { // birthday quotes
    const birthdays = {
      "2-21": "Happy birthday Bocchi!",
      "3-7": "Happy birthday Nano!",
      "3-10": "Happy birthday Mio!",
      "4-17": "Happy birthday Sakamoto!",
      "4-21": "Happy birthday Kita!",
      "5-29": "Happy birthday Nijika!",
      "6-6": "Happy birthday Hakase!",
      "8-31": "im thinking miku miku ooo eee ooo",
      "9-18": "Happy birthday Ryo!",
      "10-24": "Happy birthday Mai!",
      "12-11": "test",
      "12-26": "Happy birthday Yuuko!"
    }
    var quotes = []
    const month = date.getMonth() + 1
    const day = date.getDate()
    const key = month + "-" + day
    if (key in birthdays) {
      quotes.push(birthdays[key])
    }
    return quotes
  },
  dates: () => { // date based quotes
    var quotes = []
    const month = date.getMonth() + 1
    const day = date.getDate()
    if (day === 1) {
      quotes.push("WAKE UP! It's the first of the month! I brush my teeth and count up!")
    }
    return quotes
  },
  misc: () => { // misc conditional quotes
    var quotes = []
    navigator.getBattery().then((bm) => {
      if (bm.level <= 0.2 && !bm.charging) {
        quotes.push("Your shit is at " + bm.level * 100 + "% plug it in")
      }
    })

    return quotes
  }
}

var currentConditionalQuotes = []
for (const func of Object.values(conditionalQuotes)) {
  currentConditionalQuotes = currentConditionalQuotes.concat(func())
}
console.log(currentConditionalQuotes)
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
  "Imagine if kaitlin got a low taper fade",
  "That's right. We're going back in time to the first build of Helldivers II to get Autodesk Stingray OFF the MENU.",
  "HU HU SHENG WEI 🐯🐯🔥🔥🗣️🗣️",
  "If it works in chrome latest i'm shipping it",
  "It's " + date.toLocaleString('default', { month: 'long' }) + ", do you want half a mounds bar",
  "What? Who eats a Mounds bar?",
  "Lua is like the second coming of Christ for the computer",
  "Goober I'm trying to use the computer",
  "Stuzz (Stock Husband) has died in a fatal Sunbeam 10 accident",
  "I got this!",
  "Watch Nichijou",
  "This Shulker Box is Infinite Upgrade do you want to Advanced Restock Upgrade and kill Spacebot???",
  "Yes twin there is no other option 💔",
  "The game",
  "Also don't try Manjaro",
  "Also don't try Arch",
  "Also don't try Gentoo",
  "Also don't try Ubuntu",
  "Actually just don't try Linux",
  "Also don't try Windows",
  "Use MacOS",
  "Listen to inabakumori",
  "Listen to mitchie m",
  "Listen to DECO*27",,
  "Firefox is not supported",
  "We taught this chimpanzee to understand React and he hanged himself",
  "「Do It 結愛せらふ」 Absolute cinema",
  "「かき鳴らせ！！！」",
  "systemd is carrying the linux desktop but nobody wants to admit it",
  "get comfortable while i warm up the neurotoxin emitters (printer hotend)",
  "You're telling me you add a video player, you look at all the video format options available, and you pick Ogg Theora?",
  "This nano is full of hot chocolate for an amazing reason",
  "I don't know how I did it, I was high",
  "「なのちゃんはなのちゃんだし。それでいいんじゃない？」",
  "Bro is a walking health bar fr.",
  "Does she do anything else?",
  "Usseewa 💔",
  "Hello, I am fleeing the American century of humiliation. Can you show me where to buy Nano Shinonome Nendoroid?",
  "I'm chief meterologist, from the weather",
  "[puts a nano nendoroid in your hand] That's a little version of me, user. I want you to have it",
  "Good news for gay people: Shinonome Labs' Doohickey will cause a spacetime collapse in a week and we can't do anything about it",
  "you guys are all MORONS!!! Six seven!?!?! Six seven!?!?!?",
  "Lua: just the facts Nil nil  nil index nil nil nil",
  "During normal operation or in Safe mode, your computer may play 'World is Mine' or '01_ballad' seemingly at random.",
  "Blue hair, blue tie, hiding in your wifi",
  "First we our, then we table. Let's our table!",
  "Get ready to learn Japanese buddy.",
  "i do not 'chatgpt' i do not 'gauth ai' i write the equation into google and if it can't solve it then i kill myself",
  "Allan. We are Soooo fucked.",
  "Now, go away ENA, and get a LIFE! That shall be your quest for today!",
  "otomachi una git push",
  "why so yurious? i'm the fujoker baby!",
  "Wake the Fuck up!!! [horn]",
  "Stop using anti-nano language! Instead of 'robot' say 'normal girl'",
  "voice goals: become vflower",
  "iOS fries be tasting so good ￼",
  "Nano is only rated IP21 please be careful",
  "私はホモ。💔",
  "Have you ever playe Microsoft Jewel with your life on the line?",
  "Hi Im Nano and if I have to make another fucking flexbox I'm going to put a Google engineer in a SAW trap",
  "I do not 'npm build'. I do not 'rollup'. I write the JavaScript and CSS. If I can't download a bundle, then I don't USE IT.",
  ...currentConditionalQuotes
]

console.log(quotes)

function quoteReroll() {
  const chosen = quotes[Math.floor(Math.random() * quotes.length)]
  document.getElementById("quote").textContent = `"${chosen}"`
}

window.quoteReroll = quoteReroll
quoteReroll()
