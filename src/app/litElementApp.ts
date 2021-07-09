import {Session, SessionAware, SESSIONS} from "../data";
import {html, LitElement} from "lit";

import "./webTitle";
import "./currentSession";
import "./allSessions"
import {customElement, property} from "lit/decorators";

@customElement("lit-element-app")
export class LitElementApp extends LitElement {

    @property({attribute: false})
    private currentSession: Session|null = null;

    public set currentSessionId(id: number) {
        this.currentSession = SESSIONS[id];
    }

    protected render() {
        if (this.currentSession === null && this.hasAttribute("initial-selected")) {
            this.currentSession = SESSIONS[parseInt(this.getAttribute("initial-selected")!)];
        }
        return html`
            <div>
                <web-title .iteration="${43}">Kasseler Webmontag</web-title>
                <hr/>
                <current-session .session="${this.currentSession}"></current-session>
                <hr/>
                <all-sessions .currentSession="${this.currentSession}"
                    @selectSession="${this.onSelectSession}"
                ></all-sessions>
            </div>
        `
    }

    public onSelectSession(e: CustomEvent<SessionAware>) {
        this.currentSession = e.detail.session
    }
}