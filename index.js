import inquirer from 'inquirer';
class Bank {
    accounts = [];
    nextAccountNumber = 1;
    createAccount(owner) {
        const newAccount = {
            accountNumber: this.nextAccountNumber,
            owner,
            balance: 0
        };
        this.accounts.push(newAccount);
        this.nextAccountNumber++;
        return newAccount;
    }
    deposit(accountNumber, amount) {
        const account = this.accounts.find(acc => acc.accountNumber === accountNumber);
        if (account && amount > 0) {
            account.balance += amount;
            return true;
        }
        return false;
    }
    withdraw(accountNumber, amount) {
        const account = this.accounts.find(acc => acc.accountNumber === accountNumber);
        if (account && amount > 0 && account.balance >= amount) {
            account.balance -= amount;
            return true;
        }
        return false;
    }
    getBalance(accountNumber) {
        const account = this.accounts.find(acc => acc.accountNumber === accountNumber);
        return account ? account.balance : null;
    }
    printAccounts() {
        console.log(this.accounts);
    }
}
const bank = new Bank();
const mainMenu = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Choose an option:',
            choices: [
                '1. Create Account',
                '2. Deposit',
                '3. Withdraw',
                '4. Check Balance',
                '5. Print All Accounts',
                '6. Exit'
            ]
        }
    ]);
    switch (answers.option) {
        case '1. Create Account':
            const { owner } = await inquirer.prompt({
                type: 'input',
                name: 'owner',
                message: 'Enter account owner name:'
            });
            const newAccount = bank.createAccount(owner);
            console.log(`Account created: ${newAccount.accountNumber}`);
            mainMenu();
            break;
        case '2. Deposit':
            const { depositAccNum, depositAmount } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'depositAccNum',
                    message: 'Enter account number:'
                },
                {
                    type: 'input',
                    name: 'depositAmount',
                    message: 'Enter amount to deposit:'
                }
            ]);
            if (bank.deposit(parseInt(depositAccNum), parseFloat(depositAmount))) {
                console.log('Deposit successful');
            }
            else {
                console.log('Deposit failed');
            }
            mainMenu();
            break;
        case '3. Withdraw':
            const { withdrawAccNum, withdrawAmount } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'withdrawAccNum',
                    message: 'Enter account number:'
                },
                {
                    type: 'input',
                    name: 'withdrawAmount',
                    message: 'Enter amount to withdraw:'
                }
            ]);
            if (bank.withdraw(parseInt(withdrawAccNum), parseFloat(withdrawAmount))) {
                console.log('Withdrawal successful');
            }
            else {
                console.log('Withdrawal failed');
            }
            mainMenu();
            break;
        case '4. Check Balance':
            const { balanceAccNum } = await inquirer.prompt({
                type: 'input',
                name: 'balanceAccNum',
                message: 'Enter account number:'
            });
            const balance = bank.getBalance(parseInt(balanceAccNum));
            if (balance !== null) {
                console.log(`Balance: ${balance}`);
            }
            else {
                console.log('Account not found');
            }
            mainMenu();
            break;
        case '5. Print All Accounts':
            bank.printAccounts();
            mainMenu();
            break;
        case '6. Exit':
            console.log('Goodbye!');
            break;
        default:
            console.log('Invalid option');
            mainMenu();
            break;
    }
};
mainMenu();
