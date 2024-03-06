interface User {
    customerName: string;
    balance: number;
}

let customerList: User[] = [];

// User Registration
function userRegistration(customerName: string, initialDeposit: number): { success?: boolean; error?: string; message?: string } {
    if (!customerName || !initialDeposit) {
        let missingFields: string[] = [];

        if (!customerName) missingFields.push('customer name');
        if (!initialDeposit) missingFields.push('initial deposit');

        return {
            error: `Please fill in all user details. Missing fields: ${missingFields.join(', ')}.`
        };
    }

    if (typeof customerName !== 'string') {
        return {
            error: 'Name must be a string.'
        };
    }

    if (typeof initialDeposit !== 'number' || initialDeposit < 2000) {
        return {
            error: 'Initial deposit must be greater than 2000 and must be a valid number'
        }
    }

    let newUser: User = {
        customerName,
        balance: initialDeposit
    };

    customerList.push(newUser);

    return {
        success: true,
        message: `Congratulations on opening your bank ${customerName}! Your initial deposit is ${initialDeposit}.`
    }
}

// Deposit function
function userDeposit(customerName: string, amount: number): { success?: boolean; error?: string; message?: string } {
    let existingUser = customerList.find(user => user.customerName === customerName);

    if (!existingUser) {
        return {
            error: `User ${customerName} does not exist. Unable to deposit.`
        }
    }

    if (typeof amount !== 'number' || amount <= 0) {
        return {
            error: 'Please indicate a valid deposit amount value.'
        }
    }
        
    existingUser.balance += amount;

    return {
        success: true,
        message: `Amount of ${amount} is successfully deposited to ${customerName}.`
    }
}

// Withdraw Function
function userWithDraw(customerName: string, withdrawalAmount: number): { success?: boolean; error?: string; message?: string } {
    let existingUser = customerList.find(user => user.customerName === customerName);

    if (!existingUser) {
        return {
            error: `User ${customerName} is not found. Unable to proceed with the withdrawal`
        }
    }

    if (withdrawalAmount > existingUser.balance) {
        return {
            error: 'Unable to proceed with the withdrawal, withdrawal amount is greater than your current users balance.'
        }
    }

    if ((existingUser.balance - withdrawalAmount) < 2000) {
        return {
            error: 'Your account maintaining balance is 2000, unable to proceed with the withdrawal.'
        }
    }

    if (typeof withdrawalAmount !== 'number' || withdrawalAmount <= 0) {
        return {
            error: 'Please indicate a valid withdrawal amount value.'
        }
    }

    existingUser.balance -= withdrawalAmount;
    
    return {
        success: true,
        message: `Amount of ${withdrawalAmount} has been successfully deducted from account ${customerName}`
    }
};

// Check Current Balance
function checkUserBalance(customerName: string): { success?: boolean; error?: string; message?: string } {
    let existingCustomer = customerList.find(user => user.customerName === customerName);

    if (!existingCustomer) {
        return {
            error: `Unable to view balance. Customer ${customerName} does not exist.`
        }
    }

    return {
        success: true,
        message: `You have ${existingCustomer.balance} on your account`
    }
}

// Transfer funds
function transferFunds(customerList: User[], sourceUser: string, targetUser: string, transferAmount: number): { success?: boolean; error?: string; message?: string } {
    let sourceCustomer = customerList.find(user => user.customerName === sourceUser);
    let targetCustomer = customerList.find(user => user.customerName === targetUser);

    if (!sourceCustomer) {
        return {
            error: `Source user ${sourceUser} not found.`
        }
    }

    if (!targetCustomer) {
        return {
            error: `Target user ${targetUser} not found.`
        }
    }

    if (typeof transferAmount !== 'number' || transferAmount <= 0) {
        return {
            error: 'Please indicate a valid transfer amount value.'
        }
    }

    if (transferAmount > sourceCustomer.balance) {
        return {
            error: 'Unable to proceed with the transfer, your balance is less than the transfer amount.'
        }
    }

    sourceCustomer.balance -= transferAmount;
    targetCustomer.balance += transferAmount;

    return {
        success: true,
        message: `Amount of ${transferAmount} has been successfully transferred from ${sourceUser} to ${targetUser}`
    }
}

// Manager to check total balance
function bankBalance(customerList: User[]): number {
    let totalBalance = 0;
    customerList.forEach(customer => {
        totalBalance += customer.balance;
    })
    return totalBalance; 
}

export {
    userRegistration,
    userDeposit,
    userWithDraw,
    checkUserBalance,
    transferFunds,
    bankBalance
};
