import {SESSIONS} from "../data";
import {html, render} from "lit";
import {repeat} from "lit/directives/repeat"

import "./webTitle";
import "./currentSession";

export class LitHtmlApp extends HTMLElement {

    private _currentSessionId: number;

    public set currentSessionId(id: number) {
        this._currentSessionId = id;
        this.update();
    }

    private get currentSession() {
        return SESSIONS[this._currentSessionId]
    }

    constructor() {
        super();
        this._currentSessionId = parseInt(this.getAttribute("initial-selected") || "0");
        this.attachShadow({mode: 'open'});
        this.update();
    }

    render() {
        return html`
            <div>
                <web-title .iteration="${43}">Kasseler Webmontag</web-title>
                <hr/>
                <current-session .session="${this.currentSession}"></current-session>
                <hr/>
                <div>
                    Finished
                    <ol>
                        ${
                            repeat(
                                SESSIONS,
                                it => it.id,
                                it => html`
                                <li @click="${() => this.currentSessionId = it.id}">
                                    ${it.id === this.currentSession.id ? "👁‍🗨 " : ""}${it.name}
                                </li>`
                            )
                        }
                        <li>
                            <input size="32" placeholder="Dein Vorschlag"><button>Jetzt beitragen</button>
                        </li>
                    </ol>
                </div>
            </div>
        `
    }

    private update() {
        render(
            this.render(),
            this.shadowRoot!
        )
    }
}
customElements.define("lit-html-app", LitHtmlApp)