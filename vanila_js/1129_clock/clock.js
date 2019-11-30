const title = document.querySelector('#title');
const CLICKED_CLASS = 'clicked';
let date, hour, min, sec;

// handle Time
function getTime(){
    date = new Date();
    hour = date.getHours();
    min = date.getMinutes();
    sec = date.getSeconds();
    title.innerHTML = `${hour < 10 ? `0${hour}` : hour}:${
        min < 10 ? `0${min}` : min
    }:${sec < 10 ? `0${sec}` : sec}`;
};
function handleClick() {
    title.classList.toggle(CLICKED_CLASS);
    // const currentClass = title.className;
    // const hasClass = title.classList.contains(CLICKED_CLASS);
    // if(hasClass){
    //     title.classList.remove(CLICKED_CLASS);
    // }else{
    //     title.classList.add(CLICKED_CLASS);
    // }
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

title.addEventListener('click', handleClick);
init();