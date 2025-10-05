import './App.css';
import axios from "axios";
import {useState} from "react";

function App() {
    const [allCountries, setAllCountries] = useState({});
    const [clicked, setClicked] = useState(false);

    async function fetchAllCountries() {
        const result = await
            axios.get("https://restcountries.com/v3.1/all?fields=name,flag,population");
            setAllCountries(result);
            setClicked(true);
    }

    console.log(clicked);
    console.log(allCountries);


    return (
        <>
            <header>
                <h1>World Regions</h1>
            </header>
            <div className="country-info">
                {!(clicked) && <button type="button" onClick={fetchAllCountries}>Show info on all countries!</button>}
                {(clicked) && <ul>
                    <li>{allCountries.data[0].flag} {allCountries.data[0].name.common} has a population of {allCountries.data[0].population} people</li>
                </ul>}
            </div>
        </>
    )
}

export default App
