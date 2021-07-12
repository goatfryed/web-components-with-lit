import {customElement, property} from "lit/decorators";
import {css, html, LitElement} from "lit";
import {Session, SessionAware} from "../data";
import {EVENT_SESSION_SELECT} from "../events";

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
            <li>
                <slot></slot>
            </li>
        `
    }

    private handleSelect() {
    }
}