import { ICustomerRepository } from '../../domain/repositories/ICustomerRepository';
import { Customer } from '../../domain/entities/Customer';
import {Money} from "../../domain/value-objects/Money";

export class InMemoryCustomerRepository implements ICustomerRepository {

    private customers: Map<string, Customer> = new Map();

    /**
     * Save a customer to the repository.
     * If a customer with the same ID already exists, it will be overwritten.
     * @param customer - The customer to be saved.
     */
    save(customer: Customer): void {
        this.customers.set(customer.getId(), customer);
    }

    /**
     * Find a customer by their ID.
     * @param id - The ID of the customer to find.
     * @returns The customer if found, otherwise undefined.
     */
    findById(id: string): Customer | undefined {
        return this.customers.get(id);
    }

    /**
     * Remove a customer from the repository.
     * @param id - The ID of the customer to remove.
     * @returns True if the customer was removed, otherwise false.
     */
    remove(id: string): boolean {
        return this.customers.delete(id);
    }

    /**
     * Find all customers in the repository.
     * @returns An array of all customers.
     */
    findAll(): Customer[] {
        return Array.from(this.customers.values());
    }

    getTotalBalance(): Money {
        let totalAmount = 0;

        for (let customer of this.customers.values()) {
            totalAmount += customer.getBalance().getAmount();
        }

        return new Money(totalAmount);
    }
}
