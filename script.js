
const apiKey = "ef648a9b960aa5d09be13bebe2428076";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");



const cityInput = document.getElementById("searchbar");
const suggestionList = document.getElementById("suggestions");

const cityNames = [
    "Amsterdam", "Athens", "Austin", "Bangkok", "Barcelona", "Beijing",
    "Berlin", "Boston", "Brisbane", "Buenos Aires", "Cairo", "Cape Town",
    "Chicago", "Copenhagen", "Delhi", "Dubai", "Dublin", "Edinburgh",
    "Frankfurt", "Geneva", "Hanoi", "Helsinki", "Hong Kong", "Istanbul",
    "Jakarta", "Johannesburg", "Karachi", "Kuala Lumpur", "Lisbon",
    "London", "Los Angeles", "Madrid", "Manila", "Melbourne", "Mexico City",
    "Miami", "Milan", "Montreal", "Moscow", "Mumbai", "Munich", "Nairobi",
    "New York", "New Delhi", "Osaka", "Oslo", "Paris", "Perth", "Prague",
    "Rio de Janeiro", "Rome", "San Francisco", "Santiago", "Seoul",
    "Shanghai", "Singapore", "Stockholm", "Sydney", "Taipei", "Tokyo",
    "Toronto", "Vancouver", "Vienna", "Warsaw", "Washington D.C.", "Zurich"
  ];
  

cityInput.addEventListener("input", () => {
    const query = cityInput.value.toLowerCase();
    suggestionList.innerHTML = "";

    if (query.length === 0) return;

    const matches = cityNames
        .filter(city => city.toLowerCase().startsWith(query))
        .slice(0, 3); // Limit to 3 suggestions

    matches.forEach(city => {
        const li = document.createElement("li");
        li.textContent = city;
        li.addEventListener("click", () => {
            cityInput.value = city;
            suggestionList.innerHTML = "";
            checkWeather(city); // Trigger search
        });
        suggestionList.appendChild(li);
    });
});

// Optional: hide suggestions when clicking outside
document.addEventListener("click", (e) => {
    if (!e.target.closest(".search")) {
        suggestionList.innerHTML = "";
    }
});





async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}&units=metric`);

    if(response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    } else {

    var data = await response.json();

    console.log(data);

    console.log("🌤️ Weather Condition Detected:", data.weather[0].main);


    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    
    const condition = data.weather[0].main;

    switch (condition) {
    case "Clouds":
        weatherIcon.src = "images/clouds.png";
        break;
    case "Clear":
        weatherIcon.src = "images/clear.png";
        break;
    case "Rain":
        weatherIcon.src = "images/rain.png";
        break;
    case "Drizzle":
        weatherIcon.src = "images/drizzle.png";
        break;
    case "Mist":
        weatherIcon.src = "images/mist.png";
        break;
    case "Snow":
        weatherIcon.src = "images/snow.png";
        break;
    case "Thunderstorm":
        weatherIcon.src = "images/thunderstorm.png";
        break;
    case "Haze":
        weatherIcon.src = "images/haze.png";
        break;
    default:
        weatherIcon.src = "images/default.png"; // fallback icon
    }


    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";

    }

}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
