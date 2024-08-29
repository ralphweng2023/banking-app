import { Customer } from '../entities/Customer';
import {Money} from "../value-objects/Money";

export interface ICustomerRepository {
    /**
     * Save a customer to the repository.
     * @param customer - The customer to be saved.
     */
    save(customer: Customer): void;

    /**
     * Find a customer by their ID.
     * @param id - The ID of the customer to find.
     * @returns The customer if found, otherwise undefined.
     */
    findById(id: string): Customer | undefined;

    /**
     * Remove a customer from the repository.
     * @param id - The ID of the customer to remove.
     * @returns True if the customer was removed, otherwise false.
     */
    remove(id: string): boolean;

    /**
     * Find all customers in the repository.
     * @returns An array of all customers.
     */
    findAll(): Customer[];

    /**
     * Get the total balance of all customers.
     * @returns The total balance.
     */
    getTotalBalance(): Money;
}
