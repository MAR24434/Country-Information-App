// main.js
function fetchAPI() {
    var searchData = document.getElementById("Search").value;
    var searchBy = document.getElementById('searchBy').value;
    fetch(`https://restcountries.com/v3.1/${searchBy}/${searchData}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            displayCountryInfo(data);
        });
}

function displayCountryInfo(countryInfo) {
    const listContainer = document.getElementById('list');
    listContainer.innerHTML = ""; // Clear previous content

    if (!countryInfo || countryInfo.length == 0) {
        listContainer.innerHTML = "<p>No country found.</p>";
        return;
    }

    countryInfo.forEach(country => {
        const countryDiv = document.createElement('div');
        countryDiv.classList.add('country-info');

        const nameElement = document.createElement('h2');
        nameElement.textContent = country.name.common;

        const regionElement = document.createElement('p');
        regionElement.textContent = `Region: ${country.region}`;

        const subregionElement = document.createElement('p');
        subregionElement.textContent = `Subregion: ${country.subregion}`;

        const capitalElement = document.createElement('p');
        capitalElement.textContent = `Capital: ${country.capital[0]}`;

        const viewDetailsButton = document.createElement('button');
        viewDetailsButton.textContent = 'View Details';
        viewDetailsButton.addEventListener('click', () => openDetailsPage(country));

        countryDiv.appendChild(nameElement);
        countryDiv.appendChild(regionElement);
        countryDiv.appendChild(subregionElement);
        countryDiv.appendChild(capitalElement);
        countryDiv.appendChild(viewDetailsButton);

        listContainer.appendChild(countryDiv);
    });
}

function openDetailsPage(country) {
    // Clear existing content
    const listContainer = document.getElementById('list');
    listContainer.innerHTML = "";

    // Display details on the same page
    displayDetails(country, listContainer);

    // Add a "Back" button
    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.addEventListener('click', () => {
        // Fetch the country list again or restore the original content
        fetchAPI();
    });

    listContainer.appendChild(backButton);
}

function displayDetails(countryInfo, container) {
    const detailsContainer = document.createElement('div');
    detailsContainer.id = 'countryDetails';

    // Add the flag to the nameElement
    const flagElement = document.createElement('img');
    flagElement.src = countryInfo.flags.png; // Assuming the API provides the flag URL
    flagElement.alt = `${countryInfo.name.common} Flag`;
    flagElement.style.maxWidth = '100px'; // Adjust the size as needed
    detailsContainer.appendChild(flagElement);

    // Create name element
    const nameElement = document.createElement('h2');
    nameElement.textContent = countryInfo.name.common;
    detailsContainer.appendChild(nameElement);

    // Language dropdown
    // Language dropdown
    const languageDropdown = document.createElement('select');
    const languageCodes = Object.keys(countryInfo.name.nativeName);

    languageCodes.forEach(languageCode => {
        const option = document.createElement('option');
        option.value = languageCode;
        option.textContent = languageCode;
        languageDropdown.appendChild(option);
    });

    languageDropdown.addEventListener('change', () => updateNativeName(countryInfo, nativeNameContainer, languageDropdown.value, languageDropdown));

    // Translation dropdown
    const translationDropdown = document.createElement('select');
    const translationLanguages = Object.keys(countryInfo.translations);

    translationLanguages.forEach(language => {
        const option = document.createElement('option');
        option.value = language;
        option.textContent = language;
        translationDropdown.appendChild(option);
    });

    translationDropdown.addEventListener('change', () => updateTranslations(countryInfo, translationsContainer, translationDropdown.value));
    
    const instructionMessage = document.createElement('p');
    instructionMessage.textContent = 'Click the dropdown to see the official and common native name.';

    const nativeNameContainer = document.createElement('div');
    nativeNameContainer.innerHTML = '<p>Native name: </p>';

    const translationsContainer = document.createElement('div');
    translationsContainer.innerHTML = '<p>Translations: </p>';

    detailsContainer.appendChild(languageDropdown);
    detailsContainer.appendChild(instructionMessage);
    detailsContainer.appendChild(nativeNameContainer);
    detailsContainer.appendChild(translationDropdown);
    detailsContainer.appendChild(translationsContainer);
    
    // Initialize with the default translation for translations
    updateTranslations(countryInfo, translationsContainer, Object.keys(countryInfo.translations)[0]);

    // Create other details
    const regionElement = document.createElement('p');
    regionElement.textContent = `Region: ${countryInfo.region}`;
    detailsContainer.appendChild(regionElement);

    const subregionElement = document.createElement('p');
    subregionElement.textContent = `Subregion: ${countryInfo.subregion}`;
    detailsContainer.appendChild(subregionElement);

    const capitalElement = document.createElement('p');
    capitalElement.textContent = `Capital: ${countryInfo.capital[0]}`;
    detailsContainer.appendChild(capitalElement);

    const languagesElement = document.createElement('p');
    languagesElement.textContent = `Languages: ${Object.values(countryInfo.languages).join(', ')}`;
    detailsContainer.appendChild(languagesElement);

    const currenciesElement = document.createElement('p');
    const currencies = countryInfo.currencies;
    const currencyNames = Object.keys(currencies).map(currency => `${currency}: ${currencies[currency].name} (${currencies[currency].symbol})`);
    currenciesElement.textContent = `Currencies: ${currencyNames.join(', ')}`;
    detailsContainer.appendChild(currenciesElement);

    // Additional details
    const areaElement = document.createElement('p');
    areaElement.textContent = `Area: ${countryInfo.area} sq km`;
    detailsContainer.appendChild(areaElement);

    const populationElement = document.createElement('p');
    populationElement.textContent = `Population: ${countryInfo.population.toLocaleString()}`;
    detailsContainer.appendChild(populationElement);

    const continentElement = document.createElement('p');
    continentElement.textContent = `Continent: ${countryInfo.continents.join(', ')}`;
    detailsContainer.appendChild(continentElement);

    const timezoneElement = document.createElement('p');
    timezoneElement.textContent = `Timezone: ${countryInfo.timezones.join(', ')}`;
    detailsContainer.appendChild(timezoneElement);

    const demonymElement = document.createElement('p');
    demonymElement.textContent = `Demonym: ${countryInfo.demonyms.eng.f} (female), ${countryInfo.demonyms.eng.m} (male)`;
    detailsContainer.appendChild(demonymElement);

    // Flags and Coat of Arms
    const coatOfArmsElement = document.createElement('img');
    coatOfArmsElement.src = countryInfo.coatOfArms.png; // Assuming the API provides the coat of arms URL
    coatOfArmsElement.alt = `${countryInfo.name.common} Coat of Arms`;
    coatOfArmsElement.style.maxWidth = '100px'; // Adjust the size as needed
    detailsContainer.appendChild(coatOfArmsElement);

    // Maps
    const mapsElement = document.createElement('div');
    mapsElement.innerHTML = `
        <p>Maps:</p>
        <a href="${countryInfo.maps.googleMaps}" target="_blank">Google Maps</a>
        <a href="${countryInfo.maps.openStreetMaps}" target="_blank">OpenStreet Maps</a>
    `;
    detailsContainer.appendChild(mapsElement);

    container.appendChild(detailsContainer);
}

function updateNativeName(countryInfo, container, language, languageDropdown) {
    const nativeNameElement = document.createElement('p');
    nativeNameElement.textContent = `Official: ${countryInfo.name.nativeName[language].official}, Common: ${countryInfo.name.nativeName[language].common}`;

    // Clear existing content
    container.innerHTML = '<p>Native name: </p>';
    container.appendChild(nativeNameElement);

    // Set the selected language in the dropdown
    languageDropdown.value = language;
}

function updateTranslations(countryInfo, container, language) {
    const translationsElement = document.createElement('p');
    translationsElement.textContent = `${language}: ${countryInfo.translations[language].common}`;

    // Clear existing content
    container.innerHTML = '<p>Translations: </p>';
    container.appendChild(translationsElement);
}