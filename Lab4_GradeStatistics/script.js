"use strict";

const mathInput = document.getElementById("mathInput");
const engInput = document.getElementById("engInput");
const submitBtn = document.getElementById("submitBtn");

const tableBody = document.getElementById("tableBody");
const errorMsg = document.getElementById("errorMsg");

const mathAvgCell = document.getElementById("mathAvg");
const engAvgCell = document.getElementById("engAvg");
const overallAvgCell = document.getElementById("overallAvg");

let rowCount = 0; // # column

function toNumber(value) {
  // empty string -> NaN
  return Number(value);
}

function isValidGrade(n) {
  
  return Number.isFinite(n) && n >= 0 && n <= 100;
}

function format2(n) {
  return n.toFixed(2);
}

function clearError() {
  errorMsg.textContent = "";
}

function setError(message) {
  errorMsg.textContent = message;
}

function addRow(math, eng) {
  rowCount += 1;

  const avg = (math + eng) / 2;

  const tr = document.createElement("tr");

  const tdIndex = document.createElement("td");
  tdIndex.textContent = String(rowCount);

  const tdMath = document.createElement("td");
  tdMath.textContent = String(math);

  const tdEng = document.createElement("td");
  tdEng.textContent = String(eng);

  const tdAvg = document.createElement("td");
  tdAvg.textContent = format2(avg);

  tr.appendChild(tdIndex);
  tr.appendChild(tdMath);
  tr.appendChild(tdEng);
  tr.appendChild(tdAvg);

  tableBody.appendChild(tr);
}

function updateColumnAverages() {
  const rows = tableBody.querySelectorAll("tr");
  const n = rows.length;

  if (n === 0) {
    mathAvgCell.textContent = "0.00";
    engAvgCell.textContent = "0.00";
    overallAvgCell.textContent = "0.00";
    return;
  }

  let mathSum = 0;
  let engSum = 0;

  rows.forEach((tr) => {
    const tds = tr.querySelectorAll("td");
    // tds[0] = index, tds[1] = Math, tds[2] = English, tds[3] = Average
    const m = Number(tds[1].textContent);
    const e = Number(tds[2].textContent);
    mathSum += m;
    engSum += e;
  });

  const mathAvg = mathSum / n;
  const engAvg = engSum / n;
  const overallAvg = (mathSum + engSum) / (2 * n);

  mathAvgCell.textContent = format2(mathAvg);
  engAvgCell.textContent = format2(engAvg);
  overallAvgCell.textContent = format2(overallAvg);
}

function handleSubmit() {
  clearError();

  const math = toNumber(mathInput.value);
  const eng = toNumber(engInput.value);

  if (!isValidGrade(math) || !isValidGrade(eng)) {
    setError("Please enter valid numbers (0–100) for both Math and English.");
    return;
  }

  addRow(math, eng);
  updateColumnAverages();

  // reset inputs
  mathInput.value = "";
  engInput.value = "";
  mathInput.focus();
}

submitBtn.addEventListener("click", handleSubmit);

[mathInput, engInput].forEach((inp) => {
  inp.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSubmit();
  });
});
