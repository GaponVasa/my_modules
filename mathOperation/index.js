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

buttonEqual.addEventListener("click", function () {
  const selectResult = select.selectedValueObj;
  const regular = /^[-|+]?\d+[.|,]?\d*$/;
  const validationObj = {
    flagValidation: false,
    firstDigit: "no data",
    secondDigit: "no data",
    signOperation: "no data",
  };
  // console.log("selectedValueObj = ", select.selectedValueObj.id);
  // console.log(inputFirstDigit.value);
  // console.log(inputSecondDigit.value);
  // console.log(
  //   "regular.test(inputFirstDigit.value) = ",
  //   regular.test(inputFirstDigit.value)
  // );
  if (inputFirstDigit.value !== "" && regular.test(inputFirstDigit.value)) {
    validationObj.flagValidation = true;
    validationObj.firstDigit = inputFirstDigit.value;
  } else {
    console.log("notok inputFirstDigit");
    validationObj.flagValidation = false;
  }
  // console.log(
  //   'inputSecondDigit.value !== "" = ',
  //   inputSecondDigit.value !== ""
  // );
  // console.log(
  //   "regular.test(inputSecondDigit.value) = ",
  //   regular.test(inputSecondDigit.value)
  // );
  // console.log("validationObj.flagValidation = ", validationObj.flagValidation);
  if (
    inputSecondDigit.value !== "" &&
    regular.test(inputSecondDigit.value) &&
    validationObj.flagValidation
  ) {
    validationObj.flagValidation = true;
    validationObj.secondDigit = inputSecondDigit.value;
  } else {
    console.log("notok inputSecondDigit");
    validationObj.flagValidation = false;
  }

  if (select.selectedValueObj !== false && validationObj.flagValidation) {
    validationObj.flagValidation = true;
    validationObj.signOperation = select.selectedValueObj.value;
  } else {
    console.log("notok select ");
    validationObj.flagValidation = false;
  }

  if (validationObj.flagValidation) {
    inputFirstDigit.value = "";
    inputSecondDigit.value = "";
    select.clear();
    // console.log(validationObj);
    resultField.innerHTML = mathOperationAddAndSub.start(
      validationObj.firstDigit,
      validationObj.secondDigit,
      validationObj.signOperation
    );
    validationObj.flagValidation = false;
  }
});
