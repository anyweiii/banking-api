"use strict";
const assert = require('assert');
const { userRegistration, userDeposit, userWithDraw, checkUserBalance, transferFunds, bankBalance } = require('./index');
const existingCustomer = 'Sheldon Cooper';
const unexistingCustomer = 'Leonard Hofstader';
const invalidAmount = 'invalid';
// User Registration Test
describe('[1] User Registration.', function () {
    const validName = 'Sheldon Cooper';
    const invalidName = 12345;
    const validInitialDeposit = 7000; // must be equal or less than 2000
    const invalidInitialDeposit = 'invalid';
    it('Register a valid user with valid inputs', () => {
        const result = userRegistration(validName, validInitialDeposit);
        expect(result.success).toEqual(true);
        console.log(result.message);
    });
    it('Reject user registration if fields are invalid', () => {
        const result = userRegistration(invalidName, invalidInitialDeposit);
        expect(result.error).toBeDefined();
        console.log(result.error);
    });
    it('Reject user registration if Customer Name is invalid', () => {
        const result = userRegistration(invalidName, validInitialDeposit);
        expect(result.error).toBeDefined();
        console.log(result.error);
    });
    it('Reject user registration if Initial Deposit is invalid and less than 2000', () => {
        const result = userRegistration(validName, invalidInitialDeposit);
        expect(result.error).toBeDefined();
        console.log(result.error);
    });
});
// User Deposit Test
describe('[2] Check if user deposit is valid', function () {
    const validAmount = 1000;
    const invalidAmount = -500;
    it('Accept user deposit if user is existing and entered a valid amount', () => {
        const result = userDeposit(existingCustomer, validAmount);
        expect(result.success).toEqual(true);
        console.log(result.message);
    });
    it('Reject if the user is not existing or does not have an account', () => {
        const result = userDeposit(unexistingCustomer, validAmount);
        expect(result.error).toBeDefined();
        console.log(result.error);
    });
    it('Reject if the amount indicated is less than 0 or invalid', () => {
        const result = userDeposit(existingCustomer, invalidAmount);
        expect(result.error).toBeDefined();
        console.log(result.error);
    });
});
// User Withdraw Test
describe('[3] Check if withdrawal amount is valid', function () {
    const validAmount = 2000;
    const largeAmount = 10000;
    const checkMaintaining = 5001;
    it('Accept user withdrawal', () => {
        const result = userWithDraw(existingCustomer, validAmount);
        expect(result.success).toEqual(true);
        console.log(result.message);
    });
    it('Reject withdrawal if user is not existing', () => {
        const result = userWithDraw(unexistingCustomer, validAmount);
        expect(result.error).toBeDefined();
        console.log(result.error);
    });
    it('Reject withdraw transaction if withdrawal amount is greater than user balance', () => {
        const result = userWithDraw(existingCustomer, largeAmount);
        expect(result.error).toBeDefined();
        console.log(result.error);
    });
    it('Reject withdraw transaction if withdrawal amount will exceed the maintaining balance', () => {
        const result = userWithDraw(existingCustomer, checkMaintaining);
        expect(result.error).toBeDefined();
        console.log(result.error);
    });
    it('Reject withdraw transaction if withdrawal amount is invalid or not a number', () => {
        const result = userWithDraw(existingCustomer, invalidAmount);
        expect(result.error).toBeDefined();
        console.log(result.error);
    });
});
// Check User Balance
describe('[4] Check user balance', function () {
    it('Unable to view if user does not exist', () => {
        const result = checkUserBalance(unexistingCustomer);
        expect(result.error).toBeDefined();
        console.log(result.error);
    });
    it('View user balance if customer has an account', () => {
        const result = checkUserBalance(existingCustomer);
        expect(result.success).toEqual(true);
        console.log(result.message);
    });
});
// Check Fund Transfer
describe('[5] Check if funds can be transferred from one user to another', function () {
    let customerList = [
        { customerName: 'Sheldon Cooper', balance: 3000 },
        { customerName: 'Leonard Hofstader', balance: 0 }
    ];
    it('Unable to transfer if users does not exist', () => {
        const result = transferFunds(customerList, 'Sheldon Cooper', 'Howard Wolowitz', 200);
        expect(result.error).toBeDefined();
        console.log(result.error);
    });
    it('Reject if amount is invalid', () => {
        const result = transferFunds(customerList, 'Sheldon Cooper', 'Leonard Hofstader', invalidAmount);
        expect(result.error).toBeDefined();
        console.log(result.error);
    });
    it('Reject if the transfer amount is less than the balance', () => {
        const result = transferFunds(customerList, 'Sheldon Cooper', 'Leonard Hofstader', 5000);
        expect(result.error).toBeDefined();
        console.log(result.error);
    });
    it('Proceed with the transfer if fields are valid', () => {
        const result = transferFunds(customerList, 'Sheldon Cooper', 'Leonard Hofstader', 100);
        expect(result.success).toEqual(true);
        console.log(result.message);
    });
});
// Manager to check total balance
describe('[6] Manager to check the total balance', function () {
    const customerList = [
        { customerName: 'Sheldon Cooper', balance: 300 },
        { customerName: 'Leonard Hofstader', balance: 400 },
        { customerName: 'Howard Wolowitz', balance: 500 }
    ];
    it('View the total bank balance', () => {
        const totalBalance = bankBalance(customerList);
        const assumingBalance = 300 + 400 + 500;
        expect(totalBalance).toEqual(assumingBalance);
        console.log(totalBalance);
    });
});
