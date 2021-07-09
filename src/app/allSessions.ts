import {customElement, property} from "lit/decorators";
import {html, LitElement} from "lit";
import {Session, SessionAware, SESSIONS} from "../data";
import {repeat} from "lit/directives/repeat";

@customElement("all-sessions")
class AllSessions extends LitElement {

    @property()
    private currentSession: Session|null = null


    protected render(): unknown {
        return html`
            <div>
                Finished
                <ol>
                    ${
                            repeat(
                                    SESSIONS,
                                    it => it.id,
                                    it => html`
                                <li @click="${() => this.handleSelectSession(it)}">
                                    ${it.id === this.currentSession!.id ? "👁‍🗨 " : ""}${it.name}
                                </li>`
                            )
                    }
                    <li>
                        <input size="32" placeholder="Dein Vorschlag"><button>Jetzt beitragen</button>
                    </li>
                </ol>
            </div>
        `
    }

    private handleSelectSession(session: Session) {
        this.dispatchEvent(new CustomEvent<SessionAware>("selectSession", { detail: {session}}))
    }
}