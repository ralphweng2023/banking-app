export class Money {
    private amount: number;

    constructor(amount: number) {
        if (amount < 0) {
            throw new Error('Amount cannot be negative');
        }
        this.amount = amount;
    }

    getAmount(): number {
        return this.amount;
    }

    add(money: Money): Money {
        return new Money(this.amount + money.getAmount());
    }

    canSubtract(money: Money): boolean {
        return this.amount >= money.getAmount();
    }

    subtract(money: Money): Money {
        if (!this.canSubtract(money)) {
            throw new Error('Insufficient funds');
        }
        return new Money(this.amount - money.getAmount());
    }
}
