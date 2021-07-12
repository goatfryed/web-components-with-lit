import {css, html, render} from "lit";

export class WebTitle extends HTMLElement {

    public static styles = css`
    `

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
            this.shadowRoot!
        )
    }
}
customElements.define("web-title", WebTitle)