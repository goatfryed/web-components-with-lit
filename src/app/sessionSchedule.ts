import {customElement, property } from "lit/decorators";
import {css, html, LitElement} from "lit";
import {Session} from "../data";

import "./scheduledSession"
import "./sessionRequestForm"

@customElement("session-schedule")
class SessionSchedule extends LitElement {

    public static styles = css`
      ::slotted(* li)::before {
        background: red;
        content: " ✔";
      }
    `

    protected render(): unknown {
        return html`
            <ol>
                <slot><p>nothing here</p></slot>
                <session-request-form />
            </ol>
        `
    }
}

