import {html, render} from "lit";

export class WebTitle extends HTMLElement {

    _iteration = 0;

    set iteration(iteration) {
        this._iteration = iteration;
        this.render();
    }

    constructor() {
        super();
        this.attachShadow({mode:"open"})
        this.render();
    }

    render() {
        render(
            html`
                <h1>
                    ${this._iteration + 1}. <slot></slot>
                </h1>
            `,
            this.shadowRoot
        )
    }
}
customElements.define("web-title", WebTitle)