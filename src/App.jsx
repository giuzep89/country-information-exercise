import './App.css';
import axios from "axios";
import {useState} from "react";
import setRegionColor from "./helpers/returnRegionColor.jsx";
import globePicture from "./assets/images/Globe_clip_art.svg";

function App() {
    const [allCountries, setAllCountries] = useState([]);
    const [worldCountriesButton, setWorldCountriesButton] = useState(false);
    const [country, setCountry] = useState({});
    const [singleCountryButton, setSingleCountryButton] = useState(false);

    async function fetchAllCountries() {
        const result = await
            axios.get("https://restcountries.com/v3.1/all?fields=name,flag,population,region,cca3");
        setAllCountries(result.data);
    }

    async function fetchCountryByName() {
        const result = await
            axios.get("https://restcountries.com/v3.1/name/netherlands?fullText=true");
        setCountry(result.data[0]);
        console.log(result.data);
    }

    function handleClick(type){
        if (type === "allCountries") {
            fetchAllCountries();
            setWorldCountriesButton(true);
        } else if (type === "country") {
            fetchCountryByName();
            setSingleCountryButton(true);
        }
    }

    // <<<<<---------------------------## TESTING ZONE ##-------------------------->>>>>>

    // console.log(clicked);
    // console.log(allCountries);
    // console.log(country);

    // <<<<<----------------------------------------------------------------------->>>>>>

    return (
        <>
            <header>
                <h1>World Regions</h1>
            </header>

            <section className="countries-section">

                {!(worldCountriesButton) && <button type="button" onClick={() => handleClick("allCountries")}>Show info on all countries!</button>}

                {worldCountriesButton &&
                    <ul className="countries-container">{allCountries.map((country) => {
                        // eslint-disable-next-line react/jsx-key
                        return <li key={country.cca3} className="country-card">{country.flag} <strong
                            className={setRegionColor(country.region)}>{country.name.common}</strong> has a population
                            of {country.population} people</li>
                    })}</ul>
                }
            </section>

            <section className="search-country-section">
                <div className="search-country-container">
                    <h2>Search country information</h2>
                    <div className="globe-image"><img src={globePicture} alt="globe image"/></div>

                    {!(singleCountryButton) && <button type="button" onClick={() => handleClick("country")}>Zoek</button>}

                    {/* I added country.name under here as an extra condition because otherwise React would try to render the block of code with country.name still --undefined-- and break the page, so I had to add it to make sure it had data in it before the rendering. I don't quite understand it but it works as it is.*/}

                    {singleCountryButton && country.name &&
                        <div className="country-info">
                        <h2>{country.flag} {country.name.common}</h2>
                        <p>{country.name.common} is situated in {country.subregion} and the capital is {country.capital[0]}.</p>
                            <p>It has {country.population} people</p>
                    </div>}
                </div>
            </section>
        </>
    )
}

export default App
