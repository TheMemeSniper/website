function Navbar(currentPage){
    document.getElementById(currentPage).classList.add("navbar-current-page");
    return html`
        <ul class="navbar">
        <li>
          <a href="/"><img aria-hidden="true" src="images/icons/icon.png" /></a>
        </li>
        <li id="home"><a href="/">Home</a></li>
        <li id="projects">
          <a href="/projects.html">Projects</a>
        </li>
        <li id="credits"><a href="/credits.html">Credits</a></li>
      </ul>
    `
}

export default Navbar;
