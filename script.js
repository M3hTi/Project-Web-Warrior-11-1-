const dateInput = document.getElementById('pictureDate');
const apodContainer = document.getElementById('apodContainer');

function getInformation() {
    const pictureDate = document.querySelector('#pictureDate').value;
    const now = new Date();
    
    if (!isEnterDateTrue(now, pictureDate)) {
        alert("Please select a date that is not in the future!");
        return;
    }

    const myAPIKey = "ZkQkyCu1BAzwkQ4MvjXRuCSCoo5mKxp0Crezw3OH";
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${myAPIKey}&date=${pictureDate}`)
    .then(response => {
        if(!response.ok) throw new Error ("server's Response is failed" + response.statusText)
        return response.json()
    })
    .then(data => {
        console.log(data);
        showData(data)
    })
}

function isEnterDateTrue(now, pictureDate) {
    const selectedDate = new Date(pictureDate);
    // Set time to midnight for accurate date comparison
    selectedDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    
    return selectedDate <= now;
}

function showData(obj) {
    if(obj.media_type === "image") {
        apodContainer.innerHTML = "";
        const image = document.createElement('img');
        image.src = obj.url;
        image.alt = obj.title;
        apodContainer.appendChild(image);

        const title = document.createElement('h3');
        title.textContent = obj.title;
        apodContainer.appendChild(title);

        const explanation = document.createElement('p');
        explanation.textContent = obj.explanation;
        apodContainer.appendChild(explanation);
    }
}

dateInput.addEventListener('change', getInformation)