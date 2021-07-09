

export interface Session {
    id: number,
    name: string
}

export const SESSIONS: Session[] = ([
    {
        name: "React Hooks life coding - Nico"
    },
    {
        name: "Web components mit lit 🔥 - Omar"
    },
    {
        name: "next level html mit jQuery - Internet Explorer"
    }
] as Omit<Session, "id">[]).map((session, id) => ({id, ...session}))

export interface SessionAware {
    session: Session
}