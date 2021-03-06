"use strict";

function createSelectHTML(selectItemsArr, selected, defText) {
  function itemCreate(itemId, value, select_d) {
    return `<li class="select_item" data-id=${itemId} ${select_d}>${value}</li>`;
  }

  let selectedValue = "no data";
  selectItemsArr.some((el) => {
    if (el.id === selected) {
      selectedValue = el.value;
    } else {
      selectedValue = defText;
    }
    return el.id === selected;
  });
  const stringItems = selectItemsArr
    .map((element) => {
      const selectFirst = selected === element.id ? '"selected"' : "";
      return itemCreate(element.id, element.value, selectFirst);
    })
    .join("");
  return `
          <div class="select-field">
            <span class="select_text">${selectedValue}</span>
            <ion-icon name="chevron-up-outline"></ion-icon>
          </div>
          <div class="chevron-field">
            <ul class="select_list">
              ${stringItems}
            </ul>
          </div>
  `;
}

class Select {
  constructor(element, option) {
    this.$el = element;
    this.option = option;
    this.specifiedElement = document.getElementById("select");
    this.selectField;
    this.iconTag;
    this.dropDown;
    this.selectedValue = { id: "", value: "" };
    this._handlerToggleDropdownEvent =
      this._handlerToggleDropdownEvent.bind(this);
    this._hendlerSelectingDropdownInputEvent =
      this._hendlerSelectingDropdownInputEvent.bind(this);
    this._handlerClickOutsideSelectElement =
      this._handlerClickOutsideSelectElement.bind(this);
    this.create();
  }
  _createSelect() {
    this.$el.innerHTML = createSelectHTML(
      this.option.selectItemsValue,
      this.option.selected,
      this.option.defaultText
    );
  }

  _addEvents() {
    this.selectField = this.$el.querySelector(".select_text");
    this.iconTag = this.$el.querySelector("ion-icon");
    this.dropDown = this.$el.querySelector(".chevron-field");
    this.$el.addEventListener("click", this._handlerToggleDropdownEvent);
    this.dropDown.addEventListener(
      "click",
      this._hendlerSelectingDropdownInputEvent
    );
    document.addEventListener("click", this._handlerClickOutsideSelectElement);
  }

  _handlerToggleDropdownEvent() {
    const iconTagNameValue = this.iconTagName;
    if (iconTagNameValue === this.option.iconUp) {
      this.open();
    } else if (iconTagNameValue === this.option.iconDown) {
      this.close();
    }
  }

  _hendlerSelectingDropdownInputEvent(event) {
    this.selectFieldTextValue = event.target.textContent;
    this.selectedValue.id = event.target.dataset.id;
    this.selectedValue.value = event.target.textContent;
  }

  _handlerClickOutsideSelectElement(event) {
    const isClickInside = this.specifiedElement.contains(event.target);
    if (!isClickInside) {
      if (this.iconTagName === this.option.iconDown) {
        this.close();
      }
    }
  }

  get selectFieldTextValue() {
    return this.selectField.textContent;
  }

  set selectFieldTextValue(value) {
    this.selectField.innerHTML = value;
  }

  get iconTagName() {
    return this.iconTag.name;
  }

  get selectedValueObj() {
    if (this.selectedValue.id === "" && this.selectedValue.value === "") {
      return false;
    } else if (
      this.selectedValue.id !== "" ||
      this.selectedValue.value !== ""
    ) {
      return this.selectedValue;
    }
  }

  create() {
    this._createSelect();
    this._addEvents();
  }

  clear() {
    this.selectField.innerHTML = this.option.defaultText;
    this.selectedValue.id = "";
    this.selectedValue.value = "";
  }

  open() {
    this.iconTag.setAttribute("name", this.option.iconDown);
    this.$el.classList.add("open");
  }

  close() {
    this.iconTag.setAttribute("name", this.option.iconUp);
    this.$el.classList.remove("open");
  }

  destore() {
    this.$el.removeEventListener(
      "click",
      this._handlerToggleDropdownEvent,
      false
    );
    this.dropDown.removeEventListener(
      "click",
      this._hendlerSelectingDropdownInputEvent,
      false
    );
    this.$el.innerHTML = "";
  }
}
