import {customElement, property} from "lit/decorators";
import {css, html, LitElement} from "lit";
import {Session, SessionAware} from "../data";

@customElement("scheduled-session")
class ScheduledSession extends LitElement {

    public static styles = css`
      :host(.finished) li::before {
        content: " ✔ ";
      }
      :host(.running) li::before {
        content: " 👁‍🗨 ";
      }
    `
    @property()
    private session!: Session;

    protected render() {
        return html`
            <li @click="${this.handleSelect}">
                <session-label .session="${this.session}" />
            </li>
        `
    }

    private handleSelect() {
        this.dispatchEvent(
            new CustomEvent<SessionAware>(
                "select-session"
            )
        )
    }
}