import { VenomValue, render } from "venom-js";

const state = new VenomValue({
    windows: [],
    displays: []
});

class StateService {
    static openWindow(window) {
        state.displays.push('');
        state.windows.push(render(window));
    }
}

export default () => [state, StateService];