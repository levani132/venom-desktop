import { VenomComponent, template } from "venom-js";
import Button from "../../button/button.component";
import "./counter.component.scss";

export default class Counter extends VenomComponent {
    counter = 0;

    increase = () => {
        this.counter++;
        const counterLabel = document.querySelector(`#id${this.id}`);
        counterLabel.classList.add('grown');
        setTimeout(() => counterLabel.classList.remove('grown'), 50);

    };

    render() {
        return template`
            <div class="counter">
                <${Button} onclick="${() => this.increase()}">
                    <div>Click to increase</div>
                    <div id="id${this.id}" class="button-counter">${this.counter}</div>
                </>
            </div>
        `;
    }
}