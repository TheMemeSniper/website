const Navbar: Component<{ currentPage: string }, {}> = function () {
  this.mount = () => {
    if (this.currentPage == "none") return;
    try {
      this.root
      .querySelector(`#${this.currentPage}`)
      ?.classList.add("navbar-item-current");
    } catch (e) {
      this.root.firstElementChild?.classList.add("look-at-me");
      console.error(e);
    }
  };
  return (
    <ul class="navbar">
      <li>
        <a href="/">
          <img aria-hidden="true" src="images/icons/icon.png" />
        </a>
      </li>
      <li id="home">
        <a href="/">Home</a>
      </li>
      <li id="projects">
        <a href="/projects">Projects</a>
      </li>
      <li id="credits">
        <a href="/credits">Credits</a>
      </li>
    </ul>
  );
};

export default Navbar;
