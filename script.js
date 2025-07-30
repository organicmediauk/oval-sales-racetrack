const sheetURL = 'https://docs.google.com/spreadsheets/d/11i4xqRxkZ3OWdBRPtcRfezH2bgzHt_ApQ2vDlYpGv9E/pubhtml';

const carColors = {
  Farz: 'red', Sadeq: 'blue', Mary: 'green', Ravi: 'orange', Mal: 'purple',
  Adam: 'yellow', Dean: 'cyan', Brad: 'pink', Ash: 'navy',
  Ajay: 'teal', Eugene: 'brown', Nick: 'black'
};

function init() {
  Tabletop.init({
    key: sheetURL,
    callback: drawTrack,
    simpleSheet: true
  });
}

function drawTrack(data) {
  const leaderboardBody = document.querySelector('#leaderboard tbody');
  const trackGrid = document.getElementById('track-grid');
  leaderboardBody.innerHTML = '';
  trackGrid.innerHTML = '';

  const totalSpaces = 28;

  for (let i = 0; i < totalSpaces; i++) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.dataset.space = i;
    trackGrid.appendChild(block);
  }

  data.sort((a, b) => parseInt(b.TotalSpaces) - parseInt(a.TotalSpaces));

  data.forEach((person, index) => {
    const car = document.createElement('div');
    car.classList.add('car');
    car.style.backgroundColor = carColors[person.Salesperson] || 'gray';
    const space = Math.min(parseInt(person.TotalSpaces), totalSpaces - 1);
    const block = trackGrid.querySelector(`[data-space='${space}']`);
    block.appendChild(car);

    const row = document.createElement('tr');
    row.innerHTML = `<td>${index + 1}</td><td>${person.Salesperson}</td><td>${person.TotalSpaces}</td><td>${person.LastUpdated}</td><td>${person.Notes}</td>`;
    leaderboardBody.appendChild(row);
  });
}

window.addEventListener('DOMContentLoaded', init);
