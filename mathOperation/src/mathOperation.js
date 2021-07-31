"use strict";

/*
 * Модуль mathOperationAddAndSub приймає на вхід три параметри в вигляді string рядків
 * 	1.)перше число(десятковий дріб або ціле число з різним знаком);
 * 	2.)друге число(десятковий дріб або ціле число з різним знаком);
 * 	3.)знак дії(додавання або віднімання);
 * На виході число(десятковий дріб або ціле число з різним знаком) у вигляді string.
 * Ціль написання даного модуля: в JS є виправлення проблеми з десятковими дробами коли 0.3 - 0.1 = 0.09999999999999998.
 */

let mathOperationAddAndSub = (function () {
  let point = (digit1, digit2, action) => {
    const digA = parseFloat(digit1);
    const digB = parseFloat(digit2);
    const absA = Math.abs(digA);
    const absB = Math.abs(digB);
    const bigArr1 = absA.toString().split("");
    const bigArr2 = absB.toString().split("");
    const resultArr = [];
    let diff = "no data";
    let result = "no data";

    const rewriteArr = (sourceArr, targetArr) => {
      targetArr.splice(0, targetArr.length);
      sourceArr.forEach((element) => targetArr.push(element));
    };
    /*
     * Додавання двох чисел в вигляді массивів з однаковим розташуванням крапки
     * і одинаковою кількістю елементів. Знаки в числах відсутні.
     */
    const addArr = (arr1, arr2, result) => {
      let add = 0;
      for (let i = 0, bigLength = arr1.length; i < bigLength; i++) {
        if (arr1[i] !== ".") {
          const sum = parseInt(arr1[i]) + parseInt(arr2[i]) + add;
          if (sum > 9) {
            const tempArr = sum.toString().split("").reverse();
            result.push(tempArr[0]);
            add = parseInt(tempArr[1]);
          } else {
            result.push(sum.toString());
            add = 0;
          }
        } else {
          result.push(".");
        }
      }
      if (add > 0) {
        result.push(add.toString());
      }
    };
    /*
     * Віднімання двох чисел в вигляді массивів з однаковим розташуванням крапки
     * і одинаковою кількістю елементів. Знаки в числах відсутні.
     */
    const subArr = (arr1, arr2, result) => {
      let sub = "no data";
      let intermediate = "no data";
      for (let i = 0, bigLength = arr1.length; i < bigLength; i++) {
        if (arr1[i] !== ".") {
          let a = parseInt(arr1[i]);
          const b = parseInt(arr2[i]);
          sub = a - b;
          if (sub < 0) {
            a = a + 10;
            sub = a - b;
            if (arr1[i + 1] === ".") {
              intermediate = parseInt(arr1[i + 2]) - 1;
              arr1[i + 2] = intermediate;
            } else {
              intermediate = parseInt(arr1[i + 1]) - 1;
              arr1[i + 1] = intermediate;
            }
            result.push(sub.toString());
          } else {
            result.push(sub.toString());
          }
        } else {
          result.push(".");
        }
      }
    };
    /*
     *Пошук індекса крапки pointIndex в числі(представлене в вигляді масиву arr). Додавання якщо такої немає.
     */
    const findPointIndex = (arr) => {
      let findIndex = "no data";
      arr.some((el, ind, arr) => {
        if (el === ".") {
          findIndex = ind;
          return true;
        } else if (ind === arr.length - 1) {
          arr.push(".");
          arr.push("0");
          findIndex = arr.length - 2;
          return true;
        }
      });
      return findIndex;
    };
    /*
     *В числах прибираємо крапку і нуль позаду числа. І нулі попереду.
     */
    const resizeArr = (arr) => {
      const arrNew = [];
      let flagRight = true;
      let flagLeft = true;
      let signMinus = false;
      let length = "no data";
      //прибираємо знак числа з масиву
      if (arr[0] === "-") {
        signMinus = true;
        arr.shift();
      }
      length = arr.length;
      //Перебираємо ліву частину(цілі числа) до крапки
      for (let i = 0; i < length; i++) {
        if (flagLeft) {
          if (arr[i] !== "0" || arr[i + 1] === ".") {
            arrNew.push(arr[i]);
            flagLeft = false;
          }
        } else {
          arrNew.push(arr[i]);
        }
      }
      //Перебираємо праву частину(дріб) до крапки
      for (let length = arrNew.length, i = length - 1; i > 0; i--) {
        if (flagRight) {
          if (arrNew[i] === "0") {
            arrNew.pop();
          } else if (arrNew[i] === ".") {
            arrNew.pop();
            flagRight = false;
          } else {
            flagRight = false;
          }
        }
      }
      if (signMinus) {
        if ((arrNew[0] === "0" && arrNew[1] === ".") || arrNew[0] !== "0") {
          arrNew.unshift("-");
        }
      }
      rewriteArr(arrNew, arr);
    };
    const pointIndex1 = findPointIndex(bigArr1);
    const pointIndex2 = findPointIndex(bigArr2);
    //Початок блока коду який відповідає за вирівнювання чисел в масивах
    if (pointIndex1 > pointIndex2) {
      //вирівнюємо цілу частину числа
      for (diff = pointIndex1 - pointIndex2; diff > 0; diff--) {
        bigArr2.unshift("0");
      }
    } else {
      for (diff = pointIndex2 - pointIndex1; diff > 0; diff--) {
        bigArr1.unshift("0");
      }
    }
    if (bigArr1.length > bigArr2.length) {
      //вирівнюємо дробову частину числа
      for (diff = bigArr1.length - bigArr2.length; diff > 0; diff--) {
        bigArr2.push("0");
      }
    } else {
      for (diff = bigArr2.length - bigArr1.length; diff > 0; diff--) {
        bigArr1.push("0");
      }
    }
    //Кінець блока коду який відповідає за вирівнювання чисел в масивах
    /*
     *Початок блока коду який відповідає за вибір математичної операції в
     * залежності від знаку дії, знаків чисел та самих чисел(більше/менше,
     *одинакові або нуль)
     */
    if (action === "+") {
      if (digA > 0 && digB > 0) {
        //a+b=r
        addArr(bigArr1.reverse(), bigArr2.reverse(), resultArr);
      } else if (digA < 0 && digB > 0) {
        //-a+b=(+/-)r
        if (absA >= absB) {
          subArr(bigArr1.reverse(), bigArr2.reverse(), resultArr);
          resultArr.push("-");
        } else if (absA < absB) {
          subArr(bigArr2.reverse(), bigArr1.reverse(), resultArr);
        }
      } else if (digA > 0 && digB < 0) {
        //a+(-b)=(+/-)r
        if (absA >= absB) {
          subArr(bigArr1.reverse(), bigArr2.reverse(), resultArr);
        } else if (absA < absB) {
          subArr(bigArr2.reverse(), bigArr1.reverse(), resultArr);
          resultArr.push("-");
        }
      } else if (digA < 0 && digB < 0) {
        //-a+(-b)=(-r)
        addArr(bigArr1.reverse(), bigArr2.reverse(), resultArr);
        resultArr.push("-");
      }
      if (digA === 0) {
        //коли одна з цифр нуль
        bigArr2.reverse();
        rewriteArr(bigArr2, resultArr);
        if (digB < 0) {
          resultArr.push("-");
        }
      } else if (digB === 0) {
        bigArr1.reverse();
        rewriteArr(bigArr1, resultArr);
        if (digA < 0) {
          resultArr.push("-");
        }
      }
    } else if (action === "-") {
      if (digA > 0 && digB > 0) {
        //a-b=(+/-)r
        if (absA >= absB) {
          subArr(bigArr1.reverse(), bigArr2.reverse(), resultArr);
        } else if (absA < absB) {
          subArr(bigArr2.reverse(), bigArr1.reverse(), resultArr);
          resultArr.push("-");
        }
      } else if (digA < 0 && digB > 0) {
        //-a-b=(-r)
        addArr(bigArr1.reverse(), bigArr2.reverse(), resultArr);
        resultArr.push("-");
      } else if (digA > 0 && digB < 0) {
        addArr(bigArr1.reverse(), bigArr2.reverse(), resultArr);
      } else if (digA < 0 && digB < 0) {
        //a-(-b)=r
        if (absA >= absB) {
          subArr(bigArr1.reverse(), bigArr2.reverse(), resultArr);
          resultArr.push("-");
        } else if (absA < absB) {
          //-a-(-b)=(+/-)r
          subArr(bigArr2.reverse(), bigArr1.reverse(), resultArr);
        }
      }
      if (digA === 0) {
        //коли одна з цифр нуль
        bigArr2.reverse();
        rewriteArr(bigArr2, resultArr);
        resultArr.push("-");
      } else if (digB === 0) {
        bigArr1.reverse();
        rewriteArr(bigArr1, resultArr);
        if (digA < 0) {
          resultArr.push("-");
        }
      }
    }
    //Кінець блока коду який відповідає за вибір математичної операції в залежності від знаку дії і знаків чисел
    resultArr.reverse();
    resizeArr(resultArr);
    result = resultArr.join("");
    return result;
  };
  return {
    start: function (digit1, digit2, action) {
      console.log(digit1, action, digit2, " = ", point(digit1, digit2, action));
      //return point(digit1, digit2, action);
    },
  };
})();

mathOperationAddAndSub.start(-2, 0, "+");
console.log("--------------------------------------------------------");
mathOperationAddAndSub.start(0.1, 0.2, "+");
console.log("--------------------------------------------------------");
mathOperationAddAndSub.start(0.1, 2, "-");
console.log("--------------------------------------------------------");
mathOperationAddAndSub.start(-2, 0, "-");
console.log("--------------------------------------------------------");
mathOperationAddAndSub.start(0, 0, "-");
console.log("--------------------------------------------------------");
mathOperationAddAndSub.start(0, 0, "+");
console.log("--------------------------------------------------------");
mathOperationAddAndSub.start(0.1, -0.4, "+");
console.log("--------------------------------------------------------");
mathOperationAddAndSub.start(2, 8, "+");
console.log("--------------------------------------------------------");
mathOperationAddAndSub.start(2, 10, "+");
console.log("--------------------------------------------------------");
mathOperationAddAndSub.start(2.0123456789, 10234567789.987654321, "+");
console.log("--------------------------------------------------------");
mathOperationAddAndSub.start(-2, -10, "-");
console.log("--------------------------------------------------------");
