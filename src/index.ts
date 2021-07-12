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
                <session-schedule>
                    <scheduled-session>React Hooks🎣 lifecoding - Nico</scheduled-session>
                    <scheduled-session>Web components mit lit 🔥 - Omar</scheduled-session>
                    <scheduled-session>next level html mit jQuery - Internet Explorer</scheduled-session>
                </session-schedule>
                <span></span>
            </div>
        `
    }
}
customElements.define("my-web-app", WebApp)