import {customElement, property, state} from "lit/decorators";
import {html, LitElement, render} from "lit";
import {createRef, ref} from "lit/directives/ref";
import {LuckyNumber} from "./luckyNumber";

@customElement("lit-app")
export class LitApp extends LitElement {

    @property() name: string = "Guest"
    @state() luckyNumber: string = "42"
    private input = createRef<HTMLInputElement>();
    private luckyNumberElRef = createRef<LuckyNumber>();

    get luckyNumberEl() {
        return this.luckyNumberElRef.value!;
    }

    private onSubmit(e: InputEvent) {
        e.preventDefault();
        this.luckyNumber = this.input.value!.value
        this.luckyNumberEl.requestUpdate();
    }

    protected render(): unknown {
        return html`
            <div>
                <h1>Hello ${this.name}!</h1>
                <x-lucky-number number="${this.luckyNumber}" ${ref(this.luckyNumberElRef)} >
                    <form slot="input" @submit="${this.onSubmit}">
                        <input ${ref(this.input)}></input>
                    </form>
                </x-lucky-number>
            </div>
        `
    }
}

export function mountApp() {
    const appRoot = document.getElementById("app")!;
    appRoot.querySelectorAll(":scope > *").forEach(it => it.remove());
    render(
        html`
            <x-app name="Web Montag"/>`,
        appRoot,
    );
}