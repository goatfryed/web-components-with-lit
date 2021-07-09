import {customElement, property, state} from "lit/decorators";
import {html, LitElement, PropertyDeclaration, PropertyValues} from "lit";

@customElement("x-lucky-number")
export class LuckyNumber extends LitElement {

    @property() name: string = "Guest";
    @property() number: string = "7";

    @state() private luckyNumber: number = 0;
    @state() private streak: number = 0;

    protected update(changedProperties: PropertyValues) {
        super.update(changedProperties);
        if (changedProperties.has("streak")) {
            return;
        }
        let nextLuckyNumber = parseInt(
            Math.random() >= 0.5 ? this.number : this.number.split("").reverse().join("")
        );
        this.streak = nextLuckyNumber == this.luckyNumber ? this.streak + 1 : 0;
        this.luckyNumber = nextLuckyNumber;
    }

    render() {
        return html`
            <p>What is your lucky number?</p>
            <slot name="input"></slot>
            <p>Ah, so your lucky number is ${this.luckyNumber}. That's a ${Array(this.streak).fill("really ")} lucky number</p>
        `
    }
}