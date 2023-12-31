const buttons = document.querySelectorAll(".app-order-btn");

const postData = (data) => {
  fetch("/order", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      first_name: data.first_name,
      phone_number: data.phone_number,
      data: data.data,
    }),
  });
};

const submitHandlerClick = (data) => {
  const nameBlock = data.nameBlock;
  const phoneBlock = data.phoneBlock;
  const textArea = data.textArea;
  const name = nameBlock.value;
  const phone = phoneBlock.value;
  const text = textArea.value;
  let wrong = false;

  if (!name) {
    nameBlock.style = "border: 2px solid #DC143C;";
    wrong = true;
  } else {
    nameBlock.style = "border: none";
  }
  if (
    phone[0] !== "+" ||
    phone.length < 10 ||
    phone.length > 15 ||
    console.log(phone.replace(/[^+\d]/g, "") !== phone)
  ) {
    phoneBlock.style = "border: 2px solid #DC143C;";
    wrong = true;
  } else {
    phoneBlock.style = "border: none;";
  }
  if (!text) {
    textArea.style = "border: 2px solid #DC143C;";
    wrong = true;
  } else {
    textArea.style = "border: none";
  }

  if (wrong === false) {
    const obj = {
      first_name: name,
      phone_number: phone,
      data: text,
    };
    postData(obj);
    document.querySelector(".send-success-container").style.display = "flex";

    document.body.style = "overflow: hidden";
    container.style.display = "none";
    document.querySelector(".order-textarea").value = "";
  }
};

const submit = document.querySelector(".order-submit-btn");
submit.addEventListener("click", () => {
  const data = {
    nameBlock: document.querySelector(".name"),
    phoneBlock: document.querySelector(".phone"),
    textArea: document.querySelector(".order-textarea"),
  };
  submitHandlerClick(data);
});

const container = document.querySelector(".order-container");
const cancel = document.querySelector(".order-cancel");

const buttonClickHandler = () => {
  container.style.display = "flex";
  document.body.style = "overflow: hidden;";
};

const cancelClickHandler = () => {
  container.style.display = "none";
  document.querySelector(".order-textarea").value = "";
  document.body.style = "overflow: auto;";
};

buttons.forEach((button) =>
  button.addEventListener("click", buttonClickHandler)
);

cancel.addEventListener("click", cancelClickHandler);

const inputHandleChange = (e) => {
  e.target.value = e.target.value.replace(/[^+\d]/g, "");
  if (e.target.value.length === 1)
    if (e.target.value[0] !== "+") e.target.value = "+" + e.target.value;
    else if (e.target.value[0] === "+") e.target.value = "";
};

const input = document.querySelector(".phone");
input.addEventListener("input", inputHandleChange);

const inputForm = document.querySelector(".phone-form");

if (inputForm) {
  inputForm.addEventListener("input", inputHandleChange);
}

const formBtn = document.querySelector(".send-order-submit-btn");
if (formBtn) {
  formBtn.addEventListener("click", () => {
    const data = {
      nameBlock: document.querySelector(".name-form"),
      phoneBlock: document.querySelector(".phone-form"),
      textArea: document.querySelector(".send-order-textarea"),
    };
    submitHandlerClick(data);
  });
}

const cancelSuccessClickHandler = () => {
  document.querySelector(".send-success-container").style.display = "none";
  document.body.style = "overflow: auto";
};

const cancelSuccess = document.querySelector(".send-success-block-close");
cancelSuccess.addEventListener("click", cancelSuccessClickHandler);
