import './App.css';
import axios from "axios";

function App() {
    async function fetchAllCountries() {
        const result = await
            axios.get("https://restcountries.com/v3.1/all?fields=name,flag,population");
            console.log(result);
    }




    return (
        <>
            <header>
                <h1>World Regions</h1>
            </header>
            <div className="country-info">
                <button type="button" onClick={fetchAllCountries}>Show info on all countries!</button>
            </div>
        </>
    )
}

export default App
