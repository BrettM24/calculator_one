# calculator_one
Remote repository for calculator project. Project is in accordance with Odin Project Fundamentals Stage

Planning

When "." pressed:

- If no "." present -> Populates number on input screen with "."
- If "." present -> Will not allow another "."

To achieve this, function run each time decimal clicked to check if decimal is in place.
Function can contain for-loop to go through each value, if decimal already exists in the current number
then will not allow another decimal to be included.

- Will need to be checked if decimal is in place every time a number is inserted
- Therefore decimal checker is run whenever number button is pressed
- Called from multiple locations therefore will declare seperately
 
Once decimal is in number, only one more number is allowed after decimal.
Function to check everytime a number button is pressed.
If decimal checker comes back positive then will check what comes after decimal
- If nothing -> Allow number pressed to be inserted into DOM
- If one number -> Do not allow number to be inserted into DOm

How to determine where number is almost to long, and an attempt is made to insert a decimal
- considering size of screen: longest input number can be 8 digits
- decimal and 1 digit after takes up to spaces -> setup: "123456" , "."(7) , "8"
- overall digits: 8 3 8 = 20
- an operator is itself and one space on either side -> therefore 3 digits
- Therefore a decimal can only be inserted if the current number is 6 digits or less

How to determine if number is 8 digits
- length? will need to convert to array first
- Can split at spaces to get seperate numbers and operator
- if length is 8 then will not allow for number to be inserted
- function will have to be included in every event listner for the number and decimal buttons

How to identify seperate numbers

How to identify operand

How to prevent a 2nd operand being input.

Step 1: Split input string into seperate elements
Different scenarios:
- Two operands and the operator
- One operand (including empty)
- One operand and an operator

Step 2: Assess each operand for length and decimal
- If 8 digits then do not allow a further digit
- Decimal issues dicussed above

What can be operated on, what cannot?
- if "=" pressed right away, answer will equal zero
- if either number has decimal with no number behind it, then operate will not be allowed
- if operator with no 2nd number, do not allow to operate
- if divide by zero then do not allow

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

i) 1-9

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
- The first variable (arrayNumStore) gets the current number. Lets says the inputScreen is displaying "123 + 45", the current number is 45. If "123" is displaying on its own with no operator, the current number is 123.
- The second variable (numLength) stores information on whether the current number is less that the maximum input length. The calculator is designed so that the maximum number of digits an inputted number can be is 8 digits, and attempting to input a futher digit is prevented by the code.
- The third variable (decimalChecker) stores information on whether a decimal is currently present in the number, which is then used by the fourth and final variable in this section of code.
- The fourth variable (digitAfterDecimal) stores information which determines the following: if a decimal is present in the number, can a further number be inserted after the decimal. The calculator is designed so that only one digit after the decimal can be included, e.g. "1.3" is valid but not "1.45". If the lets say is currently "24." with nothing after the decimal, then in this case the design allows for one digit to be inserted into this number.

- From here an if/else statement is entered into, and we will look at the "if" under #2.1 and the else under #2.2

#2.1:
- To enter the if, the number must NOT have a decimal.
- A further if codition needs to be met to move into the subsequent body of code, being that the number numLength is true and the number is less than 8 digits. If not, then the code ends there and no further digit can be inserted.
- The subsequent body results in 1-9 digit being inputted.
- A futher if/else makes up this body. If the inputScreen is currently displaying blank ("_") or "ANSWER TOO LONG" (Will explain this further along) then current display is cleared and the appropriate digit is inserted (So, therefore, just a single digit, e.g "3", will be displaying). Else, if just a valid length number is displayig (e.g 123) then the appropriate digit is added to this number. 

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
- Compare the differences between the different id's in style.css, to get an understanding of how this affect works. I.e. compare buttonOne to buttonOnePressed.




