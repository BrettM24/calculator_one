# calculator_one
Remote repository for calculator project. Project is in accordance with Odin Project Fundamentals Stage

xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Final Code Description and Explanation

In order to explain the code I will break up explanations around the different buttons that a user of the calculator can press.
There are certain buttons that act exactly the same as others (except for the symbol it inputs), and therefore explaining each one of these would be redundant, and so the following categories will be explained:
- 1-9
- 0
- Decimal(.)
- Operators(+ - / *)
- Equals
- Clear
- Del

General Comments
- In order to press buttons on calculator, buttons on the screen can be pressed with the mouse or can be pressed on the keyboard. To acheive this, seperate event listners have been set up for these actions. For pressing screen buttons with the mouse, the mousedown event is listened for. For pressing keyboard buttons, both the keydown and keyup events are listened for.
- 

i) "1-9" and "0"

#1: 
- Firstly, this section of code switches the ID of the screen where symbols are inputted (has the class "inputScreen", and will be referred to as inputScreen going forward).
- The general idea is: when numbers, operators etc are being inputted by the user, the inputScreen will have the id of "input". When the equals button is pressed, the inputScreen ID is changed to "answer", and this screen will display an answer. The aim of this ID functionality is to distinguish whether the inputScreen is displaying operands and operators(input), or it's displaying an answer. This is used elsewhere in the code and is explained further along(Look for #1 reference).
- Within this section of code, if a user presses 1 - 9 and the inputScreen currently is ID'd as answer, the id is switched to input, as the inputScreen's current use changes from displaying an answer to displaying user input.

- Secondly, this section switches/alters the contents of the inputScreen and the answerScreen above it.
- In order to enter the if statement, an answer needs to be currently displaying in inputScreen and the operation/sum is displaying in the answerScreen.
- The code within the if statement puts the previous answer into the answerScreen and clears the inputScreen.
- Reasoning: if 1-9 is pressed, the user is looking to perform a new sum. Therefore the user needs to see their new input in the inputScreen. The previous answer is shifted to the answerScreen so that the user has that previous result available. The inputScreen is then cleared so the new input can display. 

#2:
- This code starts off with running four seperate functions and storing the returned results into variables
- The first variable (arrayNumStore) gets the current number. Lets say the inputScreen is displaying "123 + 45", the current number is 45. If "123" is displaying on its own with no operator, the current number is 123.
- The second variable (numLength) stores information on whether the current number is less that the maximum input length. The calculator is designed so that the maximum number of digits an inputted number can be is 8 digits, and attempting to input a futher digit is prevented by the code.
- The third variable (decimalChecker) stores information on whether a decimal is currently present in the current number, which is then used by the fourth and final variable in this section of code.
- The fourth variable (digitAfterDecimal) stores information which determines the following: if a decimal is present in the number, can a further number be inserted after the decimal. The calculator is designed so that only one digit after the decimal can be included, e.g. "1.3" is valid but not "1.45". If lets say the current number is "24." with nothing after the decimal, then in this case the design allows for one digit to be inserted into the number.

- From here an if/else statement is entered into, and we will look at the "if" under #2.1 and the else under #2.2

#2.1:
- To enter the if, the number must NOT have a decimal.
- A further if codition needs to be met to move into the subsequent body of code, being that the number numLength is true, and the number is less than 8 digits. If not, then the code ends there and no further digit can be inserted.
- The subsequent body results in 1-9 digit being inputted.
- A futher if/else makes up this body. If the inputScreen is currently displaying blank ("_") or "ANSWER TOO LONG" (Will explain ANSWER TOO LONG further down) then current display is cleared and the appropriate digit is inserted (So, therefore, just a single digit, e.g "1", will be displaying). Else, if the current number is just a single "0" digit, no further number is allowed to be inserted, the design prevents a number such as "0027" being inputted .Else, just a valid length number is displaying(e.g 123), and the appropriate digit is added to this number. 

#2.2:
- If the initial if in #2.1 is not met, i.e. the number has a decimal, then the else is entered into.
- A further 2 if conditions need to be met in order to move into the body of code which inserts a number.
- Firstly, the fourth variable in #2 above needs to indicate that a further digit can be inserted.
- Secondly, the number must be valid length i.e. must not already be 8 digits.
- If both these conditions are met then the digit is inserted after the decimal. If "3" is pressed, then "145." becomes "145.3". 

#a:
- When a button is pressed on the screen, a CSS affect takes place that gives the appearance as though the button is being pressed down.
- This is achieved by changing the id of the button element. 
- On mouseDown the id is changed to "buttonOnePressed", and on mouseUp the id is changed back to "buttonOne".
- To reader: Compare the differences between the different id's in style.css, to get an understanding of how this affect works. I.e. compare buttonOne to buttonOnePressed.

ii) "."

#3: 
- When the user attempts to input a decimal to the current number, an if/else statement is run through.
- If: a decimal is already present in the current number, no further decimal is allowed to be inputted
- Else: An if/else if/ele statement is run through:
  - If: the current number is the 2nd number (i.e. the number after an operator) and it is currently made up of no digits, then "0." is inserted. Therefore go from "123 + " to "123 + 0.", and you do not have the current number having a decimal with no digit before, such as ".1".
  - Else if: the current number is blank("_") or "ANSWER TOO LONG", inserts "0.", so that you do not have the current number having a decimal with no digit before, such as ".1".
  - Else: if the current number is 6 digits or less, then a decimal is added to the end of the current number. Reasoning: want to allow for a decimal to be inputted only if there is space for a further digit to be added after the decimal without the length limit being reached (8 digit/items). If current number was already 7 digits in length, the decimal and 1 digit after the decimal results in the total length being 9 items.

iii) Operators

#4:
- When the user attempts to input an operator, an if/else if/else statement is run through.
- If: if blank/answer too long then "0 + " inputted. Do not want a situation where there is an operator and no number before the operator, therefore "0" is inserted before to make up the first number.

#4.1:
The important feature of this section of code - If we have something like the following in our input: "123 + 45", if we press another operator, the following happens: The operation takes place, the sum is calculated (achieved by running the operate() function), input is then updated with the answer followed by the new operator (for example: lets say we had "123 + 45", we then press the "+" operator. Our code calculates 123 + 45, which = 168. The following is then inserted into the input screen: "168 + ", and from there the user will input the 2nd number and perform a further operation on this input). Also, look at "#4.1".

Now onto the code:
- Else if: "arrayNumStore[1].length == 2"
- "arrayNumStore[1]": This is an array which stores the index location of spaces (" ") within the current input
- The design is so: when an operator is inputted, it is inputted with spaces on either side of the operator symbol. E.g. is "+" is inputted as " + ".
- This allows to be determined whether an operator is already in the input statement, if arrayNumStore[1].length is zero then no operator is present, if the length is 2 then an opertor is already present.
- So what do we do if an operator is in place and the user looks to insert a further operator? 

- Firstly the operateValidityCheck function is run:
- Why? 
  
  - This function is in place to determine whether the current input is valid, meaning it can be operated on and will not result in issues, which will be further discussed in the the below points.
  - If the input is "valid", returns true, else returns false.
  - What are these issues we look to avoid? Firstly if there is an operator in place the following looks to be avoided: 
    1) If the 2nd number is blank or the final item in the 2nd number is a decimal point - returns false
    2) If the 2nd number is "0" and the operator is a divide - returns false, this prevents division by zero
    3) If the 2nd number is "0.0" and the operator is a divide - returns false, prevents division by zero
    Also, if only the first number is in place:
    4) If first number is ending in a decimal - returns false
  - Else true is returned

- If the validity check returns true, then operate() is called(explained under "=" section).
- The input screen will then have a first number, and applicable operator, as explained above.
- Remember we have an 8 digit length limit to what each of the operands/numbers can be.
- And this includes this first number that now populates the input screen
- If the first number is longer than the 8 digit length: instead of "number + " displaying, the following statement is displayed in input screen: "ANSWER TOO LONG". The user can therefore not use this answer to perform further operations with.
- If its within the length limit then the operator is inserted after the first number.
- Note: Operate() returns the answer to the operation, and, inputs the answer as the first number in input screen. 

#4.2:

- Section of code covers "other" situations, i.e. not a situation such as an operator is already in place, or an answer is in the input screen, or the input screen is not "_" or ANSWER TOO LONG.
- If: first number is ending in a decimal, such as "123.", then a zero is added to the end of the number and the symbol is added to the end of the input screen, therefore becomes "123.0 + ".
- Else: opertor symbol is simply added to the end of the input screen, "123" becomes "123 + ".

#4.3:

- This section of code is similar to that discussed in #1, but:
- There is a small amount of further functionality included. The purpose of the functionality is to achieve the following:
  - Lets say the input screen is displaying the answer from the previous operation, after the user had pressed equals ("=").
  - The user then presses an operator symbol such as "+".
  - The functionality allows so that the answer becomes the first number of the new operation statement, and behind that the operator is input.
  - It creates the ability for the user to continue working from the previous answer/answers, and is a similar to the feature described at the top of #4.1

- From #1: When the user presses equals, the ID of the input screen DOM element goes from "input" to "answer". This is how the program knows that equals has been pressed. This is important here, as this functionality comes into use when the user had previously pressed equals and a previous operation had been calculated.

- The further functionality is the following if/else statement:
  - If: the digit length of the previous answer is too long (longer than 8 digits length), then pressing the operator will reuslt in "ANSWER TOO LONG" displaying, the previous answer exceeds the length limit and cannot be further worked on.
  - else (if the length limit is not exceeded) : before the operator symbol is attempted to be input by the user, the answer of the previous operation is displaying. Therefore all that is done is adding the operator symbol onto the end of the input screen, and the user from there can input the 2nd number.
  - Therefore: 
      Before: "67"
      After: "67 + "

iv) Equals ("=")

- If: input screen is blank or ANSWER TOO LONG, code does nothing. Makes sense as do not want to perform any operations on such input.
- Else:
  - Operate validity check performed (#4.1).
  - If returns true: Run operate function, and set ID of input screen to "answer".

Operate():

- #5.1: 
  - For loop runs through the input screen content, and looks for spaces, which identifies if an operator is present in the input.
  - Index positions where spaces occur in input (if they occur) are stored in an array to be used further in the code.

- #5.2:
  - If no operator is present, then only the first number is displaying in the input screen. That number becomes the answer and is inserted into the answer screen.
  - Else if an operator is present:
    - The input screen content is split at any spaces (" "), and is input into an array.
    - Therefore should have 3 items in the array: the 1st number, followed by the operator, and then the 2nd number.
    - Then according to what the operator is, the operation is calculated using the numbers from the array. E.g. if the operator is "+", then "array[0] + array[2]" is performed.
    - The answer is rounded down to one decimal place, the operation statement is inserted into the answer screen (e.g. "1 + 2"), and the input screen is populated with the answer.

v) Clear button

#6:
- Simple functionality which replaces input screen/ answer screen content with blank ("_").
- Designed so that: If both input screen and answer screen are filled with content/ not blank, and the clear button is pressed, then only the input screen is made blank. If the input screen is already blank, then the answer screen is made blank.
- Therefore pressing the clear button twice clears on the first click the input screen, and on the 2nd click the answer screen.

vi) Delete button

- Deletes one item per press from the input screen.
- Button only performs actions if the ID of input screen equals "input".
- If del button is pressed and input screen is displaying "ANSWER TOO LONG", then replaces with "_"
- Else: 

#7.1:
- If the last item in the input screen is a space, then an operator is the last item, e.g. "123 + ". Therefore to delete the operator, both the operator symbol and the two spaces on either side of the symbol need to be removed. Therefore 3 pops occur.

#7.2:
- Otherwise just one item is popped off the input screen.

#7.3:
- If the input screen is empty, i.e. the input screen was 1 digit length, and this item was popped off, then the input screen is made blank "_".