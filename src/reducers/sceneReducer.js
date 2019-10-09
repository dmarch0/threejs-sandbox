import { SWITCH_SCENE } from "../actions/types";

import scenes from "../scenes/index";

const initialState = Object.keys(scenes)[0];

const sceneReducer = (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_SCENE:
      return action.payload;
    default:
      return state;
  }
};

export default sceneReducer;
