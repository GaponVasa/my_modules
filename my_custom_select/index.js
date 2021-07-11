"use strict";

const selectElement = document.querySelector(".select");
const selectOption = {
  iconUp: "chevron-up-outline",
  iconDown: "chevron-down-outline",
  defaultText: "Select from list",
  selected: "",
  selectItemsValue: [
    { id: "01", value: "one" },
    { id: "02", value: "two" },
    { id: "03", value: "three" },
    { id: "04", value: "four" },
    { id: "05", value: "five" },
    { id: "06", value: "six" },
    { id: "07", value: "seven" },
    { id: "08", value: "eight" },
    { id: "09", value: "nine" },
    { id: "10", value: "ten" },
  ],
};
const select = new Select(selectElement, selectOption);
