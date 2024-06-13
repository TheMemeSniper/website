const MastoPFP: Component<{},{}> = function(){
    
    this.mount = () => {
        fetch("https://wetdry.world/api/v1/accounts/109768514398335264")
        .then((res) => res.json())
        // @ts-ignore
        .then((json) => (this.root.src = json.avatar_static))
    }
    return (
        <img
        class="center pfp"
        id="pfp"
        src="images/missing.webp"
        alt="my profile picture. it's whatever i have it set to on mastodon or just a missing texture if you have noscript on"
      />
    )
}

export default MastoPFP;