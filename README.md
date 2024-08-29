# Banking Application

This project is a simple banking application implemented in TypeScript, following Domain-Driven Design (DDD) principles. The application supports basic banking operations such as creating customers, depositing money, withdrawing money, and transferring money between customers. It also includes features for managing customers and calculating the total balance across all accounts.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [License](#license)

## Features

- **Customer Management**: Create and manage customer accounts with an initial deposit.
- **Deposit and Withdrawal**: Customers can deposit money into or withdraw money from their accounts.
- **Money Transfer**: Customers can transfer money to other customers within the bank.
- **Balance Inquiry**: Both customers and the bank manager can check account balances.
- **Total Balance Calculation**: The bank manager can view the total balance across all customer accounts.
- **Error Handling**: Prevents overdrafts and ensures customers cannot withdraw more money than they have.

## Architecture

This project follows Domain-Driven Design (DDD) principles and is structured with the following key components:

- **Domain**: Contains core business logic and entities (e.g., `Customer`, `Money`).
- **Application**: Contains command handlers for executing use cases (e.g., `CreateCustomerCommandHandler`, `DepositMoneyCommandHandler`).
- **Infrastructure**: Contains repository implementations and other infrastructure-related code (e.g., `InMemoryCustomerRepository`).

## Installation

To get started with this project, follow these steps:

Install the dependencies:

```bash
npm install
```

Running Tests
The project includes both unit and integration tests. You can run them as follows:

Unit Tests
Run all unit tests using:
```angular2html
npm run test:unit
```
Integration Tests
Run all integration tests using:
```angular2html
npm run test:integration
```

Usage
Create a new customer account:
```angular2html
const createCustomerCommand = new CreateCustomerCommand('1', 'Alice', 1000);
createCustomerHandler.handle(createCustomerCommand);
```
Deposit money into a customer's account:
```angular2html
const depositMoneyCommand = new DepositMoneyCommand('1', 500);
depositMoneyHandler.handle(depositMoneyCommand);
```

Withdraw money from a customer's account:
```angular2html
const withdrawMoneyCommand = new WithdrawMoneyCommand('1', 200);
withdrawMoneyHandler.handle(withdrawMoneyCommand);
```

Transfer money between customers:
```angular2html
const transferMoneyCommand = new TransferMoneyCommand('1', '2', 100);
transferMoneyHandler.handle(transferMoneyCommand);
```

Check total balance across all accounts:
```angular2html
const totalBalance = getTotalBalanceQueryHandler.handle();
console.log(totalBalance);
```

