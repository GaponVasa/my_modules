"use strict";

const selectElement = document.querySelector(".select");
const selectOption = {
  iconUp: "chevron-up-outline",
  iconDown: "chevron-down-outline",
  defaultText: "Select from list",
  selected: "",
  selectItemsValue: [
    { id: "addition", value: "+" },
    { id: "subtraction", value: "-" },
  ],
};
const select = new Select(selectElement, selectOption);
const inputFirstDigit = document.getElementById("firstDigit");
const inputSecondDigit = document.getElementById("secondDigit");
const buttonEqual = document.getElementById("btn-equal");
const resultField = document.getElementById("result_field");

function checkField(targetEl, nameObjProp, valObj, digit, reg, selRes) {
  let keyExpression;
  if (nameObjProp === "firstDigit") {
    keyExpression = digit !== "" && reg.test(digit);
  }
  if (nameObjProp === "secondDigit") {
    keyExpression = digit !== "" && reg.test(digit) && valObj.flag;
  }
  if (nameObjProp === "signOperation") {
    keyExpression = selRes !== false && valObj.flag;
  }
  if (keyExpression) {
    valObj.flag = true;
    if (nameObjProp === "firstDigit" || nameObjProp === "secondDigit") {
      valObj[nameObjProp] = digit;
    } else {
      valObj.signOperation = selRes.value;
    }
    removeRedLine(targetEl);
  } else {
    console.log(`notok ${nameObjProp}`);
    addRedLine(targetEl);
    valObj.flag = false;
  }
}

function addRedLine(elementName) {
  elementName.classList.add("placeholder_red");
}

function removeRedLine(elementName) {
  elementName.classList.remove("placeholder_red");
}

buttonEqual.addEventListener("click", function () {
  const selectResult = select.selectedValueObj;
  const firstDigit = inputFirstDigit.value;
  const secondDigit = inputSecondDigit.value;
  const regular = /^[-|+]?\d+[.|,]?\d*$/;
  const validationObj = {
    flag: false,
    firstDigit: "no data",
    secondDigit: "no data",
    signOperation: "no data",
  };

  checkField(inputFirstDigit, "firstDigit", validationObj, firstDigit, regular);
  checkField(
    inputSecondDigit,
    "secondDigit",
    validationObj,
    secondDigit,
    regular
  );
  checkField(
    selectElement.querySelector(".select-field"),
    "signOperation",
    validationObj,
    "",
    "",
    selectResult
  );

  if (validationObj.flag) {
    inputFirstDigit.value = "";
    inputSecondDigit.value = "";
    select.clear();
    resultField.innerHTML = `${validationObj.firstDigit} ${
      validationObj.signOperation
    } ${validationObj.secondDigit} = ${mathOperationAddAndSub.start(
      validationObj.firstDigit,
      validationObj.secondDigit,
      validationObj.signOperation
    )}`;
    validationObj.flag = false;
  }
});
