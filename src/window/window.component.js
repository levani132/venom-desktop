import { VenomComponent, template } from "venom-js";
import DefaultWindowIcon from "../assets/venom-logo.png";
import "./window.component.scss";
import windowState from "./window.state";

export default class Window extends VenomComponent {
    title = 'Venom Window';
    width = 500 + 'px';
    height = 300 + 'px';
    oldWidth = 500 + 'px';
    oldHeight = 300 + 'px';
    icon;
    top = 0;
    left = 0;
    oldTop = 0;
    oldLeft = 0;
    pos1 = 0;
    pos2 = 0;
    maximized = 'minimized';

    constructor() {
        super();
        windowState.zIndexes[this.id] = windowState.zIndexCounter;
    }

    dragMouseDown = e => {
        if (this.maximized === 'maximized') return;
        e = e || window.event;
        e.preventDefault();
        this.pos1 = e.clientX;
        this.pos2 = e.clientY;
        document.onmouseup = () => {
            document.onmouseup = null;
            document.onmousemove = null;
        };
        document.onmousemove = e => {
            e = e || window.event;
            e.preventDefault();
            this.top = this.top - this.pos2 + e.clientY;
            this.left = this.left - this.pos1 + e.clientX;
            this.pos1 = e.clientX;
            this.pos2 = e.clientY;
        };
    }

    dragResizeDown = e => {
        if (this.maximized) return;
    };

    mousedown = () => {
        windowState.zIndexes[this.id] = windowState.zIndexCounter;
        windowState.zIndexCounter++;
    };

    handleMaximize = () => {
        this.maximized = this.maximized === 'maximized' ? 'minimized' : 'maximized';
        if (this.maximized === 'maximized') {
            [this.oldHeight, this.oldWidth, this.height, this.width] = [this.height, this.width, '100vh', '100vw'];
            [this.oldTop, this.oldLeft, this.top, this.left] = [this.top, this.left, 0, 0];
        } else {
            [this.height, this.width] = [this.oldHeight, this.oldWidth];
            [this.top, this.left] = [this.oldTop, this.oldLeft];
        }
    };

    render() {
        return template`
            <div
                class="window ${this.maximized}"
                style="width: ${this.width};
                       height: ${this.height};
                       top: ${this.top}px;
                       left: ${this.left}px;
                       z-index: ${windowState.zIndexes[this.id]};
                       display: ${this.display}"
                onmousedown=${this.mousedown}
            >
                <div class="window-border top"></div>
                <div class="window-border right"></div>
                <div class="window-border bottom"></div>
                <div class="window-border left"></div>
                <div class="window-header" onmousedown=${this.dragMouseDown}>
                    <div class="window-header-left">
                        <div class="window-header-icon">${this.icon.get() ? this.icon : template`<img class="venom-logo" src="${DefaultWindowIcon}"/>`}</div>
                        <div class="window-header-title">${this.title}</div>
                    </div>
                    <div class="window-header-right">
                        <div class="window-header-action minimize" onclick=${this.onminimize}></div>
                        <div class="window-header-action maximize" onclick=${this.handleMaximize}></div>
                        <div class="window-header-action close" onclick=${this.onclose}></div>
                    </div>
                </div>
                <div class="window-body">${this.children}</div>
            </div>
        `;
    }
}