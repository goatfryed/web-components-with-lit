import "./app/webApp";
import {html, render} from "lit";
import {EVENT, SESSIONS} from "./data";

class WebApp extends HTMLElement {
    constructor() {
        super();
        render(
            html`
                <div>
                    <web-title .iteration="${EVENT.iteration}">${EVENT.name}</web-title>
                    <hr/>
                    <current-session></current-session>
                    <hr/>
                    <ol>
                        ${ SESSIONS.map( it => html`<li>${it.topic} - by ${it.speaker}</li>`)}
                    </ol>
                </div>
            `,
            this
        )
    }
}
customElements.define("my-web-app", WebApp)