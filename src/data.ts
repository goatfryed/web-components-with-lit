

export interface Session {
    id: number,
    topic: string,
    speaker: string
}

export const EVENT = {
    iteration: 34,
    name: "Kasseler Webmontag",
    logoUrl: "http://www.webmontag-kassel.de/dist/img/webmontag-kassel-logo.png"
}

export const SESSIONS: Session[] = ([
    {
        topic: "React Hooks🎣 lifecoding",
        speaker: "Nico",
    },
    {
        topic: "Web components mit lit 🔥",
        speaker: "Omar",
    },
    {
        topic: "next level html mit jQuery",
        speaker: "Internet Explorer",
    }
]).map((session, id) => ({id, ...session}))

export interface SessionAware {
    session: Session
}

export type SessionCreateDetail = SessionAware & {
    resolve: () => {}
}
export type SessionCreateEvent = CustomEvent<SessionCreateDetail>