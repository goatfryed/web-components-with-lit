import {css, html, render} from "lit";

export class WebTitle extends HTMLElement {

    static styles = css`
    `

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
                <style>
                    ::slotted([slot=logo]) {
                        height: 2em;
                        width: 2em;
                    }
                </style>
                <h1>
                    <slot name="logo"></slot>
                    ${this._iteration + 1}. <slot></slot>
                </h1>
            `,
            this.shadowRoot
        )
    }
}
customElements.define("web-title", WebTitle)