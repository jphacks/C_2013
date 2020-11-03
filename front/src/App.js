import VideoFeed from "./containers/VideoPage";
import TopPage from "./containers/TopPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ColorPage from "./containers/ColorPage";

function App() {
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
      </div>
    </Router>
  );
}

export default App;
