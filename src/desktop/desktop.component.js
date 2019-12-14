import { VenomComponent, template } from "venom-js";
import shellState from "../shell/shell.state";
import VenomLogo from "../assets/venom-logo.png";
import "./desktop.component.scss";
import Counter from "../programs/counter/counter.component";

const [, shellStateService] = shellState();

export default class Desktop extends VenomComponent {
    counter;

    render() {
        return template`
        <div class="desktop">
            <div class="file" ondblclick=${() => shellStateService.openWindow(() => template`<${Counter} counter=${this.counter}></>`)}>
                <div class="file-icon venom-logo"><img src="${VenomLogo}"/></div>
                <div class="file-title">Global Counter App</div>
            </div>
            <div class="file" ondblclick=${() => shellStateService.openWindow(() => template`<${Counter} counter=${this.counter.copy()}></>`)}>
                <div class="file-icon venom-logo"><img src="${VenomLogo}"/></div>
                <div class="file-title">Counter App</div>
            </div>
            <div class="file" ondblclick=${() => shellStateService.openWindow(() => template`
                <div>Second Window</div>
            `)}>
                <div class="file-icon venom-logo"><img src="${VenomLogo}"/></div>
                <div class="file-title">Second File</div>
            </div>
        </div>
        `;
    }
}