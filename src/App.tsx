import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import trailsJSON from './distances.json';
import {numberWithCommas} from "./utils";
import axios from 'axios'
import qs from 'qs'
import {getSleepData} from "./apiClient";

type Trails = Record<string, Trail>;


interface Trail {
    name: string;
    meters: number;
    feet: number;
    miles: number;
    id?: string;
}

const trails: Trails = trailsJSON as Trails;

function Header() {
    return <p className="font-extrabold ring-offset-pink-900 text-7xl p-4 m-16">
        Trailblazer
    </p>;
}

function TrailList(props: {
    trailArray: { feet: number; name: string; id: string; meters: number; miles: number }[],
    callbackfn: (trail: Trail) => React.JSX.Element
}) {
    return <div className="flex flex-col items-center justify-center text-left w-full">
        {props.trailArray.map(props.callbackfn)}
    </div>;
}

function TrailCard(props: { trail: Trail, steps: number }) {

    let percentCovered = ((props.steps * 2) / props.trail.feet) * 100;
    let percentCoveredString: string = percentCovered.toFixed(2) + "%";

    return <div className="text-left w-[400px] pb-5">
        <p className="text-xl font-extrabold">{props.trail.name}</p>
        <p>{numberWithCommas(props.trail.feet)} feet</p>
        <p>{numberWithCommas(props.trail.meters)} feet</p>
        <p>{numberWithCommas(props.trail.miles)} miles</p>
        <p>percentage covered = {percentCoveredString}</p>

    </div>;
}

function NavBar(props: {
    view: string, setView: Function, onClick: () => void
}) {

    const {view, setView, onClick} = props;

    return <button onClick={() => setView(view === "sleep" ? "steps" : "sleep")}>
        Steps
        {props.view === "steps" ? "Steps" : "Sleep"}
    </button>;
}

function App() {
    let trailArray = Object.keys(trails).map(key => {
        return {...trails[key], id: key};
    });

    const [steps, setSteps] = React.useState(0);
    const [view, setView] = React.useState("steps");

    useEffect(() => {
        setSteps(500)
        document.title = `You've taken ${steps} steps!`;
    }, [steps])

    const getSleep = async () => {
        const result = await getSleepData()
        console.log(result)
        return result
    }

    return (
        <div className="App font-monospace">
            <Header/>
            <NavBar setView={setView} view={view} onClick={() => setView("steps")}/>
            {view === "steps" ?
                <TrailList trailArray={trailArray} callbackfn={(trail: Trail) => (
                    <TrailCard key={trail.id} trail={trail} steps={steps}/>
                )}/>
                :
                <div>Sleep stuff</div>}
            <div>
                <button onClick={getSleep}>Get Sleep Data</button>
            </div>
        </div>
    );
}


export default App;
