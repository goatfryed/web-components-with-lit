import "./app/webApp";

class WebApp extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <div>
                <h1>35. Kasseler Webmontag</h1>
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