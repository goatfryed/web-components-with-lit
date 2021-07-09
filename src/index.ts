import "./app/litHtmlApp";
import "./app/litElementApp";

class WebApp extends HTMLElement {

    constructor() {
        super();
        this.innerHTML = `
            <lit-element-app initial-selected="1"></lit-element-app>
        `
    }
}

customElements.define("web-app", WebApp)
