// handle toDO
const toDoForm = document.querySelector('.toDoForm'),
    toDoInput = toDoForm.querySelector('input'),
    toDoList = document.querySelector('.toDoList');

const TODO_LS = 'todos';
let toDos = [];

function saveToDos(toDos) {
    localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}
function deleteToDo(event) {
    const id = event.target,
        li = id.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos(toDos); 
}
function loadToDos() {
    const loadedToDos = localStorage.getItem(TODO_LS),
        parsedToDos = JSON.parse(loadedToDos);
        if(loadedToDos !== null){
            parsedToDos.forEach(function(toDo){
                displayToDos(toDo.text);
            });
        }
}
function displayToDos(text) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const delBtn = document.createElement('button');
    const newId = toDos.length + 1;
    delBtn.innerText = "❌";
    delBtn.style.backgroundColor = "Transparent";
    delBtn.style.outline = "none";
    delBtn.style.border = "none";
    delBtn.style.cursor = "pointer";
    span.innerText = text;
    span.style.fontSize = "small";
    span.style.fontWeight = "bold";
    toDoList.appendChild(li);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;

    delBtn.addEventListener('click', deleteToDo);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos(toDos);
    toDoInput.value = "";
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const toDoInputValue = toDoInput.value;
    displayToDos(toDoInputValue);
}
loadToDos();
// loadToDos();
toDoForm.addEventListener('submit', handleToDoSubmit);