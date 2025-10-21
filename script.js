"use strict";
// selecting necessary elements
const preLoader = document.getElementById("pre-loader");
const clearBtn = document.querySelector(".clear-btn");
const emptyContent = document.querySelector(".hider1");
const completedContent = document.querySelector(".hider2");
const amountDiv = document.querySelector(".amount-div");
const currencySign = document.querySelector(".currency-sign");
const mortgageAmountEl = document.querySelector("#amount");
const mortgageTermDiv = document.querySelector(".mortgage-term");
const yearsEl = document.querySelector(".years");
const mortgageTermEl = document.querySelector("#term");
const interstRateDiv = document.querySelector(".interst-rate-div");
const interestRate = document.querySelector(".interest-rate");
const mortgageRateEl = document.querySelector("#rate");
const fullRepaymentInputEl = document.querySelector("#full-repayment");
const interestOnlyInputEl = document.querySelector("#interest-only");
const repaymentDivEl = document.querySelector(".repayment-div");
const interestOnlyDivEl = document.querySelector(".interest-only-div");
const calcBtn = document.querySelector(".calculate-btn");
const monthlyRepayment = document.querySelector(".monthly-repyement");
const totalRepayment = document.querySelector(".total-repyement");
const errorMessage = document.querySelector(".error");
const errorMessage2 = document.querySelector(".error2");
const errorMessage3 = document.querySelector(".error-3");
const errorRadioMessage = document.querySelector(".error-radio");
const form = document.querySelector(".form");
const displayTime = document.querySelectorAll(".display-time");
// console.log(mortgageAmountEl.validity);

// removing the spinner after loading
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    preLoader.style.display = "none";
  }, 1200);
});

// real time update for application
setInterval(() => {
  const now = new Date();
  const timeMeridian = now.toLocaleTimeString().slice().split(" ")[1];
  const hour = now.getHours();
  const minute = `${now.getMinutes()}`.padStart(2, 0);
  const second = `${now.getSeconds()}`.padStart(2, 0);
  displayTime.forEach((time) => {
    time.textContent = `The current time is ${hour}:${minute}:${second} ${timeMeridian}`;
  });
}, 1000);

// changing the states of the input elements when active
mortgageAmountEl.addEventListener("focus", function () {
  amountDiv.style.boxShadow = "1px 1px 1px 1px hsl(61, 70%, 52%)";
  currencySign.style.backgroundColor = "hsl(61, 70%, 52%)";
  amountDiv.style.border = "none";
});
mortgageRateEl.addEventListener("focus", function () {
  interstRateDiv.style.boxShadow = "1px 1px 1px 1px hsl(61, 70%, 52%)";
  interestRate.style.backgroundColor = "hsl(61, 70%, 52%)";
  interstRateDiv.style.border = "none";
});
mortgageTermEl.addEventListener("focus", function () {
  mortgageTermDiv.style.boxShadow = "1px 1px 1px 1px hsl(61, 70%, 52%)";
  yearsEl.style.backgroundColor = "hsl(61, 70%, 52%)";
  mortgageTermDiv.style.border = "none";
});

// changing the states of the input elements when no longer active
mortgageTermEl.addEventListener("blur", function () {
  mortgageTermDiv.style.boxShadow = "1px 1px 1px 1px hsl(200, 24%, 40%)";
  yearsEl.style.backgroundColor = " hsl(203, 41%, 72%)";
});
mortgageAmountEl.addEventListener("blur", function () {
  amountDiv.style.boxShadow = "1px 1px 1px 1px hsl(200, 24%, 40%)";
  currencySign.style.backgroundColor = " hsl(203, 41%, 72%)";
});
mortgageRateEl.addEventListener("blur", function () {
  interstRateDiv.style.boxShadow = "1px 1px 1px 1px hsl(200, 24%, 40%)";
  interestRate.style.backgroundColor = " hsl(203, 41%, 72%)";
});

// changing the states of the repayment terms element when either is checked
fullRepaymentInputEl.addEventListener("change", function (e) {
  repaymentDivEl.style.border = "2px solid hsl(61, 70%, 52%)";
  interestOnlyDivEl.style.border = "none";
});
interestOnlyInputEl.addEventListener("change", function (e) {
  interestOnlyDivEl.style.border = "2px solid hsl(61, 70%, 52%)";
  repaymentDivEl.style.border = "none";
});
// error message
function showError() {
  if (!mortgageAmountEl.value) {
    errorMessage.textContent = `this field is required`;
  } else if (mortgageAmountEl.value === NaN) {
    errorMessage.textContent = `please input a valid figure`;
  }
}

// extracting form data and converting it to object
// form.addEventListener("submit", function (event) {
//   event.preventDefault();
//   const dataDetails = new FormData(event.target);
//   const covert = Object.fromEntries(dataDetails);
//   console.log(covert, dataDetails);
//   console.log(`form submitted`);
// });

mortgageAmountEl.addEventListener("input", function (e) {
  let rawValue = e.target.value.replace(/,/g, "");
  if (!isNaN(rawValue) && rawValue !== "") {
    let formattedValue = Number(rawValue).toLocaleString();
    e.target.value = formattedValue;
  }
});

// calculating the mortgage when necesarry terms are met
calcBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let rawValue = mortgageAmountEl.value.replace(/,/g, "");
  const mortgageAmount = Number(rawValue);
  const mortgageDuration = Number(mortgageTermEl.value);
  const mortgageInterest = Number(mortgageRateEl.value);
  if (!mortgageAmount || mortgageAmount === NaN) {
    showError();
    currencySign.style.backgroundColor = "hsl(4, 69%, 50%)";
    amountDiv.style.outline = "1px solid hsl(4, 69%, 50%)";
  }
  if (!mortgageDuration || mortgageDuration === NaN) {
    errorMessage2.textContent =
      mortgageDuration === NaN
        ? `input a valid number`
        : `This field is required`;
    yearsEl.style.backgroundColor = "hsl(4, 69%, 50%)";
    mortgageTermDiv.style.outline = "1px solid hsl(4, 69%, 50%)";
  }
  if (!mortgageInterest || mortgageInterest === NaN) {
    errorMessage3.textContent =
      mortgageInterest === NaN
        ? `input a valid number`
        : `This field is required`;
    interestRate.style.backgroundColor = "hsl(4, 69%, 50%)";
    interstRateDiv.style.outline = "1px solid hsl(4, 69%, 50%)";
  }
  if (
    fullRepaymentInputEl.checked === false &&
    interestOnlyInputEl.checked === false
  ) {
    errorRadioMessage.textContent = `This field is required`;
  }
  if (
    fullRepaymentInputEl.checked &&
    mortgageAmount &&
    mortgageInterest &&
    mortgageDuration
  ) {
    // formula === M = P [i(1+i)^n] / [(1+1)^n-1]
    let p = mortgageAmount;
    let i = mortgageInterest / 12;
    let n = mortgageDuration * 12;
    emptyContent.classList.add("hide");
    completedContent.classList.remove("hide");
    errorRadioMessage.textContent = "";
    errorMessage.textContent = "";
    errorMessage2.textContent = "";
    errorMessage3.textContent = "";
    mortgageTermDiv.style.outline = "none";
    interstRateDiv.style.outline = "none";
    amountDiv.style.outline = "none";
    let monthlyVaue = (p * (i * (1 + i) ** n)) / ((1 + i) ** n - 1);
    let totalValue = ((p * (i * (1 + i) ** n)) / ((1 + i) ** n - 1)) * 12;
    monthlyRepayment.textContent = Number(
      monthlyVaue.toFixed(2)
    ).toLocaleString();

    totalRepayment.textContent = Number(totalValue.toFixed(2)).toLocaleString();
  }
  if (
    interestOnlyInputEl.checked &&
    mortgageTermEl.value &&
    mortgageRateEl.value &&
    mortgageAmountEl.value
  ) {
    monthlyRepayment.textContent = ` Coming Soon!!.`;
    totalRepayment.textContent = ` Coming Soon!!.`;
    emptyContent.classList.add("hide");
    completedContent.classList.remove("hide");
    errorRadioMessage.textContent = "";
    errorMessage.textContent = "";
    errorMessage2.textContent = "";
    errorMessage3.textContent = "";
  }
  // window.print();
});

// resetting input values and removing the page displaying the calculated repayments once user clicks clear button
clearBtn.addEventListener("click", function (event) {
  emptyContent.classList.remove("hide");
  completedContent.classList.add("hide");
  fullRepaymentInputEl.checked = false;
  interestOnlyInputEl.checked = false;
  repaymentDivEl.style.outline = "none";
  interestOnlyDivEl.style.outline = "none";
  repaymentDivEl.style.border = "none";
  interestOnlyDivEl.style.border = "none";
  mortgageAmountEl.value = "";
  mortgageTermEl.value = "";
  mortgageRateEl.value = "";
  errorRadioMessage.textContent = "";
  errorMessage.textContent = "";
  errorMessage2.textContent = "";
  errorMessage3.textContent = "";
  mortgageTermDiv.style.outline = "none";
  interstRateDiv.style.outline = "none";
  amountDiv.style.outline = "none";
  interestRate.style.backgroundColor = "hsl(203, 41%, 72%)";
  currencySign.style.backgroundColor = "hsl(203, 41%, 72%)";
  yearsEl.style.backgroundColor = "hsl(203, 41%, 72%)";
});

// const amount = 300000;
// console.log(`${amount.toLocaleString().repeat(4)}`);
