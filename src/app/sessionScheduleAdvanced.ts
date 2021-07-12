import {customElement, property, query} from "lit/decorators";
import {css, html, LitElement, PropertyValues} from "lit";
import {Session} from "../data";

import "./scheduledSession"
import "./sessionInput"
import {classMap} from "lit/directives/class-map";

@customElement("session-schedule")
class SessionScheduleAdvanced extends LitElement {

    public static styles = css`
      ::slotted(* li)::before {
        background: red;
        content: " ✔";
      }
      
      .hidden, .hidden + hr {
        display: none;
      }
      
      .columns {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      
      .column {
        width: fit-content;
      }
    `

    @query("slot[name=finished]")
    public finishedSessions?: HTMLSlotElement
    @query("slot[name=running]")
    public runningSessions?: HTMLSlotElement
    @query("slot[name=upcoming]")
    public upcomingSessions?: HTMLSlotElement
    @query("slot:not([name])")
    public undefinedSessions?: HTMLSlotElement

    @property()
    private currentSession: Session|null = null

    protected render(): unknown {

        const currentStart = (!this.finishedSessions ? 0 : this.finishedSessions.assignedElements().length);
        const upcomingStart = (!this.runningSessions ? 0 : this.runningSessions.assignedElements().length)
            + currentStart

        return html`
            <slot style="display: none" @slotchange="${this.onSlotChange}"></slot>
            <slot style="display: none" name="running" @slotchange="${this.onSlotChange}"></slot>
            <div class="columns">
                <div class="column">
                    Upcoming
                    <ol start="${upcomingStart + 1}">
                        <slot name="upcoming" @slotchange="${this.onSlotChange}"></slot>
                        <session-input />
                    </ol>
                </div>
                <div class="column ${classMap({"hidden": currentStart <= 0})}">
                        Finished
                        <ol>
                            <slot name="finished" @slotchange="${this.onSlotChange}"><p>nothing here</p></slot>
                        </ol>
                    </div>
                </div>
            </div>
        `
    }


    updated(_changedProperties: PropertyValues) {
        for (const [element, observer] of this.observations) {
            if (!this.isSlottedHere(element)) {
                observer.disconnect();
                this.observations.delete(element);
            }
        }
    }


    disconnectedCallback() {
        super.disconnectedCallback();
        for (const observer of this.observations.values()) {
            observer.disconnect()
        }
    }

    private observations = new Map<Element, MutationObserver>()

    protected onSlotChange(e: any) {
        (e.target as HTMLSlotElement).assignedElements()
            .forEach(it => this.manageSlotting(it));

        this.requestUpdate()
    }

    private manageSlotting(slottedElement: Element) {
        if (this.observations.has(slottedElement)) return;
        slottedElement.slot = SessionScheduleAdvanced.selectSlot(slottedElement);
        const observer = new MutationObserver((mutations, observer) => {
            for (const mutation of mutations) {
                if (mutation.type !== "attributes") continue;
                const target = mutation.target as Element;
                if (!this.isSlottedHere(target)) {
                    observer.disconnect();
                    this.observations.delete(target)
                    return;
                }

                if (mutation.attributeName === "class") {
                    target.slot = SessionScheduleAdvanced.selectSlot(target)
                }
            }
        });
        observer.observe(slottedElement, {attributes: true, attributeFilter: ["class","slot"]})
        this.observations.set(slottedElement, observer);
    }

    private isSlottedHere(target: Element) {
        return target.assignedSlot && this.allSessionSlots.includes(target.assignedSlot);
    }

    private static selectSlot(it: Element) {
        return ["upcoming", "running", "finished"].find( type => it.classList.contains(type)) || ""
    }

    private get allSessionSlots() {
        return [
            this.finishedSessions,
            this.runningSessions,
            this.upcomingSessions,
            this.undefinedSessions,
        ]
    }
}

