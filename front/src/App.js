import VideoFeed from "./containers/VideoPage";
import TopPage from "./containers/TopPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ColorPage from "./containers/ColorPage";
import TemplatePage from "./containers/TemplatePage";
import ConfirmationPage from "./containers/ConfirmationPage";
import { useState } from "react";

function App() {
  const [imgURL, setImgURL] = useState("");
  return (
    <Router>
      <div className="App">
        <Route exact path="/">
          <TopPage />
        </Route>
        <Route path="/video">
          <VideoFeed></VideoFeed>
        </Route>
        <Route path="/color">
          <ColorPage />
        </Route>
        <Route path="/template">
          <TemplatePage setImgURL={setImgURL} />
        </Route>
        <Route path="/confirmation">
          <ConfirmationPage imgURL={imgURL} />
        </Route>
      </div>
    </Router>
  );
}

export default App;
