import React from "react";
import "normalize.css";
import { Provider } from "react-redux";

import CanvasWrapper from "./components/CanvasWrapper";
import SceneSelection from "./components/SceneSelection";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <CanvasWrapper />
      <SceneSelection></SceneSelection>
    </Provider>
  );
};

export default App;
