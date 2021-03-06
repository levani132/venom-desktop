import { VenomComponent, template } from "venom-js";
import Window from "../window/window.component";
import shellState from "./shell.state";

const [state, stateService] = shellState();

export default class Shell extends VenomComponent {
    windows = [];

    onminimize = i => {
        state.displays[i] = state.displays[i] === 'none' ? '' : 'none';
    };

    onclose = i => {
        state.windows = [...state.windows.slice(0, i), ...state.windows.slice(i + 1)];
    };

    render() {
        return template`
            <div class="shell">
            ${state.windows.map((window, i) => template`
                <${Window} display=${state.displays[i]} onminimize=${() => this.onminimize(i)} onclose=${() => this.onclose(i)}>${window}</>
            `)}
            </div>
        `;
    }
}