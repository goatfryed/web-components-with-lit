import {html, LitElement} from "lit";
import {customElement, property} from "lit/decorators";
import {Session} from "../data";

@customElement("current-session")
class CurrentSession extends LitElement {

    @property()
    private session: Session|null = null;

    protected render(): unknown {
        console.log("rendering", this)
        return html`
            Aktuelle Session: ${html`<h2>${this.session!.name}</h2>`}
        `
    }
}