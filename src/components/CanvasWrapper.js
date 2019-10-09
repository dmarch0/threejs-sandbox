import React from "react";
import * as three from "three";
import styled from "styled-components";
import { connect } from "react-redux";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import scenes from "../scenes";

class CanvasWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderer: null,
      camera: null,
      scene: null,
      sceneKey: "test",
      controls: null,
      wrapperRef: React.createRef()
    };
    this.wrapperRef = React.createRef();
  }
  componentDidMount() {
    //create renderer
    const renderer = new three.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(
      this.state.wrapperRef.current.clientWidth,
      this.state.wrapperRef.current.clientHeight
    );

    //add renderer to DOM
    this.state.wrapperRef.current.appendChild(renderer.domElement);

    //create camera
    const camera = new three.PerspectiveCamera(
      75,
      this.state.wrapperRef.current.clientWidth /
        this.state.wrapperRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    //add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    this.setState({ renderer, camera, controls });
  }

  animate = cachedScene => {
    //take new scene from props
    const scene = scenes[this.props.scene];
    //if scene which was first rendered by this instance of animate (cachedScene)
    //is not the same that new scene - end animation cycle
    if (scene.scene.uuid !== cachedScene.scene.uuid) {
      return;
    }
    //binding to pass cached scene deep
    requestAnimationFrame(this.animate.bind(this, cachedScene));
    this.state.renderer.render(scene.scene, this.state.camera);
    scene.update();
  };

  componentDidUpdate(prevProps, prevState) {
    const scene = scenes[this.props.scene];
    scene.init();
    //if prev scene is the same as the new one dont call animate again
    //and if not first update
    if (prevState.camera && prevState.renderer) {
      if (scenes[prevProps.scene].scene.uuid === scene.scene.uuid) {
        return;
      }
    }

    this.animate(scene);
  }

  render() {
    return (
      <div className={this.props.className} ref={this.state.wrapperRef}></div>
    );
  }
}

const StyledWrapper = styled(CanvasWrapper)`
  width: 100%;
  height: 100vh;
  canvas {
    width: 100%;
    height: 100%;
  }
`;

const mapStateToProps = state => ({ scene: state.scene });

export default connect(
  mapStateToProps,
  {}
)(StyledWrapper);
