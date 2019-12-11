import { VenomComponent, template } from "venom-js";
import "./button.component.scss";

export default class extends VenomComponent {
    ripple = e => {
        let target = e.target;
        while (!target.classList.contains('button')) {
            target = target.parentElement;
        }
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        const d = Math.max(target.clientHeight, target.clientWidth);
        ripple.style.height = d + 'px';
        ripple.style.width = d + 'px';
        ripple.style.left = e.clientX - target.getBoundingClientRect().x - d / 2 + 'px';
        ripple.style.top = e.clientY - target.getBoundingClientRect().y - d / 2 + 'px';
        target.appendChild(ripple);
        setTimeout(() => ripple.remove(), 500);
    };

    click = e => {
        this.ripple(e);
        this.onclick(e);
    }

    render() {
        return template`
            <div onclick=${this.click} class="button">
                ${this.children}
            </div>
        `;
    }
}