const savedDate = localStorage.getItem('saved-date');

const container = document.querySelector('#d-day-container');
const messageContainer = document.querySelector('#d-day-message');

const intervalIdArr = [];

const dateFormMaker = () => {
  const inputYear = document.querySelector('#target-year-input').value;
  const inputMonth = document.querySelector('#target-month-input').value;
  const inputDate = document.querySelector('#target-date-input').value;

  return `${inputYear}-${inputMonth}-${inputDate}`;
};

const counterMaker = (data) => {
  if (data !== savedDate) {
    localStorage.setItem('saved-date', data);
  }
  const nowDate = new Date();
  const targetDate = new Date(data).setHours(0, 0, 0, 0);
  const remaining = (targetDate - nowDate) / 1000;

  if (remaining <= 0) {
    resetTimer('타이머가 종료되었습니다.');
    return;
  } else if (isNaN(remaining)) {
    resetTimer('유효한 시간대가 아닙니다.');
    return;
  }

  const remainingObj = {
    remainingDate: Math.floor(remaining / 3600 / 24),
    remainingHours: Math.floor(remaining / 3600) % 24,
    remainingMin: Math.floor(remaining / 60) % 60,
    remainingSec: Math.floor(remaining) % 60,
  };

  const documentArr = ['days', 'hours', 'min', 'sec'];
  const timeKeys = Object.keys(remainingObj);

  const format = (time) => {
    return time < 10 ? '0' + time : time;
  };

  let i = 0;
  for (let tag of documentArr) {
    const remainingTime = format(remainingObj[timeKeys[i]]);
    document.getElementById(tag).textContent = remainingTime;
    i++;
  }
};

const starter = (targetDateInput) => {
  if (!targetDateInput) {
    targetDateInput = dateFormMaker();
  }
  container.style.display = 'flex';
  messageContainer.style.display = 'none';
  setClearInterval();
  counterMaker(targetDateInput);
  const intervalId = setInterval(() => {
    counterMaker(targetDateInput);
  }, 1000);
  intervalIdArr.push(intervalId);
};

const setClearInterval = () => {
  for (let i = 0; i < intervalIdArr.length; i++) {
    clearInterval(intervalIdArr[i]);
  }
  localStorage.removeItem('saved-date');
};

const resetTimer = (message) => {
  if (message === undefined) {
    message = 'D-Day를 입력하세요.';
  }
  container.style.display = 'none';
  messageContainer.innerHTML = `<h3>${message}</h3>`;
  messageContainer.style.display = 'flex';
  setClearInterval();
};

if (savedDate) {
  starter(savedDate);
} else {
  container.style.display = 'none';
  messageContainer.innerHTML = '<h3>D-Day를 입력하세요.</h3>';
}
