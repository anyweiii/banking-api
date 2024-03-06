# Coded by: Hui Angeles
# Banking System
    - This coding assessment / project implements the simple functionalities of a banking system in which:
    1. User Registration - Allows users to register by providing their name and their initial deposit amount.
    2. Deposit - Allows users to deposit money to their accounts.
    3. Withdrawal - Enables users to withdraw specified amount from their accounts but this is subjected to certain conditions such as the users maintaining balance.
    4. Balance Inquiry - Users have the ability to check their account balances.
    5. Fund Transfer - This allows the users to transfer funds from one account to the other.
    6. Manager can check the total balance of the bank - This enables the manager to view all the users account total balance.
    
    I added some important validations on the main file which is index.js in order to make it more realistic.
# How to Run the test
    CLONE MY REPOSITORY
    - in your terminal you may type command (git clone https://github.com/anyweiii/banking-api.git) or you can directly download a ZIP file which can be navigated (<>Code -> Download ZIP). This will help you download all the files in the repository.
    
    - Before running the test, please make sure to do the following;
    1. **Install Dependencies** - Please make sure to install first node.js into your computer. You can also download it here [(https://nodejs.org/)]. 
    - After installing node.js, go to the directory on which your file is located and open the terminal, run the command **npm install.**
    - You should also install Typescript if you dont have it to your machine you can install it via your terminal using **npm install -g typescript** or **npm install typescript**.
    2. **Run Test** - I have used jest as my testing framework because this is what I encountered in our coding bootcamp and it is much easier to understand. 
    - Once the dependencies are installed, please compile your typescript using **tsc** command: **tsc index.ts**.
    - You may use the command: **npx jest** or **npm test** to execute the test cases. 
    - This command will execute all the test cases defined in this code and results will show in the terminal. I also added a console.log for a better understanding of what happened to the result or why it became invalid (if ever).
    3. After running the test, there will be an output indicating whether each test passed or failed, along with their error messages or additional information provided by the tests. 
