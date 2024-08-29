import { Money } from '../value-objects/Money';

export class Customer {
    private id: string;
    private name: string;
    private balance: Money;

    constructor(id: string, name: string, initialDeposit: Money) {
        this.id = id;
        this.name = name;
        this.balance = initialDeposit;
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getBalance(): Money {
        return this.balance;
    }

    deposit(amount: Money): void {
        this.balance = this.balance.add(amount);
    }

    withdraw(amount: Money): boolean {
        if (!this.balance.canSubtract(amount)) {
            return false;
        }
        this.balance = this.balance.subtract(amount);
        return true;
    }

    transfer(amount: Money, recipient: Customer): boolean {
        if (this.withdraw(amount)) {
            recipient.deposit(amount);
            return true;
        }
        return false;
    }
}
