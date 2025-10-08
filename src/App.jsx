import './App.css';
import axios from "axios";
import {useState} from "react";
import setRegionColor from "./helpers/returnRegionColor.jsx";

function App() {
    const [allCountries, setAllCountries] = useState({});
    const [clicked, setClicked] = useState(false);

    async function fetchAllCountries() {
        const result = await
            axios.get("https://restcountries.com/v3.1/all?fields=name,flag,population,region,cca3");
        setAllCountries(result);
        setClicked(true);
    }

    // <<<<<---------------------------## TESTING ZONE ##-------------------------->>>>>>

    console.log(clicked);
    console.log(allCountries);

    // <<<<<----------------------------------------------------------------------->>>>>>

    return (
        <>
            <header>
                <h1>World Regions</h1>
            </header>
            <div className="countries-section">

                {!(clicked) && <button type="button" onClick={fetchAllCountries}>Show info on all countries!</button>}

                {(clicked) &&
                    <ul className="countries-container">{allCountries.data.map((country) => {
                        // eslint-disable-next-line react/jsx-key
                        return <li key={country.cca3} className="country-card">{country.flag} <strong
                            className={setRegionColor(country.region)}>{country.name.common}</strong> has a population
                            of {country.population} people</li>
                    })}</ul>
                }
            </div>
        </>
    )
}

export default App
