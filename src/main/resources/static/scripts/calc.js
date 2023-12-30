const select = document.querySelector("#c-t-1");
const transport = document.querySelector(".transport");
const special = document.querySelector(".special");
const gims = document.querySelector(".gims");
const priceButtons = document.querySelectorAll(".price-btn");
const priceElement = document.querySelector(".price-value-number");
const priceBlock = document.querySelector(".price");
const orderButton = document.querySelector(".prices-order-btn");

let price = 0;
const handleChange = (e) => {
  price = 0;
  transport.style.display = "none";
  special.style.display = "none";
  gims.style.display = "none";
  priceBlock.style.display = "none";
  document
    .querySelectorAll(".active-price-btn")
    .forEach((elem) => elem.classList.remove("active-price-btn"));

  if (e.target.value === "c-type-a") {
    transport.style.display = "block";
    price += 24000;
  } else if (e.target.value === "c-type-s") {
    special.style.display = "block";
    price += 18000;
  } else if (e.target.value === "c-type-g") {
    gims.style.display = "block";
    price += 18000;
  }
};

const handleClickButton = (e) => {
  if (e.target.classList.contains("active-price-btn")) {
    price -= +e.target.getAttribute("data-price");
  } else {
    price += +e.target.getAttribute("data-price");
  }
  e.target.classList.toggle("active-price-btn");
  priceBlock.style.display = "flex";
  priceElement.innerHTML = price;
};

priceButtons.forEach((button) =>
  button.addEventListener("click", handleClickButton)
);

const orderButtonHandleClick = () => {
  const textArray = document.querySelectorAll(".active-price-btn");
  let text = "Нужны права:";
  textArray.forEach((element) => {
    text += " " + element.innerText + ".";
  });

  document.querySelector(".order-textarea").value = text;
};

select.addEventListener("change", handleChange);
orderButton.addEventListener("click", orderButtonHandleClick);
