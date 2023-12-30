const city = document.querySelector(".city");
const citiesCancel = document.querySelector(".cities-cancel");
const citiesContainer = document.querySelector(".cities-container");
const cityChoice = document.querySelectorAll(".cities-grid-item");
const citiesBlock = document.querySelector(".cities-block");
const title = document.querySelector(".change-title");

const cityClickHandler = () => {
  citiesContainer.style = "display: block;";
  document.body.style = "overflow: hidden";
};

const citiesCancelHandleClick = () => {
  citiesContainer.style = "display: none;";

  document.body.style = "overflow: auto";
};

document.addEventListener("click", (e) => {
  if (
      citiesContainer.style.display === "block" &&
      !e.composedPath().includes(city)
  ) {
    const withinBoundaries = e.composedPath().includes(citiesBlock);

    if (!withinBoundaries) {
      citiesContainer.style.display = "none";

      document.body.style = "overflow: auto";
    }
  }
});

const map = new Map([
  ["Барнаул", "Барнауле"],
  ["Волгоград", "Волгограде"],
  ["Воронеж", "Воронеже"],
  ["Екатеринбург", "Екатеринбурге"],
  ["Ижевск", "Ижевске"],
  ["Иркутск", "Иркутске"],
  ["Казань", "Казани"],
  ["Краснодар", "Краснодаре"],
  ["Красноярск", "Красноярске"],
  ["Москва", "Москве"],
  ["Нижний Новгород", "Нижнем Новгороде"],
  ["Новосибирск", "Новосибирске"],
  ["Омск", "Омске"],
  ["Пермь", "Перми"],
  ["Ростов-на-Дону", "Ростове-на-Дону"],
  ["Самара", "Самаре"],
  ["Санкт-Петербург", "Санкт-Петербурге"],
  ["Саратов", "Саратове"],
  ["Тольятти", "Тольятти"],
  ["Тюмень", "Тюмени"],
  ["Ульяновск", "Ульяновске"],
  ["Уфа", "Уфе"],
  ["Хабаровск", "Хабаровске"],
  ["Челябинск", "Челябинске"],
  ["Ярославль", "Ярославле"],
]);
const setName = (city) => {
  let s = title.innerText;
  const result = map.get(city);
  s = s.replace(/\s\S+$/, " " + result);
  title.innerHTML = s;
};

const choiceClickHandler = (text) => {
  localStorage.setItem("city", text);
  citiesContainer.style = "display: none;";
  city.innerHTML = text;

  document.body.style = "overflow: auto";

  if (title) {
    setName(text);
  }
};

city.addEventListener("click", cityClickHandler);
citiesCancel.addEventListener("click", citiesCancelHandleClick);
cityChoice.forEach((choice) =>
    choice.addEventListener("click", () => choiceClickHandler(choice.innerHTML))
);

const init = () => {
  if (localStorage.getItem("city")) {
    city.innerHTML = localStorage.getItem("city");
    if (title) {
      setName(localStorage.getItem("city"));
    }
  }
};

init();
