function saveDate() {
    // Hämta värdet från input-elementet
    const dateInput = document.getElementById('dateInput').value;

    // Spara värdet i en variabel
    const selectedDate = dateInput;

    // Uppdatera URL:en med det nya datumet
    const url = 'https://cv-bookings-parser.tobias-08e.workers.dev/?searchword=&start_date='+selectedDate+'&end_date='+selectedDate;
    console.log(url);
    // Anropa funktionen för att hämta data från URL:en med det nya datumet
    fetchData(url);
}

// Funktion för att hämta data från URL:en
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        findMissingResources(data);
    } catch (error) {
        console.error('Det uppstod ett fel vid hämtning av data:', error);
    }
}

// Funktion för att identifiera saknade resurser
function findMissingResources(scheduleData) {
    const allResources = ["E410", "B125", "A341", "E302", "B126", "A392", "E307", "B127", "A339", "E308", "B128", "A340", "E313", "B130", "A208", "E316", "B209", "A201", "E321", "B210", "A210", "E323", "B211", "A231", "E324", "B217", "A233", "E218", "B222", "A206", "E116", "B223", "A229", "E117", "B224", "A234", "E118", "B225", "A146", "E405", "B226", "A145", "B227", "B228", "B229", "B113", "B114", "C302", "B231", "C303", "B232", "C308", "C314", "C226", "E224", "E225", "C317"];
    allResources.sort();


    const missingResources = allResources.filter(resource => !scheduleData.some(item => item.resource === resource));

    const missingResourcesElement = document.getElementById('missingResources');
    if (missingResources.length > 0) {
        missingResourcesElement.innerHTML = ''; // Rensa tidigare resultat
        missingResources.forEach(resource => {
            const listItem = document.createElement('li');
            listItem.textContent = resource;
            missingResourcesElement.appendChild(listItem);
        });
    } else {
        missingResourcesElement.innerHTML = '<li>No missing resources found.</li>';
    }
}


