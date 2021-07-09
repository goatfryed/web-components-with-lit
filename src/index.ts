import "./app/litHtmlApp";

class WebApp extends HTMLElement {

    constructor() {
        super();
        this.innerHTML = `
            <lit-html-app initial-selected="1"></lit-html-app>
        `
    }
}

customElements.define("web-app", WebApp)
