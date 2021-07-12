import {customElement, property, query} from "lit/decorators";
import {css, html, LitElement, PropertyValues} from "lit";
import {Session} from "../data";

import "./scheduledSession"
import "./sessionRequestForm"
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

    protected render(): unknown {

        const currentStart = (!this.finishedSessions ? 0 : this.finishedSessions.assignedElements().length);
        const upcomingStart = (!this.runningSessions ? 0 : this.runningSessions.assignedElements().length)
            + currentStart

        return html`
            <slot style="display: none"></slot>
            <slot style="display: none" name="running" @slotchange="${this.onSlotChange}"></slot>
            <div class="columns">
                <div class="column">
                    Upcoming
                    <ol start="${upcomingStart + 1}">
                        <slot name="upcoming" @slotchange="${this.onSlotChange}"></slot>
                        <session-request-form />
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


    protected onSlotChange(e: any) {
        (e.target as HTMLSlotElement)
    }

    private observations = new Map<Element, MutationObserver>()

    private manageSlotting(slottedElement: Element) {
        slottedElement.slot = SessionScheduleAdvanced.selectSlot(slottedElement)
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

