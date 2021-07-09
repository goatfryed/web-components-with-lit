import {Session, SessionAware, SESSIONS} from "../data";
import {html, render} from "lit";

import "./webTitle";
import "./currentSession";
import "./allSessions"

export class LitHtmlApp extends HTMLElement {


    private _currentSession: Session = SESSIONS[0];

    public set currentSessionId(id: number) {
        this.currentSession = SESSIONS[id];
        this.update();
    }

    private set currentSession(session: Session) {
        this._currentSession = session;
        this.update();
    }

    constructor() {
        super();
        if (this.hasAttribute("initial-selected")) {
            this._currentSession = SESSIONS[parseInt(this.getAttribute("initial-selected")!)]
        }
        this.attachShadow({mode: 'open'});
        this.update();
    }

    render() {
        return html`
            <div>
                <web-title .iteration="${43}">Kasseler Webmontag</web-title>
                <hr/>
                <current-session .session="${this._currentSession}"></current-session>
                <hr/>
                <all-sessions .currentSession="${this._currentSession}"
                    @selectSession="${this.onSelectSession}"
                ></all-sessions>
            </div>
        `
    }

    public onSelectSession(e: CustomEvent<SessionAware>) {
        this.currentSession = e.detail.session
    }

    private update() {
        render(
            this.render(),
            this.shadowRoot!
        )
    }
}
customElements.define("lit-html-app", LitHtmlApp)