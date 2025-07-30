const sheetURL = 'https://docs.google.com/spreadsheets/d/11i4xqRxkZ3OWdBRPtcRfezH2bgzHt_ApQ2vDlYpGv9E/pubhtml';

const carColors = {
  Farz: 'red', Sadeq: 'blue', Mary: 'green', Ravi: 'orange', Mal: 'purple',
  Adam: 'yellow', Dean: 'cyan', Brad: 'pink', Ash: 'navy',
  Ajay: 'teal', Eugene: 'brown', Nick: 'black'
};

const milestones = {
  6: '🎟️',
  9: '📞',
  10: '⏩',
  12: '🎟️',
  13: '⏩',
  16: '🎟️',
  20: '📞',
  22: '🎟️',
  24: '📞'
};

function getOvalPosition(cx, cy, rx, ry, step, totalSteps) {
  const angle = (step / totalSteps) * 2 * Math.PI;
  return {
    x: cx + rx * Math.cos(angle),
    y: cy + ry * Math.sin(angle)
  };
}

function init() {
  Tabletop.init({
    key: sheetURL,
    callback: drawTrack,
    simpleSheet: true
  });
}

function drawTrack(data) {
  const svg = document.getElementById('racetrack');
  const leaderboardBody = document.querySelector('#leaderboard tbody');
  leaderboardBody.innerHTML = '';

  const totalSpaces = 28;
  const centerX = 400, centerY = 300, rx = 300, ry = 200;

  data.sort((a, b) => parseInt(b.TotalSpaces) - parseInt(a.TotalSpaces));

  const positions = {};
  for (let i = 0; i < totalSpaces; i++) {
    const { x, y } = getOvalPosition(centerX, centerY, rx, ry, i, totalSpaces);
    positions[i] = { x, y };

    if (milestones[i]) {
      const icon = document.createElementNS("http://www.w3.org/2000/svg", "text");
      icon.setAttribute("x", x);
      icon.setAttribute("y", y - 25);
      icon.setAttribute("class", "milestone");
      icon.textContent = milestones[i];
      svg.appendChild(icon);
    }

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", x);
    label.setAttribute("y", y + 20);
    label.textContent = i.toString();
    svg.appendChild(label);
  }

  data.forEach((person, index) => {
    const space = Math.min(parseInt(person.TotalSpaces), totalSpaces - 1);
    const { x, y } = positions[space];
    const car = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    car.setAttribute("cx", x);
    car.setAttribute("cy", y);
    car.setAttribute("r", "8");
    car.setAttribute("class", "car");
    car.setAttribute("fill", carColors[person.Salesperson] || 'gray');
    svg.appendChild(car);

    const row = document.createElement('tr');
    row.innerHTML = `<td>${index + 1}</td><td>${person.Salesperson}</td><td>${person.TotalSpaces}</td><td>${person.LastUpdated}</td><td>${person.Notes}</td>`;
    leaderboardBody.appendChild(row);
  });
}

window.addEventListener('DOMContentLoaded', init);
