import {html, render} from "lit";

export class WebTitle extends HTMLElement {

    private _iteration: number = 0;

    public set iteration(iteration: number) {
        this._iteration = iteration;
        this.render();
    }

    constructor() {
        super();
        this.attachShadow({mode:"open"})
        this.render();
    }

    private render() {
        render(
            html`
                <h1>${this._iteration + 1}. <slot></slot></h1>
            `,
            this.shadowRoot!
        )
    }
}
customElements.define("web-title", WebTitle)