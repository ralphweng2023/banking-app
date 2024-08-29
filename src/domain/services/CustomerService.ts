import { ICustomerRepository } from '../repositories/ICustomerRepository';
import { Customer } from '../entities/Customer';
import { Money } from '../value-objects/Money';

export class CustomerService {
    constructor(private customerRepository: ICustomerRepository) {}

    /**
     * Create a new customer and save to the repository.
     * @param id - The unique identifier for the customer.
     * @param name - The name of the customer.
     * @param initialDeposit - The initial deposit amount.
     * @returns The created Customer.
     */
    createCustomer(id: string, name: string, initialDeposit: number): Customer {
        const customer = new Customer(id, name, new Money(initialDeposit));
        this.customerRepository.save(customer);
        return customer;
    }

    /**
     * Deposit money into an existing customer's account.
     * @param customerId - The ID of the customer.
     * @param amount - The amount to deposit.
     */
    deposit(customerId: string, amount: number): void {
        const customer = this.customerRepository.findById(customerId);
        if (customer) {
            customer.deposit(new Money(amount));
            this.customerRepository.save(customer);
        } else {
            throw new Error('Customer not found');
        }
    }

    /**
     * Withdraw money from an existing customer's account.
     * @param customerId - The ID of the customer.
     * @param amount - The amount to withdraw.
     * @returns True if the withdrawal is successful, otherwise false.
     */
    withdraw(customerId: string, amount: number): boolean {
        const customer = this.customerRepository.findById(customerId);
        if (customer) {
            const success = customer.withdraw(new Money(amount));
            if (success) {
                this.customerRepository.save(customer);
            }
            return success;
        } else {
            throw new Error('Customer not found');
        }
    }

    /**
     * Transfer money from one customer to another.
     * @param senderId - The ID of the sender.
     * @param recipientId - The ID of the recipient.
     * @param amount - The amount to transfer.
     * @returns True if the transfer is successful, otherwise false.
     */
    transfer(senderId: string, recipientId: string, amount: number): boolean {
        const sender = this.customerRepository.findById(senderId);
        const recipient = this.customerRepository.findById(recipientId);

        if (sender && recipient) {
            const success = sender.transfer(new Money(amount), recipient);
            if (success) {
                this.customerRepository.save(sender);
                this.customerRepository.save(recipient);
            }
            return success;
        } else {
            throw new Error('Sender or recipient not found');
        }
    }

    /**
     * Get the total balance of all customers.
     */
    getTotalBalance(): Money {
        return this.customerRepository.getTotalBalance();
    }
}
