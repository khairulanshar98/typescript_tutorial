import * as React from "react";
import * as ReactDOM from "react-dom";
import './assets/stylesheets/style.scss';
import { App } from "./components/app";

ReactDOM.render(
    <App compiler="TypeScript" framework="React" store="Mobx" />,
    document.getElementById("root")
);
