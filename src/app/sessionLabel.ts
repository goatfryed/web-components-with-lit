import {customElement, property} from "lit/decorators";
import {Session} from "../data";
import {LitElement} from "lit";

@customElement("session-label")
class SessionLabel extends LitElement {
    @property()
    public session!: Session

    protected render(): unknown {
        return this.session.topic + " -  by " + this.session.speaker
    }
}