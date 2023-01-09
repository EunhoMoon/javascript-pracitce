let todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

const savedTodoList = JSON.parse(localStorage.getItem("saved-items"));
const savedWeatherData = JSON.parse(localStorage.getItem("saved-weather"));

const createTodo = function (storageData) {
  let todoContents = storageData ? storageData.contents : todoInput.value;

  const newLi = document.createElement("li");
  const newSpan = document.createElement("span");
  const newBtn = document.createElement("button");

  newBtn.addEventListener("click", () => {
    newLi.classList.toggle("complete");
    saveItemsFunc();
  });

  newLi.addEventListener("dblclick", () => {
    newLi.remove();
    saveItemsFunc();
  });

  if (storageData?.complete) {
    newLi.classList.add("complete");
  }

  newSpan.textContent = todoContents;
  newLi.appendChild(newBtn);
  newLi.appendChild(newSpan);
  todoList.appendChild(newLi);
  todoInput.value = "";
  saveItemsFunc();
};

const keyCodeCheck = function () {
  if (window.event.keyCode === 13 && todoInput.value.trim() !== "") {
    createTodo();
  }
};

const deleteAll = function () {
  const liList = document.querySelectorAll("li");
  for (li of liList) {
    li.remove();
  }
  saveItemsFunc();
};

const saveItemsFunc = function () {
  const saveItems = [];

  for (li of todoList.children) {
    const todoObj = {
      contents: li.querySelector("span").textContent,
      complete: li.classList.contains("complete"),
    };
    saveItems.push(todoObj);
  }
  saveItems.length === 0
    ? localStorage.removeItem("saved-items")
    : localStorage.setItem("saved-items", JSON.stringify(saveItems));
};

if (savedTodoList) {
  for (savedTodo of savedTodoList) {
    createTodo(savedTodo);
  }
}

const weatherDataActive = function ({ location, weather }) {
  const weatherMainList = [
    "Clear",
    "Cloud",
    "Drizzle",
    "Rain",
    "Snow",
    "Thunderstorm",
  ];
  weather = weatherMainList.includes(weather) ? weather : "Fog";
  const locationNameTag = document.querySelector("#location-name-tag");

  locationNameTag.textContent = location;
  document.body.style.backgroundImage = `url(./images/${weather}.jpg)`;

  if (
    savedWeatherData?.location !== location ||
    savedWeatherData?.weather !== weather
  ) {
    localStorage.setItem(
      "saved-weather",
      JSON.stringify({ location, weather })
    );
  }
};

const weatherSearch = function ({ latitude, longitude }) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=7ae127ac777a274a84c6d59fc98a49da`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const weatherData = {
        location: json.name,
        weather: json.weather[0].main,
      };
      weatherDataActive(weatherData);
    })
    .catch((error) => {
      console.log(error);
    });
};

const accessToGeo = function ({ coords }) {
  const { latitude, longitude } = coords;
  // shorthand property : key와 해당 value를 담은 변수 명이 같으면 생략 가능
  const positionObj = { latitude, longitude };
  weatherSearch(positionObj);
};

const askForLocation = function () {
  navigator.geolocation.getCurrentPosition(accessToGeo, (error) => {
    console.log(error);
  });
};

askForLocation();
if (savedWeatherData) {
  weatherDataActive(savedWeatherData);
}
