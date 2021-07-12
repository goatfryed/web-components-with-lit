import {customElement, property, query} from "lit/decorators";
import {css, html, LitElement} from "lit";
import {EVENT_SESSION_CREATE} from "../events";

@customElement("session-request-form")
export class SessionRequestForm extends LitElement {

    public static styles = css`
      input:not(:focus):not(:placeholder-shown):invalid {
        border-color: red;
      }
    `

    @property({type: Boolean})
    public disabled = false

    @query("input[name=topic]")
    private topicInput!: HTMLInputElement
    @query("input[name=speaker]")
    private speakerInput!: HTMLInputElement

    private async onSubmit(e: Event) {
        e.preventDefault();
        if (!this.topicInput.validity.valid || !this.speakerInput.validity.valid) return

        const topic = this.topicInput.value.trim();
        const speaker = this.speakerInput.value.trim();

        this.dispatchEvent(
            new CustomEvent(
                EVENT_SESSION_CREATE,
                {
                    composed: true, bubbles: true,
                    detail: {
                        session: {
                            topic,
                            speaker
                        }
                    }
                }
            )
        )

        this.topicInput.value = ""

    }

    protected render(): unknown {
        return html`
            <li>
                <form @submit="${this.onSubmit}">
                    <input name="topic" .disabled="${this.disabled}"
                           required pattern=".{3,}" title="Dein Thema, mindestens 3 Buchstaben"
                           placeholder="Dein Thema"
                           @change="${(e: any) => e.target.value = e.target.value.trim()}"
                    >
                    <input name="speaker" .disabled="${this.disabled}"
                           required
                           placeholder="Name"
                           @change="${(e: any) => e.target.value = e.target.value.trim()}"
                    >
                    <button .disabled="${this.disabled}" type="submit">Session anmelden</button>
                </form>
            </li>
        `;
    }
}