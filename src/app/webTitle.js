import {html, render} from "lit";

export class WebTitle extends HTMLElement {

    _interation = 0;

    set iteration(i) {
        this._interation = i;
        this.render()
    }

    constructor() {
        super();
        this.attachShadow({mode:"open"})
    }

    connectedCallback() {
        this.render();
    }

    render() {
        render(
            html`
                <h1>
                    <style>
                        ::slotted(img) {
                            height: 2em;
                        }
                    </style>
                    <slot name="logo"></slot>
                    ${this._interation + 1}. <slot></slot>
                </h1>
            `,
            this.shadowRoot
        )
    }
}
customElements.define("web-title", WebTitle)