const quotes = [
    "Gordon, you LOUSY motherfucker,,",
    "honk shoo honk shoo",
    "Under where?",
    "They're going to SAW OFF, MY FINGERS, I need to build my website.",
    "Your webpage ran into a problem and needs to renavigate. Stop code: 404",
    "shiku shiku",
    "I can't [build] a [website]",
    "I was never 200 smart I'm 404 smart",
    "Processor: ARM11 (core 1) Exception type: 404",
    "Failed to open SafeB9SInstaller.bin",
    "What is wrong with (my website)",
    "A visitor? Hmmm... indeed, I have slept long enough.",
    "That's it. I've reached my breaking point. I'm switching to [React] and...",
    "Make me a website a shop don't name it weird shit name it like k8's corner or sum...",
    "Whatttt [astro] is probably too confusing nobody even knows how to code in it...",
    "Unable to decrypt: The sender's device has not sent us the keys for this webpage.",
    "coca-cola. COCA-COLA, don't forget de ice. aaaAAAAND: i'm not making money...",
    "machine, turn back now. the layers of this website are not for your kind.",
    `The phrase "It's just a [website]" is such a weak mindset. You are ok with what happened...`,
    "Series of tubes",
    "Okay, if I, if I chop you up in a meat grinder...",
    "When I find my site in tons of trouble,\nFriends and colleagues come to me,\nSpeaking words of wisdom,\nwrite in astro",
    "cancel gat 8",
    "go wgat yourself",
    "You are DONE. Fired."
  ];
  
  const chosen = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("404quote").textContent = `"${chosen}"`;
  