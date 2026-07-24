// Create an array to store the cities the user adds
const cities = [];

// Create variables for all the HTML elements we will need to use
const citySelect = document.getElementById("citySelect");
const addBtn = document.getElementById("addBtn");
const themeBtn = document.getElementById("themeBtn");
const cityList = document.getElementById("cityList");

// Call addCity when the 'Add City' button is clicked
addBtn.addEventListener("click", addCity);

// Call toggleTheme when the theme button is clicked
themeBtn.addEventListener("click", toggleTheme);

// Add a city to the cities array.
function addCity() {

    // Get the city that the user selected and store it
    const selectedOption = citySelect.options[citySelect.selectedIndex];

    // Get the city name and time zone of the selected city
    const cityName = selectedOption.text;
    const timeZone = selectedOption.value;

    // Check whether the city was already added
    const cityAlreadyExists = cities.some(function (city) {
        return city.timeZone === timeZone;
    });

    // If the city was already added, notify the user and return
    if (cityAlreadyExists) {
        alert("That city has already been added.");
        return;
    }

    // Otherwise, create a new city object
    const city = {
        name: cityName,
        timeZone: timeZone
    };

    // Push this new city to our array
    cities.push(city);

    // Call our displayCities function
    displayCities();
}

// Display all city clocks.
function displayCities() {

    // Clear the current city list
    cityList.innerHTML = "";

    // Display message if there are no cities
    if (cities.length === 0) {

        cityList.innerHTML = "<p>Select a city and click Add City.</p>";
        return;
    }

    // Create a card for every city in the array 'cities'
    cities.forEach(function (city, index) {

        // Create a new Date object
        const now = new Date();

        // Format Date object to a time string
        const time = now.toLocaleTimeString("en-US", {
            timeZone: city.timeZone,
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit"
        });

        // Format Date object to a date string
        const date = now.toLocaleDateString("en-US", {
            timeZone: city.timeZone,
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });

        // Create a new element to hold all the data
        const cityCard = document.createElement("section");

        // Set card class to 'city' for styling
        cityCard.className = "city";

        // Display the city name, city time, city date, and the remove button
        cityCard.innerHTML = `

            <h2>${city.name}</h2>

            <p class="city-time">${time}</p>

            <p class="city-date">${date}</p>

            <button class="remove-btn" data-index="${index}">Remove</button>
        `;

        // Add the card to our HTML element 'cityList'
        cityList.appendChild(cityCard);
    });

    // Get all remove buttons currently on the webpage
    const removeButtons = document.querySelectorAll(".remove-btn");

    // For each remove button found on the webpage, add a click listener
    removeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            // When the remove button is clicked, we get index and call removeCity
            const index = Number(button.dataset.index);

            removeCity(index);
        });
    });
}

// Function to remove a city from the array
function removeCity(index) {

    // Remove 1 item at 'index'
    cities.splice(index, 1);

    // Call displayCities to update our cityList
    displayCities();
}

// Switch between light mode and dark mode when theme button is clicked
function toggleTheme() {

    // Adds the 'dark' class if it isn't already there
    document.body.classList.toggle("dark");

    // If dark mode is active, show the option to switch to light mode
    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "Light Mode";
    // Otherwise, show the option to switch to dark mode
    } else {
        themeBtn.textContent = "Dark Mode";
    }
}

// Update every displayed clock once per second
setInterval(displayCities, 1000);

// Add one city when the page first loads
addCity();
