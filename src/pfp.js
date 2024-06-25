const wetdryprofile = await fetch(
	"https://wetdry.world/api/v1/accounts/109768514398335264"
).then((res) => res.json())
const avatar_static = wetdryprofile.avatar_static
const avatar_source = wetdryprofile.fields[4].value

document.getElementById("pfp").src = avatar_static
document.getElementById("pfpsource").textContent = "pfp source: " + avatar_source