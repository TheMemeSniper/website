import AIBomp from "../components/AIBomp";
import Navbar from "../components/Navbar";

const PageNotFound: Component<{}, {}> = function () {
  return (
    <div>
      <Navbar currentPage="none" />
      <h1 id="404quote"></h1>
      <h3>page not found :(</h3>
      <script src="scripts/404quotes.js"></script>
      <AIBomp />
    </div>
  );
};

export default PageNotFound;
