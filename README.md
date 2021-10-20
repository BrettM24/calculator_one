# calculator_one
Remote repository for calculator project. Project is in accordance with Odin Project Fundamentals

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