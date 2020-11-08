import VideoFeed from "./containers/VideoPage";
import TopPage from "./containers/TopPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ColorPage from "./containers/ColorPage";
import TemplatePage from "./containers/TemplatePage";
import ConfirmationPage from "./containers/ConfirmationPage";
import ResultPage from "./containers/ResultPage";
import { useState } from "react";
import ErrorPage from "./containers/ErrorPage";

function App() {
  const [imgURL, setImgURL] = useState("");
  const [personalColor, setPersonalColor] = useState("");
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
          <ColorPage setPersonalColor={setPersonalColor} />
        </Route>
        <Route path="/template">
          <TemplatePage setImgURL={setImgURL} />
        </Route>
        <Route path="/confirmation">
          <ConfirmationPage imgURL={imgURL} />
        </Route>
        <Route path="/result">
          <ResultPage personalColor={personalColor} />
        </Route>
        <Route path="/error">
          <ErrorPage />
        </Route>
      </div>
    </Router>
  );
}

export default App;
