import { InMemoryCustomerRepository } from '../../../../src/infrastructure/repositories/InMemoryCustomerRepository';
import { Customer } from '../../../../src/domain/entities/Customer';
import { Money } from '../../../../src/domain/value-objects/Money';

describe('InMemoryCustomerRepository', () => {
    let repository: InMemoryCustomerRepository;

    beforeEach(() => {
        repository = new InMemoryCustomerRepository();
    });

    it('should save a customer to the repository', () => {
        const customer = new Customer('1', 'Alice', new Money(1000));
        repository.save(customer);

        const retrievedCustomer = repository.findById('1');
        expect(retrievedCustomer).toBeDefined();
        expect(retrievedCustomer?.getName()).toBe('Alice');
        expect(retrievedCustomer?.getBalance().getAmount()).toBe(1000);
    });

    it('should return undefined when trying to find a non-existent customer by ID', () => {
        const retrievedCustomer = repository.findById('non-existent-id');
        expect(retrievedCustomer).toBeUndefined();
    });

    it('should remove a customer from the repository by ID', () => {
        const customer = new Customer('1', 'Alice', new Money(1000));
        repository.save(customer);

        const removed = repository.remove('1');
        expect(removed).toBe(true);

        const retrievedCustomer = repository.findById('1');
        expect(retrievedCustomer).toBeUndefined();
    });

    it('should return false when trying to remove a non-existent customer', () => {
        const removed = repository.remove('non-existent-id');
        expect(removed).toBe(false);
    });

    it('should find all customers in the repository', () => {
        const customer1 = new Customer('1', 'Alice', new Money(1000));
        const customer2 = new Customer('2', 'Bob', new Money(1500));
        repository.save(customer1);
        repository.save(customer2);

        const customers = repository.findAll();
        expect(customers.length).toBe(2);
        expect(customers).toEqual(expect.arrayContaining([customer1, customer2]));
    });

    it('should calculate the total balance of all customers', () => {
        const customer1 = new Customer('1', 'Alice', new Money(1000));
        const customer2 = new Customer('2', 'Bob', new Money(1500));
        repository.save(customer1);
        repository.save(customer2);

        const totalBalance = repository.getTotalBalance();
        expect(totalBalance.getAmount()).toBe(2500);
    });

    it('should return a total balance of 0 when no customers are present', () => {
        const totalBalance = repository.getTotalBalance();
        expect(totalBalance.getAmount()).toBe(0);
    });

    it('should handle customers with a zero balance', () => {
        const customer = new Customer('1', 'Alice', new Money(0));
        repository.save(customer);

        const totalBalance = repository.getTotalBalance();
        expect(totalBalance.getAmount()).toBe(0);
    });
});
