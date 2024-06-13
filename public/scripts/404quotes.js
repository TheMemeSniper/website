const quotes = [
  "Gordon, you LOUSY motherfucker,,",
  "honk shoo honk shoo",
  "Under where?",
  "They're going to SAW OFF, MY FINGERS, I need to build my website.",
];

const chosen = quotes[Math.floor(Math.random() * quotes.length)];
document.getElementById("404quote").textContent = `"${chosen}"`;
