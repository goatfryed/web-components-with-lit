import {html, render} from "lit";

export class WebTitle extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode:"open"})
        this.render();
    }

    render() {
        render(
            html`
                <h1>
                    ${this.getAttribute("iteration")}. <slot></slot>
                </h1>
            `,
            this.shadowRoot
        )
    }
}
customElements.define("web-title", WebTitle)