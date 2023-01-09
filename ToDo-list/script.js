let todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');

const savedTodoList = JSON.parse(localStorage.getItem('saved-items'));

const createTodo = function (storageData) {
  let todoContents = storageData ? storageData.contents : todoInput.value;

  const newLi = document.createElement('li');
  const newSpan = document.createElement('span');
  const newBtn = document.createElement('button');

  newBtn.addEventListener('click', () => {
    newLi.classList.toggle('complete');
    saveItemsFunc();
  });

  newLi.addEventListener('dblclick', () => {
    newLi.remove();
    saveItemsFunc();
  });

  if (storageData?.complete) {
    newLi.classList.add('complete');
  }

  newSpan.textContent = todoContents;
  newLi.appendChild(newBtn);
  newLi.appendChild(newSpan);
  todoList.appendChild(newLi);
  todoInput.value = '';
  saveItemsFunc();
};

const keyCodeCheck = function () {
  if (window.event.keyCode === 13 && todoInput.value !== '') {
    createTodo();
  }
};

const deleteAll = function () {
  const liList = document.querySelectorAll('li');
  for (li of liList) {
    li.remove();
  }
  saveItemsFunc();
};

const saveItemsFunc = function () {
  const saveItems = [];

  for (li of todoList.children) {
    const todoObj = {
      contents: li.querySelector('span').textContent,
      complete: li.classList.contains('complete'),
    };
    saveItems.push(todoObj);
  }
  saveItems.length === 0 ? localStorage.removeItem('saved-items') : localStorage.setItem('saved-items', JSON.stringify(saveItems));
};

if (savedTodoList) {
  for (let i = 0; i < savedTodoList.length; i++) {
    createTodo(savedTodoList[i]);
  }
}

const weatherSearch = function (position) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=7ae127ac777a274a84c6d59fc98a49da`)
    .then((response) => console.log(response))
    .catch((error) => {
      console.log(error);
    });
};

const accessToGeo = function (position) {
  const positionObj = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
  weatherSearch(positionObj);
};

const askForLocation = function () {
  navigator.geolocation.getCurrentPosition(accessToGeo, (error) => {
    console.log(error);
  });
};
askForLocation();
