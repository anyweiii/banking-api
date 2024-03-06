let customerList = [];

// User Registration
function userRegistration(customerName, initialDeposit) {
    if (!customerName || !initialDeposit) {
        let missingFields = [];

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

    if (typeof initialDeposit !== 'number' || parseFloat(initialDeposit) < 2000) {
        return {
            error: 'Initial deposit must be greater than 2000 and must be a valid number'
        }
    }

    let newUser = {
        customerName,
        balance: parseFloat(initialDeposit)
    };

    customerList.push(newUser);

    return {
        success: true,
        message: `Congratulations on opening your bank ${customerName}! Your initial deposit is ${initialDeposit}.`
    }
}

// Deposit function
function userDeposit(customerName, amount) {
    let existingUser = customerList.find(user => user.customerName === customerName);

    if (!existingUser) {
        return {
            error: `User ${customerName} does not exist. Unable to deposit.`
        }
    }

    if (typeof amount !== 'number' || parseFloat(amount) <= 0) {
        return {
            error: 'Please indicate a valid deposit amount value.'
        }
    }
        
    existingUser.balance += parseFloat(amount);

    return {
        success: true,
        message: `Amount of ${amount} is successfully deposited to ${customerName}.`
    }
}

// Withdraw Function
function userWithDraw(customerName, withdrawalAmount) {
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
            error: 'Your accounts maintaning balance is 2000, unable to proceed with the withdrawal.'
        }
    }

    if (typeof withdrawalAmount !== 'number' || parseFloat(withdrawalAmount) <= 0) {
        return {
            error: 'Please indicate a valid withdrawal amount value.'
        }
    }

    existingUser.balance -= parseFloat(withdrawalAmount);
    
    return {
        success: true,
        message: `Amount of ${withdrawalAmount} has been successfully deducted to account ${customerName}`
    }
};

// Check Current Balance
function checkUserBalance(customerName) {
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
function transferFunds(customerList, sourceUser, targetUser, transferAmount) {
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

    if (typeof transferAmount !== 'number' || parseFloat(transferAmount) <= 0) {
        return {
            error: 'Please indicate a valid transfer amount value.'
        }
    }

    if (parseFloat(transferAmount) > sourceCustomer.balance) {
        return {
            error: 'Unable to proceed with the transfer, your balance is less than the transfer amount.'
        }
    }

    sourceCustomer.balance -= parseFloat(transferAmount);
    targetCustomer.balance += parseFloat(transferAmount);

    return {
        success: true,
        message: `Amount of ${transferAmount} has been successfully transferred from ${sourceUser} to ${targetUser}`
    }
}

// Manager to check total balance
function bankBalance(customerList) {
    let totalBalance = 0;

    customerList.forEach(customer => {
        totalBalance += customer.balance;
    })
    return totalBalance; 
}

module.exports = {
    userRegistration,
    userDeposit,
    userWithDraw,
    checkUserBalance,
    transferFunds,
    bankBalance
}


