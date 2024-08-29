import { Customer } from '../../../../src/domain/entities/Customer';
import { Money } from '../../../../src/domain/value-objects/Money';

describe('Customer Entity', () => {
    it('should create a customer with an initial deposit', () => {
        const initialDeposit = new Money(1000);
        const customer = new Customer('1', 'Alice', initialDeposit);

        expect(customer.getBalance().getAmount()).toBe(1000);
        expect(customer.getName()).toBe('Alice');
    });

    it('should allow a customer to deposit money', () => {
        const initialDeposit = new Money(1000);
        const customer = new Customer('1', 'Alice', initialDeposit);

        const depositAmount = new Money(500);
        customer.deposit(depositAmount);

        expect(customer.getBalance().getAmount()).toBe(1500);
    });

    it('should allow a customer to withdraw money if they have sufficient balance', () => {
        const initialDeposit = new Money(1000);
        const customer = new Customer('1', 'Alice', initialDeposit);

        const withdrawAmount = new Money(200);
        const result = customer.withdraw(withdrawAmount);

        expect(result).toBe(true);
        expect(customer.getBalance().getAmount()).toBe(800);
    });

    it('should not allow a customer to withdraw more money than their balance', () => {
        const initialDeposit = new Money(1000);
        const customer = new Customer('1', 'Alice', initialDeposit);

        const withdrawAmount = new Money(1200);
        const result = customer.withdraw(withdrawAmount);

        expect(result).toBe(false);
        expect(customer.getBalance().getAmount()).toBe(1000);
    });

    it('should allow a customer to transfer money to another customer if they have sufficient balance', () => {
        const customer1 = new Customer('1', 'Alice', new Money(1000));
        const customer2 = new Customer('2', 'Bob', new Money(500));

        const transferAmount = new Money(300);
        const result = customer1.transfer(transferAmount, customer2);

        expect(result).toBe(true);
        expect(customer1.getBalance().getAmount()).toBe(700);
        expect(customer2.getBalance().getAmount()).toBe(800);
    });

    it('should not allow a customer to transfer more money than their balance to another customer', () => {
        const customer1 = new Customer('1', 'Alice', new Money(1000));
        const customer2 = new Customer('2', 'Bob', new Money(500));

        const transferAmount = new Money(1200);
        const result = customer1.transfer(transferAmount, customer2);

        expect(result).toBe(false);
        expect(customer1.getBalance().getAmount()).toBe(1000);
        expect(customer2.getBalance().getAmount()).toBe(500);
    });

    it('should not allow negative deposit amounts', () => {
        const initialDeposit = new Money(1000);
        const customer = new Customer('1', 'Alice', initialDeposit);

        expect(() => customer.deposit(new Money(-500))).toThrowError('Amount cannot be negative');
    });

    it('should not allow negative withdrawal amounts', () => {
        const initialDeposit = new Money(1000);
        const customer = new Customer('1', 'Alice', initialDeposit);

        expect(() => customer.withdraw(new Money(-200))).toThrowError('Amount cannot be negative');
    });

    it('should not allow negative transfer amounts', () => {
        const customer1 = new Customer('1', 'Alice', new Money(1000));
        const customer2 = new Customer('2', 'Bob', new Money(500));

        expect(() => customer1.transfer(new Money(-300), customer2)).toThrowError('Amount cannot be negative');
    });

    it('should handle multiple deposits and withdrawals correctly', () => {
        const initialDeposit = new Money(1000);
        const customer = new Customer('1', 'Alice', initialDeposit);

        customer.deposit(new Money(500));
        customer.withdraw(new Money(200));
        customer.deposit(new Money(300));
        customer.withdraw(new Money(400));

        expect(customer.getBalance().getAmount()).toBe(1200);
    });

    it('should create two customers with different balances', () => {
        const customer1 = new Customer('1', 'Alice', new Money(1000));
        const customer2 = new Customer('2', 'Bob', new Money(2000));

        expect(customer1.getBalance().getAmount()).toBe(1000);
        expect(customer2.getBalance().getAmount()).toBe(2000);
    });
});
