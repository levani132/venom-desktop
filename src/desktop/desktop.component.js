import { VenomComponent, template } from "venom-js";
import Button from "../button/button.component";
import shellState from "../shell/shell.state";
import VenomLogo from "../assets/venom-logo.png";
import "./desktop.component.scss";

const [, shellStateService] = shellState();

export default class Desktop extends VenomComponent {
    counter;

    increase = () => {
      this.counter++;
      const buttonCounter = document.querySelector('.button-counter');
      buttonCounter.classList.add('grown');
      setTimeout(() => buttonCounter.classList.remove('grown'), 50);
    };

    render() {
        return template`
        <div class="desktop">
            <div class="file" ondblclick=${() => shellStateService.openWindow(() => template`
            <${Button} onclick="${this.increase}">
                <div>Click to increase</div>
                <div class="button-counter">${this.counter}</div>
            </>
            `)}>
                <div class="file-icon"><img src="${VenomLogo}"/></div>
                <div class="file-title">Counter App</div>
            </div>
            <div class="file" ondblclick=${() => shellStateService.openWindow(() => template`
                <div>Second Window</div>
            `)}>
                <div class="file-icon"><img src="${VenomLogo}"/></div>
                <div class="file-title">Second File</div>
            </div>
        </div>
        `;
    }
}