import {EVENT, Session, SessionAware, SessionCreateEvent, SESSIONS} from "../data";
import {html, LitElement} from "lit";

import "./webTitle";
import "./currentSession";
import "./sessionSchedule"
import "./sessionLabel"
import {customElement, property} from "lit/decorators";
import {repeat} from "lit/directives/repeat";
import {guard} from "lit/directives/guard";
import {EVENT_SESSION_CREATE} from "../events";


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
        this.addEventListener(EVENT_SESSION_CREATE, this.onSessionCreate as EventListener)
    }

    protected render() {
        if (this.currentSession === null && this.hasAttribute("initial-selected")) {
            this.currentSession = SESSIONS[parseInt(this.getAttribute("initial-selected")!)];
        }


        return html`
            <div>
                <h1>35. Kasseler Webmontag</h1>
                <hr/>
                <current-session .session="${this.currentSession}"></current-session>
                <hr/>
                <session-schedule>
                    ${
                            repeat(SESSIONS, it => it.id,
                                    it => html`<scheduled-session @session-select="${() => this.currentSession = it}">
                                <session-label .session="${it}" />
                            </scheduled-session>`
                            )
                    }
                </session-schedule>
                <span>Lucky number: ${ guard([this.currentSessionId === 2], () => Math.random() * 100)}</span>
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
                    id: 99
                }
                e.detail.resolve && e.detail.resolve()
            }, 500
        )
    }
}