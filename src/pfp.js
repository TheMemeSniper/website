const wetdryprofile = await fetch(
	"https://wetdry.world/api/v1/accounts/109768514398335264"
).then((res) => res.json())
const avatar_static = wetdryprofile.avatar_static
var avatar_source = wetdryprofile.fields[4].value
const sourceTextObj = document.getElementById("pfpsource")

document.getElementById("pfp").src = avatar_static
if (avatar_source.startsWith("<a")) {
	var index = avatar_source.search('href="')
	if (index == -1) {
		sourceTextObj.textContent = "error while fetching mastodon profile information"
		throw new Error(".search() failed on avatar_source")
	}
	avatar_source = avatar_source.substring(index + 6, avatar_source.indexOf('"', index + 6));

	var a = document.createElement('a');
	a.innerText = avatar_source
	a.href = avatar_source
	sourceTextObj.textContent = "pfp source: " 
	sourceTextObj.appendChild(a)

} else {
	sourceTextObj.textContent = "pfp source: " + avatar_source
}
