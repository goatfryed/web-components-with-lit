import {html, LitElement} from "lit";
import {customElement, property} from "lit/decorators";
import {Session} from "../data";

@customElement("current-session")
class CurrentSession extends LitElement {

    @property({attribute: false})
    private session: Session|null = null;

    protected render(): unknown {
        if (this.session === null) return html`<h2>Waiting for start</h2>`
        return html`
            Aktuelle Session: <h2>${
                html`<session-label .session="${this.session}"></session-label></h2>`
            }</h2>
        `
    }
}