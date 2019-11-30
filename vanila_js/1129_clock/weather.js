const temp = document.querySelector('.js-temp'),
    place = document.querySelector('.js-place');
    
const COORDS = 'coords';
// https://home.openweathermap.org/api_keys
const API_KEY = '';

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response) {
        return response.json();
    }).then(function(json) {
        // const temperature = json.main.temp;
        const temperature = '6.3';
        const city = 'seoul';
        temp.innerHTML = `온도: ${temperature}`;
        place.innerHTML = `지역: ${city}`;
    });
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}
function handleGeoError() {
    console.log('Can\'t access your position');
    
}
function askForCoords(){
    const loadedCoords = JSON.parse(localStorage.getItem(COORDS));
    if(loadedCoords === null){
        navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
    }else{
        getWeather(loadedCoords.latitude, loadedCoords.longitude);
    }
};

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function init() {
    askForCoords();
};

init();