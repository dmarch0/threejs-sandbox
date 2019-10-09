import { combineReducers } from "redux";

import sceneReducer from "./sceneReducer";

export default combineReducers({
  test: () => 5,
  scene: sceneReducer
});
