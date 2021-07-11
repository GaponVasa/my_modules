"use strict";

function createSelectHTML(selectItemsArr, selected, defText) {
  function itemCreate(itemId, value, select_d) {
    return `<li class="select_item" data-id=${itemId} ${select_d}>${value}</li>`;
  }
  let selectedValue;
  const stringItems = selectItemsArr
    .map((element) => {
      const selectFirst = selected === element.id ? '"selected"' : "";
      selectedValue = selected === element.id ? element.value : defText;
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
    this.selectField;
    this.iconTag;
    this.dropDown;
    this.selectedValue = { id: "", value: "" };
    this._handlerToggleDropdownEvent =
      this._handlerToggleDropdownEvent.bind(this);
    this._hendlerSelectingDropdownInputEvent =
      this._hendlerSelectingDropdownInputEvent.bind(this);
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
    console.log(this.selectedValue);
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

  create() {
    this._createSelect();
    this._addEvents();
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
