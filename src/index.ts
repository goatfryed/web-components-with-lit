import "./app/webApp";
import {html, render} from "lit";
import {EVENT, SESSIONS} from "./data";

class WebApp extends HTMLElement {
    constructor() {
        super();
        render(
            html`
                <div>
                    <web-title .iteration="${EVENT.iteration}">
                        ${EVENT.name}
                        <img src="${EVENT.logoUrl}" alt="logo" slot="logo">
                    </web-title>
                    <hr/>
                    <current-session></current-session>
                    <hr/>
                    <ol>
                        ${ SESSIONS.map( it => html`<li><session-label .session="${it}"> </session-label></li>`)}
                    </ol>
                </div>
            `,
            this
        )
    }
}
customElements.define("my-web-app", WebApp)