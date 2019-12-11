import { VenomComponent, template } from "venom-js";
import DefaultWindowIcon from "../assets/venom-logo.png";
import "./window.component.scss";
import windowState from "./window.state";

export default class Window extends VenomComponent {
    title = 'Venom Window';
    width = 500;
    height = 300;
    icon;
    top = 0;
    left = 0;
    pos1 = 0;
    pos2 = 0;

    constructor() {
        super();
        windowState.zIndexes[this.id] = windowState.zIndexCounter;
    }

    dragMouseDown = e => {
        e = e || window.event;
        e.preventDefault();
        this.pos1 = e.clientX;
        this.pos2 = e.clientY;
        document.onmouseup = () => {
            document.onmouseup = null;
            document.onmousemove = null;
        };
        // call a function whenever the cursor moves:
        document.onmousemove = e => {
            e = e || window.event;
            e.preventDefault();
            this.top = this.top - this.pos2 + e.clientY;
            this.left = this.left - this.pos1 + e.clientX;
            this.pos1 = e.clientX;
            this.pos2 = e.clientY;
        };
    }

    mousedown = () => {
        windowState.zIndexes[this.id] = windowState.zIndexCounter;
        windowState.zIndexCounter++;
    };

    render() {
        return template`
            <div
                class="window"
                style="width: ${this.width}px;
                       height: ${this.height}px;
                       top: ${this.top}px;
                       left: ${this.left}px;
                       z-index: ${windowState.zIndexes[this.id]};
                       display: ${this.display}"
                onmousedown=${this.mousedown}
            >
                <div class="window-header" onmousedown=${this.dragMouseDown}>
                    <div class="window-header-left">
                        <div class="window-header-icon">${this.icon.get() ? this.icon : template`<img src="${DefaultWindowIcon}"/>`}</div>
                        <div class="window-header-title">${this.title}</div>
                    </div>
                    <div class="window-header-right">
                        <div class="window-header-action minimize" onclick=${this.onminimize}></div>
                        <div class="window-header-action maximize"></div>
                        <div class="window-header-action close"></div>
                    </div>
                </div>
                <div class="window-body">${this.children}</div>
            </div>
        `;
    }
}