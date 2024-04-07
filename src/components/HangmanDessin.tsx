import "../css/Dessin.css"

const HEAD = (<div className="head"/>)
const BODY = (<div className="body"/>)
const RIGHT_ARM = (<div className="right-arm"/>)
const LEFT_ARM = (<div className="left-arm"/>)
const RIGHT_LEG = (<div className="right-leg"/>)
const LEFT_LEG = (<div className="left-leg"/>)

const BODY_PARTS = [
    { id: "HEAD", component: HEAD },
    { id: "BODY", component: BODY },
    { id: "RIGHT_ARM", component: RIGHT_ARM },
    { id: "LEFT_ARM", component: LEFT_ARM },
    { id: "RIGHT_LEG", component: RIGHT_LEG },
    { id: "LEFT_LEG", component: LEFT_LEG },
];

type HangmanDrawingProps = { numberOfGuesses: number}

export function HangmanDessin({ numberOfGuesses }: HangmanDrawingProps) {

    return (
        <div className="pendu">
            {BODY_PARTS.slice(0, numberOfGuesses).map(({ id, component }) => (<div key={id}>{component}</div>))}

            <div className="bois-1"/>
            <div className="bois-2"/>
            <div className="bois-3"/>
            <div className="bois-4" />
        </div>
    )

}