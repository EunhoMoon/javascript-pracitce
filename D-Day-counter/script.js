const container = document.querySelector("#d-day-container");
const messageContainer = document.querySelector("#d-day-message");
container.style.display = "none";
messageContainer.innerHTML = "<h3>D-Day를 입력하세요.</h3>";

const counterMaker = () => {
  const nowDate = new Date();
  const targetDate = new Date(dateFormMaker()).setHours(0, 0, 0, 0);
  const remaining = (targetDate - nowDate) / 1000;

  if (remaining <= 0) {
    messageContainer.style.display = "flex";
    container.style.display = "none";
    messageContainer.innerHTML = "<h3>타이머가 종료되었습니다.</h3>";
  } else if (isNaN(remaining)) {
    messageContainer.style.display = "flex";
    container.style.display = "none";
    messageContainer.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>";
  } else {
    messageContainer.style.display = "none";
    container.style.display = "flex";

    const remainingObj = {
      remainingDate: Math.floor(remaining / 3600 / 24),
      remainingHours: Math.floor(remaining / 3600) % 24,
      remainingMin: Math.floor(remaining / 60) % 60,
      remainingSec: Math.floor(remaining) % 60,
    };

    const documentObj = {
      days: document.getElementById("days"),
      hours: document.getElementById("hours"),
      min: document.getElementById("min"),
      sec: document.getElementById("sec"),
    };

    const timeKeys = Object.keys(remainingObj);
    const docKeys = Object.keys(documentObj);

    for (let i = 0; i < timeKeys.length; i++) {
      documentObj[docKeys[i]].textContent = remainingObj[timeKeys[i]];
    }
  }
};

const dateFormMaker = () => {
  const inputYear = document.querySelector("#target-year-input").value;
  const inputMonth = document.querySelector("#target-month-input").value;
  const inputDate = document.querySelector("#target-date-input").value;

  return `${inputYear}-${inputMonth}-${inputDate}`;
};
