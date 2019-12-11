import {template, VenomComponent} from "venom-js";
import Header from "./header/header.component";
import Shell from "./shell/shell.component";
import "./app.component.scss";
import Desktop from "./desktop/desktop.component";

export default class AppComponent extends VenomComponent {
  constructor() {
    super();
    this.counter = 0;
  }

  render() {
    return template`
      <div class="my-app">
        <${Header} counter=${this.counter}></>
        <${Desktop} counter=${this.counter}></>
        <${Shell}></>
      </div>
    `;
  }
}