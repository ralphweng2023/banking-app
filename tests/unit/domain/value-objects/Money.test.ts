import { Money } from '../../../../src/domain/value-objects/Money';

describe('Money Value Object', () => {

    it('should create a Money object with a positive amount', () => {
        const initialAmount = new Money(1000);
        expect(initialAmount.getAmount()).toBe(1000);
    });

    it('should throw an error if a negative amount is provided during creation', () => {
        expect(() => new Money(-1000)).toThrowError('Amount cannot be negative');
    });

    it('should add two Money objects together', () => {
        const firstAmount = new Money(1000);
        const secondAmount = new Money(500);

        const totalAmount = firstAmount.add(secondAmount);

        expect(totalAmount.getAmount()).toBe(1500);
    });

    it('should subtract one Money object from another if sufficient funds are available', () => {
        const initialAmount = new Money(1000);
        const withdrawalAmount = new Money(500);

        const remainingAmount = initialAmount.subtract(withdrawalAmount);

        expect(remainingAmount.getAmount()).toBe(500);
    });

    it('should throw an error if attempting to subtract more money than available', () => {
        const currentBalance = new Money(500);
        const excessiveWithdrawal = new Money(1000);

        expect(() => currentBalance.subtract(excessiveWithdrawal)).toThrowError('Insufficient funds');
    });

    it('should correctly compare two Money objects for equality', () => {
        const amountOne = new Money(1000);
        const amountTwo = new Money(1000);
        const differentAmount = new Money(500);

        expect(amountOne.getAmount()).toBe(amountTwo.getAmount());
        expect(amountOne.getAmount()).not.toBe(differentAmount.getAmount());
    });

    it('should correctly handle zero value for Money', () => {
        const zeroAmount = new Money(0);
        expect(zeroAmount.getAmount()).toBe(0);
    });

    it('should handle adding zero Money to a Money object', () => {
        const initialAmount = new Money(1000);
        const zeroAmount = new Money(0);

        const finalAmount = initialAmount.add(zeroAmount);

        expect(finalAmount.getAmount()).toBe(1000);
    });

    it('should handle subtracting zero Money from a Money object', () => {
        const initialAmount = new Money(1000);
        const zeroAmount = new Money(0);

        const finalAmount = initialAmount.subtract(zeroAmount);

        expect(finalAmount.getAmount()).toBe(1000);
    });
});
