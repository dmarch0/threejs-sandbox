import { SWITCH_SCENE } from "./types";

export const switchScene = scene => ({ type: SWITCH_SCENE, payload: scene });
