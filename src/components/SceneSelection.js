import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import scenes from "../scenes";
import { switchScene } from "../actions/sceneActions";

const SceneSelection = props => {
  const { className, switchScene } = props;
  return (
    <div className={className}>
      <label htmlFor="scene-select">select scene: </label>
      <select
        id="scene-select"
        name="scene"
        onChange={event => switchScene(event.target.value)}
      >
        {Object.keys(scenes).map((key, index) => (
          <option value={key} key={index}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};

const StyledSceneSelection = styled(SceneSelection)`
  position: fixed;
  top: 0px;
  right: 0px;
  background-color: #fff;
`;

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { switchScene }
)(StyledSceneSelection);
