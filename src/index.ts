import "./app/webApp";

class WebApp extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div>
                <web-title iteration="34">Kasseler Webmontag</web-title>
                <hr/>
                <current-session></current-session>
                <hr/>
                <ol>
                    <li>React Hooks🎣 lifecoding - Nico</li>
                    <li>Web components mit lit 🔥 - Omar</li>
                    <li>next level html mit jQuery - Internet Explorer</li>
                </ol>
            </div>
        `
    }
}
customElements.define("my-web-app", WebApp)