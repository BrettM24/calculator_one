//Functions

//1) Function to determine length of number

function lengthDetermine(numExtract){
  
  if(numExtract.length < 8){

    return true;

  }else{

    return false;

  };

};

function currentNumber(){

  let inputStatement = document.querySelector(".inputScreen");

  const inputArray = inputStatement.textContent.split("");

  let storeArray = []; 
  let numExtract = [];
  let returnArray = [];

  for(let n = 0; n < inputArray.length; n++){

    if(inputArray[n] == " "){
      
      storeArray.push(n); //Stores where the spaces surrounding the operator occurs

    };

  };

  returnArray.unshift(storeArray);
 
  if(storeArray.length == 0){

    returnArray.unshift(inputArray);

    return returnArray;

  };

   //Above for loop determines where in input operator has been placed, if at all
   //If the storeArray has a length of two then we know an operator is in place and we are on the 2nd number
  
  if(storeArray.length == 2){ // If an operator is in place
    
    let m = 0;    

    while(m < (inputArray.length - storeArray[1] - 1)){

      numExtract.unshift(inputArray[inputArray.length - 1 - m]);
      
      m++;

    };
    
    returnArray.unshift(numExtract);

    return returnArray;

  };

};

function decimalCheck(currentNumber){

  for(let n = 0; n < currentNumber.length; n++){

    if(currentNumber[n] == "."){

      return n; //returns position index of where the decimal sits

    };

  };

  return 0;

};

function checkDigitAfterDecimal(currentNumber, n){ //n is passed through from decimalCheck above

  if(n != 0){

    if((currentNumber.length - 1) == n){ //i.e the decimal is the last item in the array

      return true; //this true tells eventlistner it is allowed for a digit to be added, as the one "space" is open for it.

    }else{

      return false;

    };

  };

};

function operate(){ //#5

  let answerScreen = document.querySelector(".answerScreen");
  let inputScreen = document.querySelector(".inputScreen");
  let inputArray = inputScreen.textContent.split("");
  let storeArray = [];

  //#5.1
  for(let n = 0; n < inputArray.length; n++){

    if(inputArray[n] == " "){
      
      storeArray.push(n); //Stores where the spaces surrounding the operator occurs

    };

  };
  //#5.1

  //#5.2
  if(storeArray.length == 0){

    answerScreen.textContent = inputScreen.textContent;

  }else{

    let inputOperateArray = inputScreen.textContent.split(" ");
    
    let numOne = Number(inputOperateArray[0]);
    let numTwo = Number(inputOperateArray[2]);

    let numAnswer;

    if(inputOperateArray[1] == "+"){

      numAnswer = numOne + numTwo;

    }else if(inputOperateArray[1] == "-"){

      numAnswer = numOne - numTwo;

    }else if(inputOperateArray[1] == "/"){

      numAnswer = (numOne / numTwo);

    }else{

      numAnswer = numOne * numTwo;

    };

    numAnswer = (Math.round(numAnswer * 10) / 10);

    answerScreen.textContent = inputScreen.textContent;

    inputScreen.textContent = numAnswer;

  };
  //#5.2

};

function operateValidityCheck(){

  let inputScreen = document.querySelector(".inputScreen");
  let inputArray = inputScreen.textContent.split("");
  let storeArray = [];

  console.log(inputArray);

  for(let n = 0; n < inputArray.length; n++){

    if(inputArray[n] == " "){
      
      storeArray.push(n); //Stores where the spaces surrounding the operator occurs

    };

  };

  if(storeArray.length != 0){  // Storearray has " ", therefore operator is in palce and on 2nd number

    if(inputArray[inputArray.length - 1] == " " || inputArray[inputArray.length - 1] == "."){
       //2nd number is empty           or          //2nd number is ending in the decimal point

      return false;

    };

    //If 2nd number is "0"
    if(inputArray[inputArray.length - 1] == "0" && inputArray[inputArray.length - 2] == " "){ 

      if(inputArray[storeArray[0] + 1] == "/"){

        return false;

      };

    };

    //If 2nd number is "0.0"
    if(inputArray[inputArray.length - 1] == "0" && inputArray[inputArray.length - 2] == "." && inputArray[inputArray.length - 3] == "0" && inputArray[inputArray.length - 4] == " "){

      if(inputArray[storeArray[0] + 1] == "/"){

        return false;

      };

    };

    return true; //if none of above present then allow operation

  }else{  // Otherwise 2nd number equals zero, no operator in place

    if(inputArray[inputArray.length - 1] == "."){

      return false;

    };

    return true;

  };
  
};

//Event listeners

const buttonOne = document.querySelector("#buttonOne");
buttonOne.addEventListener("mousedown", () =>{
  
  //#1
  const inputScreenIDCheck = document.querySelector(".inputScreen");
  const answerScreenIDCheck = document.querySelector(".answerScreen");

  if(inputScreenIDCheck.id == "answer"){

    inputScreenIDCheck.setAttribute("id", "input");

    answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;

    inputScreenIDCheck.textContent = "_";

  };
  //#1

  //#2
  buttonOne.setAttribute("id", "buttonOnePressed"); // #a

  let arrayNumStore = currentNumber();

  console.log(arrayNumStore[0].length);

  console.log(arrayNumStore[0][arrayNumStore.length - 1]);

  let numLength = lengthDetermine(arrayNumStore[0]);

  let decimalChecker = decimalCheck(arrayNumStore[0]);

  let digitAfterDecimal = checkDigitAfterDecimal(arrayNumStore[0], decimalChecker);

  //#2.1
  if(decimalChecker == 0){

    if(numLength == true){
    
      const inputScreen = document.querySelector(".inputScreen");
    
      if(inputScreen.textContent == "_" || inputScreen.textContent == "ANSWER TOO LONG"){
        
        inputScreen.textContent = "1";
    
      }else if(arrayNumStore[0][arrayNumStore[0].length - 1] == 0 && arrayNumStore[0].length == 1){

        console.log("Hey, cannot have a digit after a zero");

      }else{
        
        inputScreen.textContent = (inputScreen.textContent + "1");
    
      };
  
    };
  //#2.1

  //#2.2
  }else{
  
    if(digitAfterDecimal == true){
  
      if(numLength == true){
    
        const inputScreen = document.querySelector(".inputScreen");
          
        inputScreen.textContent = (inputScreen.textContent + "1");
    
      };
  
    };

  };
  //#2.2

  //#2

});

//#a
buttonOne.addEventListener("mouseup", () => {

  buttonOne.setAttribute("id", "buttonOne");

});


const buttonTwo = document.querySelector("#buttonTwo");
buttonTwo.addEventListener("mousedown", () =>{

  const inputScreenIDCheck = document.querySelector(".inputScreen");
  const answerScreenIDCheck = document.querySelector(".answerScreen");

  if(inputScreenIDCheck.id == "answer"){

    inputScreenIDCheck.setAttribute("id", "input");

    answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;

    inputScreenIDCheck.textContent = "_";

  };

  buttonTwo.setAttribute("id", "buttonTwoPressed");

  let arrayNumStore = currentNumber();

  let numLength = lengthDetermine(arrayNumStore[0]);

  let decimalChecker = decimalCheck(arrayNumStore[0]);

  let digitAfterDecimal = checkDigitAfterDecimal(arrayNumStore[0], decimalChecker);

  if(decimalChecker == 0){

    if(numLength == true){
    
      const inputScreen = document.querySelector(".inputScreen");
    
      if(inputScreen.textContent == "_" || inputScreen.textContent == "ANSWER TOO LONG"){
        
        inputScreen.textContent = "2";
    
      }else if(arrayNumStore[0][arrayNumStore[0].length - 1] == 0 && arrayNumStore[0].length == 1){

        console.log("Hey, cannot have a digit after a zero");

      }else{
        
        inputScreen.textContent = (inputScreen.textContent + "2");
    
      };
  
    };

  }else{

    if(digitAfterDecimal == true){
  
      if(numLength == true){
      
        const inputScreen = document.querySelector(".inputScreen");
 
        inputScreen.textContent = (inputScreen.textContent + "2");
      
      };
  
    };

  };

});

buttonTwo.addEventListener("mouseup", () => {

    buttonTwo.setAttribute("id", "buttonTwo");
  
});

const buttonThree = document.querySelector("#buttonThree");
buttonThree.addEventListener("mousedown", () =>{

  const inputScreenIDCheck = document.querySelector(".inputScreen");
  const answerScreenIDCheck = document.querySelector(".answerScreen");

  if(inputScreenIDCheck.id == "answer"){

    inputScreenIDCheck.setAttribute("id", "input");

    answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;

    inputScreenIDCheck.textContent = "_";

  };

  buttonThree.setAttribute("id", "buttonThreePressed");

  let arrayNumStore = currentNumber();

  let numLength = lengthDetermine(arrayNumStore[0]);

  let decimalChecker = decimalCheck(arrayNumStore[0]);

  let digitAfterDecimal = checkDigitAfterDecimal(arrayNumStore[0], decimalChecker);

  if(decimalChecker == 0){

    if(numLength == true){
    
      const inputScreen = document.querySelector(".inputScreen");
    
      if(inputScreen.textContent == "_" || inputScreen.textContent == "ANSWER TOO LONG"){
        
        inputScreen.textContent = "3";
    
      }else if(arrayNumStore[0][arrayNumStore[0].length - 1] == 0 && arrayNumStore[0].length == 1){

        console.log("Hey, cannot have a digit after a zero");
      
      }else{
        
        inputScreen.textContent = (inputScreen.textContent + "3");
    
      };
  
    };

  }else{
  
    if(digitAfterDecimal == true){
  
      if(numLength == true){
      
        const inputScreen = document.querySelector(".inputScreen");
       
        inputScreen.textContent = (inputScreen.textContent + "3");
      
      };
  
    };

  };

});

buttonThree.addEventListener("mouseup", () => {

    buttonThree.setAttribute("id", "buttonThree");
  
});

const buttonFour = document.querySelector("#buttonFour");
buttonFour.addEventListener("mousedown", () =>{

  const inputScreenIDCheck = document.querySelector(".inputScreen");
  const answerScreenIDCheck = document.querySelector(".answerScreen");

  if(inputScreenIDCheck.id == "answer"){

    inputScreenIDCheck.setAttribute("id", "input");

    answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;

    inputScreenIDCheck.textContent = "_";

  };

  buttonFour.setAttribute("id", "buttonFourPressed");

  let arrayNumStore = currentNumber();

  let numLength = lengthDetermine(arrayNumStore[0]);

  let decimalChecker = decimalCheck(arrayNumStore[0]);

  let digitAfterDecimal = checkDigitAfterDecimal(arrayNumStore[0], decimalChecker);
  
  if(decimalChecker == 0){

    if(numLength == true){
      
      const inputScreen = document.querySelector(".inputScreen");
      
      if(inputScreen.textContent == "_" || inputScreen.textContent == "ANSWER TOO LONG"){
        
        inputScreen.textContent = "4";
    
      }else if(arrayNumStore[0][arrayNumStore[0].length - 1] == 0 && arrayNumStore[0].length == 1){

        console.log("Hey, cannot have a digit after a zero");

      }else{
        
        inputScreen.textContent = (inputScreen.textContent + "4");
    
      };
  
    };

  }else{

    if(digitAfterDecimal == true){
  
      if(numLength == true){
      
        const inputScreen = document.querySelector(".inputScreen");
          
        inputScreen.textContent = (inputScreen.textContent + "4");

      };
  
    }; 

  };

});

buttonFour.addEventListener("mouseup", () => {

    buttonFour.setAttribute("id", "buttonFour");
  
});

const buttonFive = document.querySelector("#buttonFive");
buttonFive.addEventListener("mousedown", () =>{

  const inputScreenIDCheck = document.querySelector(".inputScreen");
  const answerScreenIDCheck = document.querySelector(".answerScreen");

  if(inputScreenIDCheck.id == "answer"){

    inputScreenIDCheck.setAttribute("id", "input");

    answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;

    inputScreenIDCheck.textContent = "_";

  };
  
  buttonFive.setAttribute("id", "buttonFivePressed");

  let arrayNumStore = currentNumber();

  let numLength = lengthDetermine(arrayNumStore[0]);

  let decimalChecker = decimalCheck(arrayNumStore[0]);

  let digitAfterDecimal = checkDigitAfterDecimal(arrayNumStore[0], decimalChecker);

  if(decimalChecker == 0){

    if(numLength == true){
    
      const inputScreen = document.querySelector(".inputScreen");
      
      if(inputScreen.textContent == "_" || inputScreen.textContent == "ANSWER TOO LONG"){
        
        inputScreen.textContent = "5";
    
      }else if(arrayNumStore[0][arrayNumStore[0].length - 1] == 0 && arrayNumStore[0].length == 1){

        console.log("Hey, cannot have a digit after a zero");

      }else{
        
        inputScreen.textContent = (inputScreen.textContent + "5");
    
      };
  
    };

  }else{
  
    if(digitAfterDecimal == true){
  
      if(numLength == true){
    
        const inputScreen = document.querySelector(".inputScreen");
 
        inputScreen.textContent = (inputScreen.textContent + "5");

      };
  
    };
  
  };

});

buttonFive.addEventListener("mouseup", () => {

  buttonFive.setAttribute("id", "buttonFive");
  
});


const buttonSix = document.querySelector("#buttonSix");
buttonSix.addEventListener("mousedown", () =>{

  const inputScreenIDCheck = document.querySelector(".inputScreen");
  const answerScreenIDCheck = document.querySelector(".answerScreen");

  if(inputScreenIDCheck.id == "answer"){

    inputScreenIDCheck.setAttribute("id", "input");

    answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;

    inputScreenIDCheck.textContent = "_";

  };

  buttonSix.setAttribute("id", "buttonSixPressed");

  let arrayNumStore = currentNumber();

  let numLength = lengthDetermine(arrayNumStore[0]);

  let decimalChecker = decimalCheck(arrayNumStore[0]);

  let digitAfterDecimal = checkDigitAfterDecimal(arrayNumStore[0], decimalChecker);

  if(decimalChecker == 0){

    if(numLength == true){
      
      const inputScreen = document.querySelector(".inputScreen");
      
      if(inputScreen.textContent == "_" || inputScreen.textContent == "ANSWER TOO LONG"){
        
        inputScreen.textContent = "6";
    
      }else if(arrayNumStore[0][arrayNumStore[0].length - 1] == 0 && arrayNumStore[0].length == 1){

        console.log("Hey, cannot have a digit after a zero");

      }else{
        
        inputScreen.textContent = (inputScreen.textContent + "6");
    
      };
  
    };

  }else{
  
    if(digitAfterDecimal == true){
  
      if(numLength == true){
      
        const inputScreen = document.querySelector(".inputScreen");
          
        inputScreen.textContent = (inputScreen.textContent + "6");
      
      };
  
    };
  
  };

});

buttonSix.addEventListener("mouseup", () => {

  buttonSix.setAttribute("id", "buttonSix");
    
});


const buttonSeven = document.querySelector("#buttonSeven");
buttonSeven.addEventListener("mousedown", () =>{

  const inputScreenIDCheck = document.querySelector(".inputScreen");
  const answerScreenIDCheck = document.querySelector(".answerScreen");

  if(inputScreenIDCheck.id == "answer"){

    inputScreenIDCheck.setAttribute("id", "input");

    answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;

    inputScreenIDCheck.textContent = "_";

  };

  buttonSeven.setAttribute("id", "buttonSevenPressed");

  let arrayNumStore = currentNumber();

  let numLength = lengthDetermine(arrayNumStore[0]);

  let decimalChecker = decimalCheck(arrayNumStore[0]);

  let digitAfterDecimal = checkDigitAfterDecimal(arrayNumStore[0], decimalChecker);

  if(decimalChecker == 0){

    if(numLength == true){
      
      const inputScreen = document.querySelector(".inputScreen");
      
      if(inputScreen.textContent == "_" || inputScreen.textContent == "ANSWER TOO LONG"){
        
        inputScreen.textContent = "7";
    
      }else if(arrayNumStore[0][arrayNumStore[0].length - 1] == 0 && arrayNumStore[0].length == 1){

        console.log("Hey, cannot have a digit after a zero");

      }else{
        
        inputScreen.textContent = (inputScreen.textContent + "7");
    
      };
  
    };

  }else{

    if(digitAfterDecimal == true){
  
      if(numLength == true){
      
        const inputScreen = document.querySelector(".inputScreen");
        
        inputScreen.textContent = (inputScreen.textContent + "7");
      
      };
  
    };

  };

});

buttonSeven.addEventListener("mouseup", () => {

  buttonSeven.setAttribute("id", "buttonSeven");
      
});


const buttonEight = document.querySelector("#buttonEight");
buttonEight.addEventListener("mousedown", () =>{

  const inputScreenIDCheck = document.querySelector(".inputScreen");
  const answerScreenIDCheck = document.querySelector(".answerScreen");

  if(inputScreenIDCheck.id == "answer"){

    inputScreenIDCheck.setAttribute("id", "input");

    answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;

    inputScreenIDCheck.textContent = "_";

  };

  buttonEight.setAttribute("id", "buttonEightPressed");

  let arrayNumStore = currentNumber();

  let numLength = lengthDetermine(arrayNumStore[0]);

  let decimalChecker = decimalCheck(arrayNumStore[0]);

  let digitAfterDecimal = checkDigitAfterDecimal(arrayNumStore[0], decimalChecker);

  if(decimalChecker == 0){

    if(numLength == true){
      
      const inputScreen = document.querySelector(".inputScreen");
    
      if(inputScreen.textContent == "_" || inputScreen.textContent == "ANSWER TOO LONG"){
        
        inputScreen.textContent = "8";
    
      }else if(arrayNumStore[0][arrayNumStore[0].length - 1] == 0 && arrayNumStore[0].length == 1){

        console.log("Hey, cannot have a digit after a zero");

      }else{
        
        inputScreen.textContent = (inputScreen.textContent + "8");
    
      };
  
    };

  }else{
  
    if(digitAfterDecimal == true){
  
      if(numLength == true){
      
        const inputScreen = document.querySelector(".inputScreen");

        inputScreen.textContent = (inputScreen.textContent + "8");
      
      };
  
    };

  };
  
});

buttonEight.addEventListener("mouseup", () => {

    buttonEight.setAttribute("id", "buttonEight");
        
});


const buttonNine = document.querySelector("#buttonNine");
buttonNine.addEventListener("mousedown", () =>{

  const inputScreenIDCheck = document.querySelector(".inputScreen");
  const answerScreenIDCheck = document.querySelector(".answerScreen");

  if(inputScreenIDCheck.id == "answer"){

    inputScreenIDCheck.setAttribute("id", "input");

    answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;

    inputScreenIDCheck.textContent = "_";

  };

  buttonNine.setAttribute("id", "buttonNinePressed");

  let arrayNumStore = currentNumber();

  let numLength = lengthDetermine(arrayNumStore[0]);

  let decimalChecker = decimalCheck(arrayNumStore[0]);

  let digitAfterDecimal = checkDigitAfterDecimal(arrayNumStore[0], decimalChecker);

  if(decimalChecker == 0){

    if(numLength == true){
      
      const inputScreen = document.querySelector(".inputScreen");
      
      if(inputScreen.textContent == "_" || inputScreen.textContent == "ANSWER TOO LONG"){
        
        inputScreen.textContent = "9";
    
      }else if(arrayNumStore[0][arrayNumStore[0].length - 1] == 0 && arrayNumStore[0].length == 1){

        console.log("Hey, cannot have a digit after a zero");

      }else{
        
        inputScreen.textContent = (inputScreen.textContent + "9");
    
      };
  
    };

  }else{

    if(digitAfterDecimal == true){
  
      if(numLength == true){
      
        const inputScreen = document.querySelector(".inputScreen");
       
        inputScreen.textContent = (inputScreen.textContent + "9");
      
      };

    };

  };
  
});

buttonNine.addEventListener("mouseup", () => {

  buttonNine.setAttribute("id", "buttonNine");
        
});

const buttonZero = document.querySelector("#buttonZero");
buttonZero.addEventListener("mousedown", () =>{

  const inputScreenIDCheck = document.querySelector(".inputScreen");
  const answerScreenIDCheck = document.querySelector(".answerScreen");

  if(inputScreenIDCheck.id == "answer"){

    inputScreenIDCheck.setAttribute("id", "input");

    answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;

    inputScreenIDCheck.textContent = "_";

  };

  buttonZero.setAttribute("id", "buttonZeroPressed");

  let arrayNumStore = currentNumber();

  let numLength = lengthDetermine(arrayNumStore[0]);

  let decimalChecker = decimalCheck(arrayNumStore[0]);

  let digitAfterDecimal = checkDigitAfterDecimal(arrayNumStore[0], decimalChecker);

  if(decimalChecker == 0){

    if(numLength == true){
    
      const inputScreen = document.querySelector(".inputScreen");
      
      if(inputScreen.textContent == "_" || inputScreen.textContent == "ANSWER TOO LONG"){
        
        inputScreen.textContent = "0";
  
      }else if(arrayNumStore[0][arrayNumStore[0].length - 1] == 0 && arrayNumStore[0].length == 1){

        console.log("Hey, cannot have a digit after a zero");

      }else{
        
        inputScreen.textContent = (inputScreen.textContent + "0");
    
      };
  
    };

  }else{
  
    if(digitAfterDecimal == true){
  
      if(numLength == true){
      
        const inputScreen = document.querySelector(".inputScreen");
         
        inputScreen.textContent = (inputScreen.textContent + "0");

      };
  
    };

  };
  
});

buttonZero.addEventListener("mouseup", () => {

  buttonZero.setAttribute("id", "buttonZero");
        
});

const buttonDecimal = document.querySelector("#buttonDecimal");
buttonDecimal.addEventListener("mousedown", () => {

  //#1
  const inputScreenIDCheck = document.querySelector(".inputScreen");
  const answerScreenIDCheck = document.querySelector(".answerScreen");

  if(inputScreenIDCheck.id == "answer"){

    inputScreenIDCheck.setAttribute("id", "input");

    answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;

    inputScreenIDCheck.textContent = "_";

  };
  //#1

  //#3
  buttonDecimal.setAttribute("id", "buttonDecimalPressed");//#a

  let arrayNumStore = currentNumber();

  let decimalPresent = decimalCheck(arrayNumStore[0]);

  if(decimalPresent > 0){ //Decimal is present, do not allow another decimal to be input

    console.log("Do nothing"); 

  }else{

    const inputScreen = document.querySelector(".inputScreen");
  
    if(arrayNumStore[0].length == 0){
  
      inputScreen.textContent += "0.";
  
    }else if(arrayNumStore[0][0] == "_" || inputScreen.textContent == "ANSWER TOO LONG"){
    
      inputScreen.textContent = "0.";

    }else{
      
      if(arrayNumStore[0].length < 7){

        inputScreen.textContent += ".";

      };
    
    };

  };
  //#3
  
});

buttonDecimal.addEventListener("mouseup", () => {

  buttonDecimal.setAttribute("id", "buttonDecimal"); //#a
          
});

const buttonDelete = document.querySelector("#buttonDelete");
buttonDelete.addEventListener("mousedown", () => {

  buttonDelete.setAttribute("id", "buttonDeletePressed");

  let inputScreen = document.querySelector(".inputScreen");
  //let answerScreen = document.querySelector(".answerScreen")

  //#7
  if(inputScreen.id == "input"){
    
    if(inputScreen.textContent == "ANSWER TOO LONG"){
      
      inputScreen.textContent = "_";

    }else{

      let inputArray = inputScreen.textContent.split("");
      let inputArrayLength = inputArray.length;

      let inputString = "";

      //#7.1
      if(inputArray[inputArrayLength - 1] == " "){

        inputArray.pop();
        inputArray.pop();
        inputArray.pop();

        inputString = "";

        for(let m = 0; m < inputArray.length; m++){

          inputString += inputArray[m];
  
        };
      //#7.1
      
      //#7.2
      }else{
  
        inputArray.pop();
  
        inputString = "";
  
        for(let n = 0; n < inputArray.length; n++){
  
          inputString += inputArray[n];

        };
  
      };
      //#7.2

      //#7.3
      if(inputString.length < 1){
  
        inputScreen.textContent = "_";
  
      }else{
  
        inputScreen.textContent = inputString;
  
      };
      //#7.3
  
    };  
  
  };
  //#7

});


buttonDelete.addEventListener("mouseup", () => {

  buttonDelete.setAttribute("id", "buttonDelete");

});

const buttonClear = document.querySelector("#buttonClear");
buttonClear.addEventListener("mousedown", () =>{

  buttonClear.setAttribute("id", "buttonClearPressed");

  const inputScreenIDCheck = document.querySelector(".inputScreen");
  const answerScreenIDCheck = document.querySelector(".answerScreen");

  //#1
  if(inputScreenIDCheck.id == "answer"){

    inputScreenIDCheck.setAttribute("id", "input");

    answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;

    inputScreenIDCheck.textContent = "_";

  //#1

  //#6
  }else{    
    
    const inputScreen = document.querySelector(".inputScreen");

    if(inputScreen.textContent == "_"){

      answerScreenIDCheck.textContent = "_"; 

    }else{

      inputScreen.textContent = "_";

    };

  };
  //#6
  
});

buttonClear.addEventListener("mouseup", () => {

  buttonClear.setAttribute("id", "buttonClear");
        
});

const buttonEquals = document.querySelector("#buttonEquals")
buttonEquals.addEventListener("mousedown", () => {

  buttonEquals.setAttribute("id", "buttonEqualsPressed");

  const inputScreenIDCheck = document.querySelector(".inputScreen");
  const answerScreenIDCheck = document.querySelector(".answerScreen");

  //#1
  if(inputScreenIDCheck.id == "answer"){

    inputScreenIDCheck.setAttribute("id", "input");

    answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;

    inputScreenIDCheck.textContent = "_";

  //#1

  }else{

  //#5
    if(inputScreenIDCheck.textContent == "_" || inputScreenIDCheck.textContent == "ANSWER TOO LONG"){

      console.log("Nice"); //Nothing is done
    
    }else{

      let operateValid = operateValidityCheck();
      
      if(operateValid == true){
    
        operate();
      
        inputScreenIDCheck.setAttribute("id", "answer");
    
      };

    };

  //#5

  };

});

buttonEquals.addEventListener("mouseup", () => {

  buttonEquals.setAttribute("id", "buttonEquals");

});


const buttonPlus = document.querySelector("#buttonPlus");
buttonPlus.addEventListener("mousedown", () =>{

  //#4.3
  const inputScreenIDCheck = document.querySelector(".inputScreen");
  const answerScreenIDCheck = document.querySelector(".answerScreen");

  if(inputScreenIDCheck.id == "answer"){

    inputScreenIDCheck.setAttribute("id", "input");

    answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;

    if(inputScreenIDCheck.textContent.length > 8){

      inputScreenIDCheck.textContent = "ANSWER TOO LONG";

    }else{

      inputScreenIDCheck.textContent += " + ";

    };

  }else{
  //#4.3

    //#4
    buttonPlus.setAttribute("id", "buttonPlusPressed");
  
    let arrayNumStore = currentNumber();
    
    const inputScreen = document.querySelector(".inputScreen");
    
    if(inputScreen.textContent == "_" || inputScreen.textContent == "ANSWER TOO LONG"){
      
      inputScreen.textContent = "0 + ";
    
    //#4.1
    }else if(arrayNumStore[1].length == 2){
  
      let operateValid = operateValidityCheck();
        
      if(operateValid == true){
      
        operate();
  
        if(inputScreen.textContent.length > 8){
  
          answerScreenIDCheck.textContent = inputScreen.textContent;
  
          inputScreen.textContent = "ANSWER TOO LONG";
  
        }else{
            
          inputScreen.textContent += " + ";
          
        };
          
      };
    //#4.1
  
    //#4.2
    }else{
  
      let inputArray = inputScreen.textContent.split("");
  
      if(inputArray[inputArray.length - 1] == "."){
  
        inputScreen.textContent = (inputScreen.textContent + "0 + ");
  
      }else{
        
        inputScreen.textContent = (inputScreen.textContent + " + ");
      
      };
      
    };
    //#4.2
  };
  //#4
  
});

buttonPlus.addEventListener("mouseup", () => {

  buttonPlus.setAttribute("id", "buttonPlus");
        
});


const buttonMinus = document.querySelector("#buttonMinus");
buttonMinus.addEventListener("mousedown", () =>{

  const inputScreenIDCheck = document.querySelector(".inputScreen");
  const answerScreenIDCheck = document.querySelector(".answerScreen");

  if(inputScreenIDCheck.id == "answer"){

    inputScreenIDCheck.setAttribute("id", "input");

    answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;

    if(inputScreenIDCheck.textContent.length > 8){

      inputScreenIDCheck.textContent = "ANSWER TOO LONG";

    }else{

      inputScreenIDCheck.textContent += " - ";

    };

  }else{

    buttonMinus.setAttribute("id", "buttonMinusPressed");
  
    let arrayNumStore = currentNumber();
    
    const inputScreen = document.querySelector(".inputScreen");
    
    if(inputScreen.textContent == "_" || inputScreen.textContent == "ANSWER TOO LONG"){
      
      inputScreen.textContent = "0 - ";
  
    }else if(arrayNumStore[1].length == 2){
  
      let operateValid = operateValidityCheck();
        
      if(operateValid == true){
      
        operate();
  
        if(inputScreen.textContent.length > 8){
  
          answerScreenIDCheck.textContent = inputScreen.textContent;
  
          inputScreen.textContent = "ANSWER TOO LONG";
  
        }else{
            
          inputScreen.textContent += " - ";
          
        };
          
      };
  
    }else{
      
      let inputArray = inputScreen.textContent.split("");
  
      if(inputArray[inputArray.length - 1] == "."){
  
        inputScreen.textContent = (inputScreen.textContent + "0 - ");
  
      }else{
        
        inputScreen.textContent = (inputScreen.textContent + " - ");
      
      };
  
    };

  };
    
});

buttonMinus.addEventListener("mouseup", () => {

  buttonMinus.setAttribute("id", "buttonMinus");
        
});


const buttonMultiply = document.querySelector("#buttonMultiply");
buttonMultiply.addEventListener("mousedown", () =>{

  const inputScreenIDCheck = document.querySelector(".inputScreen");
  const answerScreenIDCheck = document.querySelector(".answerScreen");

  if(inputScreenIDCheck.id == "answer"){

    inputScreenIDCheck.setAttribute("id", "input");

    answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;

    if(inputScreenIDCheck.textContent.length > 8){

      inputScreenIDCheck.textContent = "ANSWER TOO LONG";

    }else{

      inputScreenIDCheck.textContent += " x ";

    };

  }else{

    buttonMultiply.setAttribute("id", "buttonMultiplyPressed");
  
    let arrayNumStore = currentNumber();
    
    const inputScreen = document.querySelector(".inputScreen");
    
    if(inputScreen.textContent == "_" || inputScreen.textContent == "ANSWER TOO LONG"){
      
      inputScreen.textContent = "0 x ";
  
    }else if(arrayNumStore[1].length == 2){
  
      let operateValid = operateValidityCheck();
        
      if(operateValid == true){
      
        operate();
  
        if(inputScreen.textContent.length > 8){
  
          answerScreenIDCheck.textContent = inputScreen.textContent;
  
          inputScreen.textContent = "ANSWER TOO LONG";
  
        }else{
            
          inputScreen.textContent += " x ";
          
        };
          
      };
  
    }else{
      
      let inputArray = inputScreen.textContent.split("");
  
      if(inputArray[inputArray.length - 1] == "."){
  
        inputScreen.textContent = (inputScreen.textContent + "0 x ");
  
      }else{
        
        inputScreen.textContent = (inputScreen.textContent + " x ");
      
      };
  
    };

  };
    
});

buttonMultiply.addEventListener("mouseup", () => {

  buttonMultiply.setAttribute("id", "buttonMultiply");
        
});


const buttonDivide = document.querySelector("#buttonDivide");
buttonDivide.addEventListener("mousedown", () =>{

  const inputScreenIDCheck = document.querySelector(".inputScreen");
  const answerScreenIDCheck = document.querySelector(".answerScreen");

  if(inputScreenIDCheck.id == "answer"){

    inputScreenIDCheck.setAttribute("id", "input");

    answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;

    if(inputScreenIDCheck.textContent.length > 8){

      inputScreenIDCheck.textContent = "ANSWER TOO LONG";

    }else{

      inputScreenIDCheck.textContent += " / ";

    };

  }else{

    buttonDivide.setAttribute("id", "buttonDividePressed");
  
    let arrayNumStore = currentNumber();
    
    const inputScreen = document.querySelector(".inputScreen");
    
    if(inputScreen.textContent == "_" || inputScreen.textContent == "ANSWER TOO LONG"){
      
      inputScreen.textContent = "0 / ";
  
    }else if(arrayNumStore[1].length == 2){
  
      let operateValid = operateValidityCheck();
        
      if(operateValid == true){
      
        operate();
  
        if(inputScreen.textContent.length > 8){
  
          answerScreenIDCheck.textContent = inputScreen.textContent;
  
          inputScreen.textContent = "ANSWER TOO LONG";
  
        }else{
            
          inputScreen.textContent += " / ";
          
        };
          
      };
  
    }else{
      
      let inputArray = inputScreen.textContent.split("");
  
      if(inputArray[inputArray.length - 1] == "."){
  
        inputScreen.textContent = (inputScreen.textContent + "0 / ");
  
      }else{
        
        inputScreen.textContent = (inputScreen.textContent + " / ");
      
      };
  
    };

  };
    
});

buttonDivide.addEventListener("mouseup", () => {

  buttonDivide.setAttribute("id", "buttonDivide");
        
});

window.addEventListener("keydown", (e) => {

  let keyPress = e.key;

  console.log(keyPress);

  if(keyPress == "1"){

    const inputScreenIDCheck = document.querySelector(".inputScreen");
    const answerScreenIDCheck = document.querySelector(".answerScreen");
  
    if(inputScreenIDCheck.id == "answer"){
  
      inputScreenIDCheck.setAttribute("id", "input");
  
      answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;
  
      inputScreenIDCheck.textContent = "_";
  
    };    

    buttonOne.setAttribute("id", "buttonOnePressed");
  
    let arrayNumStore = currentNumber();
  
    let numLength = lengthDetermine(arrayNumStore[0]);
  
    let decimalChecker = decimalCheck(arrayNumStore[0]);
  
    let digitAfterDecimal = checkDigitAfterDecimal(arrayNumStore[0], decimalChecker);
  
    if(decimalChecker == 0){
  
      if(numLength == true){
      
        const inputScreen = document.querySelector(".inputScreen");
      
        if(inputScreen.textContent == "_" || inputScreen.textContent == "ANSWER TOO LONG"){
          
          inputScreen.textContent = "1";
      
        }else if(arrayNumStore[0][arrayNumStore[0].length - 1] == 0 && arrayNumStore[0].length == 1){

          console.log("Hey, cannot have a digit after a zero");
  
        }else{
          
          inputScreen.textContent = (inputScreen.textContent + "1");
      
        };
    
      };
  
    }else{
    
      if(digitAfterDecimal == true){
    
        if(numLength == true){
      
          const inputScreen = document.querySelector(".inputScreen");
            
          inputScreen.textContent = (inputScreen.textContent + "1");
      
        };
    
      };
  
    };

    window.addEventListener('keyup', () => {

      buttonOne.setAttribute("id", "buttonOne");

    });

  }else if(keyPress == "2"){

    const inputScreenIDCheck = document.querySelector(".inputScreen");
    const answerScreenIDCheck = document.querySelector(".answerScreen");
  
    if(inputScreenIDCheck.id == "answer"){
  
      inputScreenIDCheck.setAttribute("id", "input");
  
      answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;
  
      inputScreenIDCheck.textContent = "_";
  
    };    

    buttonTwo.setAttribute("id", "buttonTwoPressed");

    let arrayNumStore = currentNumber();
  
    let numLength = lengthDetermine(arrayNumStore[0]);
  
    let decimalChecker = decimalCheck(arrayNumStore[0]);
  
    let digitAfterDecimal = checkDigitAfterDecimal(arrayNumStore[0], decimalChecker);
  
    if(decimalChecker == 0){
  
      if(numLength == true){
      
        const inputScreen = document.querySelector(".inputScreen");
      
        if(inputScreen.textContent == "_" || inputScreen.textContent == "ANSWER TOO LONG"){
          
          inputScreen.textContent = "2";
      
        }else if(arrayNumStore[0][arrayNumStore[0].length - 1] == 0 && arrayNumStore[0].length == 1){

          console.log("Hey, cannot have a digit after a zero");
  
        }else{
          
          inputScreen.textContent = (inputScreen.textContent + "2");
      
        };
    
      };
  
    }else{
  
      if(digitAfterDecimal == true){
    
        if(numLength == true){
        
          const inputScreen = document.querySelector(".inputScreen");
   
          inputScreen.textContent = (inputScreen.textContent + "2");
        
        };
    
      };
  
    };

    window.addEventListener('keyup', () => {

      buttonTwo.setAttribute("id", "buttonTwo");

    });

  }else if(keyPress == "3"){

    const inputScreenIDCheck = document.querySelector(".inputScreen");
    const answerScreenIDCheck = document.querySelector(".answerScreen");
  
    if(inputScreenIDCheck.id == "answer"){
  
      inputScreenIDCheck.setAttribute("id", "input");
  
      answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;
  
      inputScreenIDCheck.textContent = "_";
  
    };    

    buttonThree.setAttribute("id", "buttonThreePressed");

    let arrayNumStore = currentNumber();
  
    let numLength = lengthDetermine(arrayNumStore[0]);
  
    let decimalChecker = decimalCheck(arrayNumStore[0]);
  
    let digitAfterDecimal = checkDigitAfterDecimal(arrayNumStore[0], decimalChecker);
  
    if(decimalChecker == 0){
  
      if(numLength == true){
      
        const inputScreen = document.querySelector(".inputScreen");
      
        if(inputScreen.textContent == "_" || inputScreen.textContent == "ANSWER TOO LONG"){
          
          inputScreen.textContent = "3";
      
        }else if(arrayNumStore[0][arrayNumStore[0].length - 1] == 0 && arrayNumStore[0].length == 1){

          console.log("Hey, cannot have a digit after a zero");
  
        }else{
          
          inputScreen.textContent = (inputScreen.textContent + "3");
      
        };
    
      };
  
    }else{
    
      if(digitAfterDecimal == true){
    
        if(numLength == true){
        
          const inputScreen = document.querySelector(".inputScreen");
         
          inputScreen.textContent = (inputScreen.textContent + "3");
        
        };
    
      };
  
    };

    window.addEventListener('keyup', () => {

      buttonThree.setAttribute("id", "buttonThree");

    });

  }else if(keyPress == "4"){

    const inputScreenIDCheck = document.querySelector(".inputScreen");
    const answerScreenIDCheck = document.querySelector(".answerScreen");
  
    if(inputScreenIDCheck.id == "answer"){
  
      inputScreenIDCheck.setAttribute("id", "input");
  
      answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;
  
      inputScreenIDCheck.textContent = "_";
  
    };

    buttonFour.setAttribute("id", "buttonFourPressed");

    let arrayNumStore = currentNumber();
  
    let numLength = lengthDetermine(arrayNumStore[0]);
  
    let decimalChecker = decimalCheck(arrayNumStore[0]);
  
    let digitAfterDecimal = checkDigitAfterDecimal(arrayNumStore[0], decimalChecker);
    
    if(decimalChecker == 0){
  
      if(numLength == true){
        
        const inputScreen = document.querySelector(".inputScreen");
        
        if(inputScreen.textContent == "_" || inputScreen.textContent == "ANSWER TOO LONG"){
          
          inputScreen.textContent = "4";
      
        }else if(arrayNumStore[0][arrayNumStore[0].length - 1] == 0 && arrayNumStore[0].length == 1){

          console.log("Hey, cannot have a digit after a zero");
  
        }else{
          
          inputScreen.textContent = (inputScreen.textContent + "4");
      
        };
    
      };
  
    }else{
  
      if(digitAfterDecimal == true){
    
        if(numLength == true){
        
          const inputScreen = document.querySelector(".inputScreen");
            
          inputScreen.textContent = (inputScreen.textContent + "4");
  
        };
    
      }; 
  
    };

    window.addEventListener('keyup', () => {

      buttonFour.setAttribute("id", "buttonFour");

    });

  }else if(keyPress == "5"){

    const inputScreenIDCheck = document.querySelector(".inputScreen");
    const answerScreenIDCheck = document.querySelector(".answerScreen");
  
    if(inputScreenIDCheck.id == "answer"){
  
      inputScreenIDCheck.setAttribute("id", "input");
  
      answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;
  
      inputScreenIDCheck.textContent = "_";
  
    };

    buttonFive.setAttribute("id", "buttonFivePressed");

    let arrayNumStore = currentNumber();
  
    let numLength = lengthDetermine(arrayNumStore[0]);
  
    let decimalChecker = decimalCheck(arrayNumStore[0]);
  
    let digitAfterDecimal = checkDigitAfterDecimal(arrayNumStore[0], decimalChecker);
  
    if(decimalChecker == 0){
  
      if(numLength == true){
      
        const inputScreen = document.querySelector(".inputScreen");
        
        if(inputScreen.textContent == "_" || inputScreen.textContent == "ANSWER TOO LONG"){
          
          inputScreen.textContent = "5";
      
        }else if(arrayNumStore[0][arrayNumStore[0].length - 1] == 0 && arrayNumStore[0].length == 1){

          console.log("Hey, cannot have a digit after a zero");
  
        }else{
          
          inputScreen.textContent = (inputScreen.textContent + "5");
      
        };
    
      };
  
    }else{
    
      if(digitAfterDecimal == true){
    
        if(numLength == true){
      
          const inputScreen = document.querySelector(".inputScreen");
   
          inputScreen.textContent = (inputScreen.textContent + "5");
  
        };
    
      };
    
    };
    
    window.addEventListener('keyup', () => {

      buttonFive.setAttribute("id", "buttonFive");

    });

  }else if(keyPress == "6"){

    const inputScreenIDCheck = document.querySelector(".inputScreen");
    const answerScreenIDCheck = document.querySelector(".answerScreen");
  
    if(inputScreenIDCheck.id == "answer"){
  
      inputScreenIDCheck.setAttribute("id", "input");
  
      answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;
  
      inputScreenIDCheck.textContent = "_";
  
    };

    buttonSix.setAttribute("id", "buttonSixPressed");

    let arrayNumStore = currentNumber();
  
    let numLength = lengthDetermine(arrayNumStore[0]);
  
    let decimalChecker = decimalCheck(arrayNumStore[0]);
  
    let digitAfterDecimal = checkDigitAfterDecimal(arrayNumStore[0], decimalChecker);
  
    if(decimalChecker == 0){
  
      if(numLength == true){
        
        const inputScreen = document.querySelector(".inputScreen");
        
        if(inputScreen.textContent == "_" || inputScreen.textContent == "ANSWER TOO LONG"){
          
          inputScreen.textContent = "6";
      
        }else if(arrayNumStore[0][arrayNumStore[0].length - 1] == 0 && arrayNumStore[0].length == 1){

          console.log("Hey, cannot have a digit after a zero");
  
        }else{
          
          inputScreen.textContent = (inputScreen.textContent + "6");
      
        };
    
      };
  
    }else{
    
      if(digitAfterDecimal == true){
    
        if(numLength == true){
        
          const inputScreen = document.querySelector(".inputScreen");
            
          inputScreen.textContent = (inputScreen.textContent + "6");
        
        };
    
      };
    
    };  

    window.addEventListener('keyup', () => {

      buttonSix.setAttribute("id", "buttonSix");

    });

  }else if(keyPress == "7"){

    const inputScreenIDCheck = document.querySelector(".inputScreen");
    const answerScreenIDCheck = document.querySelector(".answerScreen");
  
    if(inputScreenIDCheck.id == "answer"){
  
      inputScreenIDCheck.setAttribute("id", "input");
  
      answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;
  
      inputScreenIDCheck.textContent = "_";
  
    };

    buttonSeven.setAttribute("id", "buttonSevenPressed");

    let arrayNumStore = currentNumber();
  
    let numLength = lengthDetermine(arrayNumStore[0]);
  
    let decimalChecker = decimalCheck(arrayNumStore[0]);
  
    let digitAfterDecimal = checkDigitAfterDecimal(arrayNumStore[0], decimalChecker);
  
    if(decimalChecker == 0){
  
      if(numLength == true){
        
        const inputScreen = document.querySelector(".inputScreen");
        
        if(inputScreen.textContent == "_" || inputScreen.textContent == "ANSWER TOO LONG"){
          
          inputScreen.textContent = "7";
      
        }else if(arrayNumStore[0][arrayNumStore[0].length - 1] == 0 && arrayNumStore[0].length == 1){

          console.log("Hey, cannot have a digit after a zero");
  
        }else{
          
          inputScreen.textContent = (inputScreen.textContent + "7");
      
        };
    
      };
  
    }else{
  
      if(digitAfterDecimal == true){
    
        if(numLength == true){
        
          const inputScreen = document.querySelector(".inputScreen");
          
          inputScreen.textContent = (inputScreen.textContent + "7");
        
        };
    
      };
  
    };

    window.addEventListener('keyup', () => {

      buttonSeven.setAttribute("id", "buttonSeven");

    });

  }else if(keyPress == "8"){

    const inputScreenIDCheck = document.querySelector(".inputScreen");
    const answerScreenIDCheck = document.querySelector(".answerScreen");
  
    if(inputScreenIDCheck.id == "answer"){
  
      inputScreenIDCheck.setAttribute("id", "input");
  
      answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;
  
      inputScreenIDCheck.textContent = "_";
  
    };

    buttonEight.setAttribute("id", "buttonEightPressed");

    let arrayNumStore = currentNumber();
  
    let numLength = lengthDetermine(arrayNumStore[0]);
  
    let decimalChecker = decimalCheck(arrayNumStore[0]);
  
    let digitAfterDecimal = checkDigitAfterDecimal(arrayNumStore[0], decimalChecker);
  
    if(decimalChecker == 0){
  
      if(numLength == true){
        
        const inputScreen = document.querySelector(".inputScreen");
      
        if(inputScreen.textContent == "_"  || inputScreen.textContent == "ANSWER TOO LONG"){
          
          inputScreen.textContent = "8";
      
        }else if(arrayNumStore[0][arrayNumStore[0].length - 1] == 0 && arrayNumStore[0].length == 1){

          console.log("Hey, cannot have a digit after a zero");
  
        }else{
          
          inputScreen.textContent = (inputScreen.textContent + "8");
      
        };
    
      };
  
    }else{
    
      if(digitAfterDecimal == true){
    
        if(numLength == true){
        
          const inputScreen = document.querySelector(".inputScreen");
  
          inputScreen.textContent = (inputScreen.textContent + "8");
        
        };
    
      };
  
    };

    window.addEventListener('keyup', () => {

      buttonEight.setAttribute("id", "buttonEight");

    });

  }else if(keyPress == "9"){

    const inputScreenIDCheck = document.querySelector(".inputScreen");
    const answerScreenIDCheck = document.querySelector(".answerScreen");
  
    if(inputScreenIDCheck.id == "answer"){
  
      inputScreenIDCheck.setAttribute("id", "input");
  
      answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;
  
      inputScreenIDCheck.textContent = "_";
  
    };

    buttonNine.setAttribute("id", "buttonNinePressed");

    let arrayNumStore = currentNumber();
  
    let numLength = lengthDetermine(arrayNumStore[0]);
  
    let decimalChecker = decimalCheck(arrayNumStore[0]);
  
    let digitAfterDecimal = checkDigitAfterDecimal(arrayNumStore[0], decimalChecker);
  
    if(decimalChecker == 0){
  
      if(numLength == true){
        
        const inputScreen = document.querySelector(".inputScreen");
        
        if(inputScreen.textContent == "_" || inputScreen.textContent == "ANSWER TOO LONG"){
          
          inputScreen.textContent = "9";
      
        }else if(arrayNumStore[0][arrayNumStore[0].length - 1] == 0 && arrayNumStore[0].length == 1){

          console.log("Hey, cannot have a digit after a zero");
  
        }else{
          
          inputScreen.textContent = (inputScreen.textContent + "9");
      
        };
    
      };
  
    }else{
  
      if(digitAfterDecimal == true){
    
        if(numLength == true){
        
          const inputScreen = document.querySelector(".inputScreen");
         
          inputScreen.textContent = (inputScreen.textContent + "9");
        
        };
  
      };
  
    };
    
    window.addEventListener('keyup', () => {

      buttonNine.setAttribute("id", "buttonNine");

    });

  }else if(keyPress == "0"){

    const inputScreenIDCheck = document.querySelector(".inputScreen");
    const answerScreenIDCheck = document.querySelector(".answerScreen");
  
    if(inputScreenIDCheck.id == "answer"){
  
      inputScreenIDCheck.setAttribute("id", "input");
  
      answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;
  
      inputScreenIDCheck.textContent = "_";
  
    };

    buttonZero.setAttribute("id", "buttonZeroPressed");

    let arrayNumStore = currentNumber();
  
    let numLength = lengthDetermine(arrayNumStore[0]);
  
    let decimalChecker = decimalCheck(arrayNumStore[0]);
  
    let digitAfterDecimal = checkDigitAfterDecimal(arrayNumStore[0], decimalChecker);
  
    if(decimalChecker == 0){
  
      if(numLength == true){
      
        const inputScreen = document.querySelector(".inputScreen");
        
        if(inputScreen.textContent == "_" || inputScreen.textContent == "ANSWER TOO LONG"){
          
          inputScreen.textContent = "0";
    
        }else if(arrayNumStore[0][arrayNumStore[0].length - 1] == 0 && arrayNumStore[0].length == 1){

          console.log("Hey, cannot have a digit after a zero");
  
        }else{
          
          inputScreen.textContent = (inputScreen.textContent + "0");
      
        };
    
      };
  
    }else{
    
      if(digitAfterDecimal == true){
    
        if(numLength == true){
        
          const inputScreen = document.querySelector(".inputScreen");
           
          inputScreen.textContent = (inputScreen.textContent + "0");
  
        };
    
      };
  
    };

    window.addEventListener('keyup', () => {

      buttonZero.setAttribute("id", "buttonZero");

    });

  }else if(keyPress == "."){

    const inputScreenIDCheck = document.querySelector(".inputScreen");
    const answerScreenIDCheck = document.querySelector(".answerScreen");
  
    if(inputScreenIDCheck.id == "answer"){
  
      inputScreenIDCheck.setAttribute("id", "input");
  
      answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;
  
      inputScreenIDCheck.textContent = "_";
  
    };

    buttonDecimal.setAttribute("id", "buttonDecimalPressed");

    let arrayNumStore = currentNumber();
  
    let decimalPresent = decimalCheck(arrayNumStore[0]);
  
    if(decimalPresent > 0){ //Decimal is present, do not allow another decimal to be input
  
      console.log("Do nothing"); 
  
    }else{
  
      //If a decimal is pressed, if nothing yet in place then will place a zero first and then a decimal 
      const inputScreen = document.querySelector(".inputScreen");
    
      if(arrayNumStore[0].length == 0){
      //if second number is empty, input 0 and then decimal. 
    
        inputScreen.textContent += "0.";
    
      }else if(arrayNumStore[0][0] == "_" || inputScreen.textContent == "ANSWER TOO LONG"){
      // if first number is "_", input 0 and then decimal.

        inputScreen.textContent = "0.";
  
      }else{
        
        if(arrayNumStore[0].length < 7){
  
          inputScreen.textContent += ".";
  
        };
      
      };
  
    }; 
    
    window.addEventListener('keyup', () => {

      buttonDecimal.setAttribute("id", "buttonDecimal");

    });

  }else if(keyPress == "Delete"){

    buttonClear.setAttribute("id", "buttonClearPressed");

    const inputScreenIDCheck = document.querySelector(".inputScreen");
    const answerScreenIDCheck = document.querySelector(".answerScreen");
  
    if(inputScreenIDCheck.id == "answer"){
  
      inputScreenIDCheck.setAttribute("id", "input");
  
      answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;
  
      inputScreenIDCheck.textContent = "_";
  
    }else{    
      
      const inputScreen = document.querySelector(".inputScreen");
  
      if(inputScreen.textContent == "_"){
  
        answerScreenIDCheck.textContent = "_"; 
  
      }else{
  
        inputScreen.textContent = "_";
  
      };

    };

    window.addEventListener('keyup', () => {

      buttonClear.setAttribute("id", "buttonClear");

    });

  }else if(keyPress == "="){

    buttonEquals.setAttribute("id", "buttonEqualsPressed");

    const inputScreenIDCheck = document.querySelector(".inputScreen");
    const answerScreenIDCheck = document.querySelector(".answerScreen");
  
    if(inputScreenIDCheck.id == "answer"){
  
      inputScreenIDCheck.setAttribute("id", "input");
  
      answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;
  
      inputScreenIDCheck.textContent = "_";
  
    }else{
  
      if(inputScreenIDCheck.textContent == "_" || inputScreenIDCheck.textContent == "ANSWER TOO LONG"){
  
        console.log("Nice");
      
      }else{
  
        let operateValid = operateValidityCheck();
        
        if(operateValid == true){
      
          operate();
        
          inputScreenIDCheck.setAttribute("id", "answer");
      
        };
  
      };
  
    };
    
    window.addEventListener('keyup', () => {
  
      buttonEquals.setAttribute("id", "buttonEquals");
      
    });

  }else if(keyPress == "+"){

    const inputScreenIDCheck = document.querySelector(".inputScreen");
    const answerScreenIDCheck = document.querySelector(".answerScreen");
  
    if(inputScreenIDCheck.id == "answer"){
  
      inputScreenIDCheck.setAttribute("id", "input");
  
      answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;
  
      if(inputScreenIDCheck.textContent.length > 8){

        inputScreenIDCheck.textContent = "ANSWER TOO LONG";
  
      }else{
  
        inputScreenIDCheck.textContent += " + ";
  
      };
  
    }else{

      buttonPlus.setAttribute("id", "buttonPlusPressed");
  
      let arrayNumStore = currentNumber();
      
      const inputScreen = document.querySelector(".inputScreen");
      
      if(inputScreen.textContent == "_" || inputScreen.textContent == "ANSWER TOO LONG"){
        
        inputScreen.textContent = "0 + ";
    
      }else if(arrayNumStore[1].length == 2){
    
        let operateValid = operateValidityCheck();
        
        if(operateValid == true){
        
          operate();
    
          if(inputScreen.textContent.length > 8){
    
            answerScreenIDCheck.textContent = inputScreen.textContent;
    
            inputScreen.textContent = "ANSWER TOO LONG";
    
          }else{
              
            inputScreen.textContent += " + ";
            
          };
            
        };
    
      }else{
    
        let inputArray = inputScreen.textContent.split("");
    
        if(inputArray[inputArray.length - 1] == "."){
    
          inputScreen.textContent = (inputScreen.textContent + "0 + ");
    
        }else{
          
          inputScreen.textContent = (inputScreen.textContent + " + ");
        
        };
        
      };

    };

    window.addEventListener('keyup', () => {

      buttonPlus.setAttribute("id", "buttonPlus");

    });

  }else if(keyPress == "-"){

    const inputScreenIDCheck = document.querySelector(".inputScreen");
    const answerScreenIDCheck = document.querySelector(".answerScreen");
  
    if(inputScreenIDCheck.id == "answer"){
  
      inputScreenIDCheck.setAttribute("id", "input");
  
      answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;
  
      if(inputScreenIDCheck.textContent.length > 8){

        inputScreenIDCheck.textContent = "ANSWER TOO LONG";
  
      }else{
  
        inputScreenIDCheck.textContent += " - ";
  
      };
  
    }else{

      buttonMinus.setAttribute("id", "buttonMinusPressed");
  
      let arrayNumStore = currentNumber();
      
      const inputScreen = document.querySelector(".inputScreen");
      
      if(inputScreen.textContent == "_" ){
      
        inputScreen.textContent = "0 - ";
    
      }else if(arrayNumStore[1].length == 2){
    
        let operateValid = operateValidityCheck();
        
        if(operateValid == true){
        
          operate();
    
          if(inputScreen.textContent.length > 8){
    
            answerScreenIDCheck.textContent = inputScreen.textContent;
    
            inputScreen.textContent = "ANSWER TOO LONG";
    
          }else{
              
            inputScreen.textContent += " - ";
            
          };
            
        };
    
      }else{
        
        let inputArray = inputScreen.textContent.split("");
    
        if(inputArray[inputArray.length - 1] == "."){
    
          inputScreen.textContent = (inputScreen.textContent + "0 - ");
    
        }else{
          
          inputScreen.textContent = (inputScreen.textContent + " - ");
        
        };
    
      };

    };

    window.addEventListener('keyup', () => {

      buttonMinus.setAttribute("id", "buttonMinus");

    });

  }else if(keyPress == "*"){

    const inputScreenIDCheck = document.querySelector(".inputScreen");
    const answerScreenIDCheck = document.querySelector(".answerScreen");
  
    if(inputScreenIDCheck.id == "answer"){
  
      inputScreenIDCheck.setAttribute("id", "input");
  
      answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;
  
      if(inputScreenIDCheck.textContent.length > 8){

        inputScreenIDCheck.textContent = "ANSWER TOO LONG";
  
      }else{
  
        inputScreenIDCheck.textContent += " x ";
  
      };
  
    }else{

      buttonMultiply.setAttribute("id", "buttonMultiplyPressed");
  
      let arrayNumStore = currentNumber();
      
      const inputScreen = document.querySelector(".inputScreen");
      
      if(inputScreen.textContent == "_" || inputScreen.textContent == "ANSWER TOO LONG"){
      
        inputScreen.textContent = "0 x ";
    
      }else if(arrayNumStore[1].length == 2){
    
        let operateValid = operateValidityCheck();
        
        if(operateValid == true){
        
          operate();
    
          if(inputScreen.textContent.length > 8){
    
            answerScreenIDCheck.textContent = inputScreen.textContent;
    
            inputScreen.textContent = "ANSWER TOO LONG";
    
          }else{
              
            inputScreen.textContent += " * ";
            
          };
            
        };
    
      }else{
        
        let inputArray = inputScreen.textContent.split("");
    
        if(inputArray[inputArray.length - 1] == "."){
    
          inputScreen.textContent = (inputScreen.textContent + "0 x ");
    
        }else{
          
          inputScreen.textContent = (inputScreen.textContent + " x ");
        
        };
    
      };

    };

    window.addEventListener('keyup', () => {

      buttonMultiply.setAttribute("id", "buttonMultiply");

    });

  }else if(keyPress == "d"){

    const inputScreenIDCheck = document.querySelector(".inputScreen");
    const answerScreenIDCheck = document.querySelector(".answerScreen");
  
    if(inputScreenIDCheck.id == "answer"){
  
      inputScreenIDCheck.setAttribute("id", "input");
  
      answerScreenIDCheck.textContent = inputScreenIDCheck.textContent;
  
      if(inputScreenIDCheck.textContent.length > 8){

        inputScreenIDCheck.textContent = "ANSWER TOO LONG";
  
      }else{
  
        inputScreenIDCheck.textContent += " / ";
  
      };
  
    }else{

      buttonDivide.setAttribute("id", "buttonDividePressed");
  
      let arrayNumStore = currentNumber();
      
      const inputScreen = document.querySelector(".inputScreen");
      
      if(inputScreen.textContent == "_" || inputScreen.textContent == "ANSWER TOO LONG"){
      
        inputScreen.textContent = "0 / ";
    
      }else if(arrayNumStore[1].length == 2){
    
        let operateValid = operateValidityCheck();
        
        if(operateValid == true){
        
          operate();
    
          if(inputScreen.textContent.length > 8){
    
            answerScreenIDCheck.textContent = inputScreen.textContent;
    
            inputScreen.textContent = "ANSWER TOO LONG";
    
          }else{
              
            inputScreen.textContent += " / ";
            
          };
            
        };
    
      }else{
        
        let inputArray = inputScreen.textContent.split("");
    
        if(inputArray[inputArray.length - 1] == "."){
    
          inputScreen.textContent = (inputScreen.textContent + "0 / ");
    
        }else{
          
          inputScreen.textContent = (inputScreen.textContent + " / ");
        
        };
    
      };

    };

    window.addEventListener('keyup', () => {

      buttonDivide.setAttribute("id", "buttonDivide");

    });    

  }else if(keyPress == "Backspace"){

    buttonDelete.setAttribute('id', 'buttonDeletePressed')

    let inputScreen = document.querySelector(".inputScreen");
    //let answerScreen = document.querySelector(".answerScreen")
  
    if(inputScreen.id == "input"){
      
      if(inputScreen.textContent == "ANSWER TOO LONG"){
        
        inputScreen.textContent = "_";
  
      }else{
  
        let inputArray = inputScreen.textContent.split("");
        let inputArrayLength = inputArray.length;
  
        let inputString = "";
  
        if(inputArray[inputArrayLength - 1] == " "){
  
          console.log("Hey There");
  
          inputArray.pop();
          inputArray.pop();
          inputArray.pop();
  
          inputString = "";
  
          for(let m = 0; m < inputArray.length; m++){
  
            inputString += inputArray[m];
    
          };
  
        }else{
    
          inputArray.pop();
    
          inputString = "";
    
          for(let n = 0; n < inputArray.length; n++){
    
            inputString += inputArray[n];
  
          };
    
        };
    
        if(inputString.length < 1){
    
          inputScreen.textContent = "_";
    
        }else{
    
          inputScreen.textContent = inputString;
    
        };
    
      };  
    
    };

    window.addEventListener('keyup', () => {

      buttonDelete.setAttribute("id", "buttonDelete");

    });    

  }else{

    console.log("hey");

  };

});