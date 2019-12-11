import Venom  from "venom-js";
import AppComponent from "./src/app.component.js";

if (module.hot) {
  module.hot.accept()
}

Venom.mount('#app', AppComponent);