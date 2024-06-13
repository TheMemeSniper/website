import AIBomp from "../components/AIBomp";
import Navbar from "../components/Navbar";

const Credits: Component<{}, {}> = function () {
  return (
    <div>
      <Navbar currentPage="credits" />
      <h1>credits</h1>
      <h2>under one unified world</h2>
      <br />
      <h1>contributors</h1>
      <h3>Jack - fixing my awful css, encouraging optimizations</h3>
      <br />
      <h1>other stuff used</h1>
      <h3>catppuccin frappe - website colors</h3>
      <br />
      <h1>software used</h1>
      <h3>vscode</h3>
      <h3>prettier</h3>
      <h3>arch linux</h3>
      <h3>dreamland</h3>
      <br />
      <h3>thanks to everyone who's been with me so far</h3>
      <h3>you've been a great help</h3>
      <AIBomp />
    </div>
  );
};

export default Credits;