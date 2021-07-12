import {EVENT, Session, SessionAware, SessionCreateEvent, SESSIONS} from "../data";
import {html, LitElement} from "lit";

import "./webTitle";
import "./currentSession";
import "./sessionSchedule"
import "./sessionLabel"
import {customElement, property} from "lit/decorators";
import {repeat} from "lit/directives/repeat";
import {guard} from "lit/directives/guard";


@customElement("web-app")
export class webApp extends LitElement {

    @property({attribute: false})
    private currentSession: Session|null = null;

    public set currentSessionId(id: number) {
        this.currentSession = SESSIONS[id];
    }

    public get currentSessionId() {
        return this.currentSession?.id ?? -1
    }

    constructor() {
        super();
        this.addEventListener("session-create", this.onSessionCreate as EventListener)
    }

    protected render() {
        if (this.currentSession === null && this.hasAttribute("initial-selected")) {
            this.currentSession = SESSIONS[parseInt(this.getAttribute("initial-selected")!)];
        }


        return html`
            <div>
                <web-title iteration="${EVENT.iteration}">
                    ${EVENT.name}
                </web-title>
                <hr/>
                <current-session .session="${this.currentSession}"></current-session>
                <hr/> 
                <session-schedule>
                    ${
                        SESSIONS.map(
                            it => {
                                const type = this.getSessionType(it);
                                return html`
                                <scheduled-session .session="${it}" class="${type}"
                                >
                                    <session-label>${it.topic} - ${it.speaker}</session-label>
                                </scheduled-session>`;
                            }
                        )
                    }
                </session-schedule>
                <span></span>
            </div>
        `
    }

    private getSessionType(it: Session) {
        const currentSessionId = this.currentSession?.id ?? -1;
        return it.id < currentSessionId ? "finished"
            : it.id > currentSessionId ? "upcoming"
                : "running";
    }

    public onSelectSession(e: CustomEvent<SessionAware>) {
        this.currentSession = e.detail.session
    }

    public onSessionCreate(e: SessionCreateEvent) {
        setTimeout(
            () => {
                    this.currentSession = {
                    ...e.detail.session,
                    id: -1
                }
                e.detail.resolve && e.detail.resolve()
            }, 500
        )
    }
}