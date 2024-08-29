import { CustomerService } from '../../../../src/domain/services/CustomerService';
import { InMemoryCustomerRepository } from '../../../../src/infrastructure/repositories/InMemoryCustomerRepository';
import { Customer } from '../../../../src/domain/entities/Customer';
import { Money } from '../../../../src/domain/value-objects/Money';

describe('CustomerService', () => {
    let customerRepository: InMemoryCustomerRepository;
    let customerService: CustomerService;

    beforeEach(() => {
        customerRepository = new InMemoryCustomerRepository();
        customerService = new CustomerService(customerRepository);
    });

    it('should create a new customer and save it to the repository', () => {
        const customer = customerService.createCustomer('1', 'Alice', 1000);

        const retrievedCustomer = customerRepository.findById('1');
        expect(retrievedCustomer?.getBalance().getAmount()).toBe(1000);
        expect(retrievedCustomer?.getName()).toBe('Alice');
    });

    it('should deposit money into an existing customer account', () => {
        customerService.createCustomer('1', 'Alice', 1000);
        customerService.deposit('1', 500);

        const updatedCustomer = customerRepository.findById('1');
        expect(updatedCustomer?.getBalance().getAmount()).toBe(1500);
    });

    it('should throw an error if trying to deposit money into a non-existent customer account', () => {
        expect(() => customerService.deposit('2', 500)).toThrowError('Customer not found');
    });

    it('should withdraw money from an existing customer account if funds are sufficient', () => {
        customerService.createCustomer('1', 'Alice', 1000);
        const success = customerService.withdraw('1', 200);

        const updatedCustomer = customerRepository.findById('1');
        expect(success).toBe(true);
        expect(updatedCustomer?.getBalance().getAmount()).toBe(800);
    });

    it('should return false when trying to withdraw money from a customer account with insufficient funds', () => {
        customerService.createCustomer('1', 'Alice', 1000);
        const success = customerService.withdraw('1', 1200);

        const updatedCustomer = customerRepository.findById('1');
        expect(success).toBe(false);
        expect(updatedCustomer?.getBalance().getAmount()).toBe(1000);
    });

    it('should throw an error if trying to withdraw money from a non-existent customer account', () => {
        expect(() => customerService.withdraw('2', 500)).toThrowError('Customer not found');
    });

    it('should transfer money between two customers if the sender has sufficient funds', () => {
        customerService.createCustomer('1', 'Alice', 1000);
        customerService.createCustomer('2', 'Bob', 500);

        const success = customerService.transfer('1', '2', 300);

        const updatedSender = customerRepository.findById('1');
        const updatedRecipient = customerRepository.findById('2');

        expect(success).toBe(true);
        expect(updatedSender?.getBalance().getAmount()).toBe(700);
        expect(updatedRecipient?.getBalance().getAmount()).toBe(800);
    });

    it('should return false when trying to transfer money if the sender has insufficient funds', () => {
        customerService.createCustomer('1', 'Alice', 1000);
        customerService.createCustomer('2', 'Bob', 500);

        const success = customerService.transfer('1', '2', 1200);

        const updatedSender = customerRepository.findById('1');
        const updatedRecipient = customerRepository.findById('2');

        expect(success).toBe(false);
        expect(updatedSender?.getBalance().getAmount()).toBe(1000);
        expect(updatedRecipient?.getBalance().getAmount()).toBe(500);
    });

    it('should throw an error if trying to transfer money between non-existent customers', () => {
        customerService.createCustomer('1', 'Alice', 1000);

        expect(() => customerService.transfer('1', '3', 500)).toThrowError('Sender or recipient not found');
    });

    it('should return the total balance of all customers', () => {
        customerService.createCustomer('1', 'Alice', 1000);
        customerService.createCustomer('2', 'Bob', 1500);

        const totalBalance = customerService.getTotalBalance();
        expect(totalBalance.getAmount()).toBe(2500);
    });

    it('should return 0 if no customers are present', () => {
        const totalBalance = customerService.getTotalBalance();
        expect(totalBalance.getAmount()).toBe(0);
    });

    it('should throw an error when trying to create a customer with a negative balance', () => {
        expect(() => {
            new Customer('1', 'Charlie', new Money(-500));
        }).toThrowError('Amount cannot be negative');
    });
});
