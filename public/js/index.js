// const hours = new Date().getHours();
const date = new Date();
const hours = date.getHours();
const year = date.getFullYear();

const inputField = document.getElementById("search--input");

window.onload = () => {
  let currentTheme;

  // check time to select day or night theme
  hours >= 22 || hours <= 6 ? (currentTheme = "night") : (currentTheme = "day");

  const body = document.getElementsByTagName("body")[0];
  body.classList.add(currentTheme);
};

inputField.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputField.value !== "") {
    requestApi(inputField.value);
  }
});

function requestApi(city) {
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(api)
    .then((response) => response.json())
    .then((result) => weatherDetails(result));
}

function weatherDetails(info) {
  console.log(info);
}
