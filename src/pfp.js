const wetdryprofile = await fetch(
	"https://wetdry.world/api/v1/accounts/109768514398335264"
).then((res) => res.json())
const avatar_static = wetdryprofile.avatar_static
var avatar_source = wetdryprofile.fields[4].value

document.getElementById("pfp").src = avatar_static
if (avatar_source.startsWith("<a")) {
	var index = avatar_source.search('href="')
	if (index == -1) {
		document.getElementById("pfpsource").textContent = "error while fetching mastodon profile information"
		throw new Error(".search() failed on avatar_source")
	}
	console.log(avatar_source.indexOf('"', index + 2))
	avatar_source = avatar_source.substring(index + 6, avatar_source.indexOf('"', index + 6));
	

	}
document.getElementById("pfpsource").textContent = "pfp source: " + avatar_source