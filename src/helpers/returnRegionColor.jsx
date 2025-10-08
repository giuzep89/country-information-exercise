export default function setRegionColor(region) {
    switch (region) {
        case "Africa":
            return "blue-region";
        case "Americas":
            return "green-region";
        case "Asia":
            return "red-region";
        case "Europe":
            return "yellow-region";
        case "Oceania":
            return "purple-region";
        default:
            return "blue-region";
    }
}