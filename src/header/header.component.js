import { VenomComponent, template } from "venom-js";
import VenomLogo from "../assets/venom-logo.png";
import "./header.component.scss";

export default class extends VenomComponent {
    counter;
    render() {
        return template`
            <div class="header">
                <div class="header-left">
                    <img class="venom-logo" src=${VenomLogo}></img>
                    <span class="venom">𝓥𝓮𝓷𝓸𝓶</span>
                </div>
                <div class="counter"><div>${this.counter}</div></div>
            </div>
        `;
    }
}