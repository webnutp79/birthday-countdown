function displayCountdown(differenceDate) {
  console.log(
    `${
      differenceDate.getUTCDate() - 1
    } nap ${differenceDate.getUTCHours()} : ${differenceDate.getUTCMinutes()} : ${differenceDate.getUTCSeconds()}`
  );
}

function renderHTML(content) {
  let numberContainers = "";
  for (let { metric, description } of content.clockface) {
    numberContainers += `
    <div class="number-container">
        <div class="number">${metric}</div>
        <p class="description">${description}</p>
    </div>
    `;
  }

  $birthdayCardDiv.innerHTML = `
  <h1>${content.greeting}</h1>
  <div class="display-container">${numberContainers}</div>
  `;
}

function generateClockNumber(number) {
  if (number < 10) {
    return `0${number}`;
  }
  return `${number}`;
}

function getDifferenceDate(referenceDate) {
  return new Date(referenceDate.getTime() - Date.now());
}

function getContent(differenceDate) {
  const differenceArray = ["nap", "óra", "perc", "mperc"].map(
    (x) => (x = { description: x, metric: "00" })
  );
  const content = { greeting: "Boldog 45. Születésnapot!" };
  content.clockface = differenceArray;
  if (differenceDate > 0) {
    content.greeting = "Készülj! Születésnapod lesz";
    content.clockface[0].metric = generateClockNumber(
      differenceDate.getUTCDate() - 1
    );
    content.clockface[1].metric = generateClockNumber(
      differenceDate.getUTCHours()
    );
    content.clockface[2].metric = generateClockNumber(
      differenceDate.getUTCMinutes()
    );
    content.clockface[3].metric = generateClockNumber(
      differenceDate.getUTCSeconds()
    );
  }

  return content;
}

function stopCountdownCallback(intervalID) {
  clearInterval(intervalID);
}

function countdownCallback() {
  const differenceDate = getDifferenceDate(referenceDate);
  const content = getContent(differenceDate);

  if (!(differenceDate > 0)) {
    stopCountdownCallback(intervalID);
  }
  renderHTML(content);
}

const referenceDate = new Date(2024, 9, 13, 9, 30, 0); // Ide írd a születésed időpontját

const $birthdayCardDiv = document.querySelector(".js-birthday-card");

const intervalID = setInterval(countdownCallback, 1000);
