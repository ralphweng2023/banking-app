import { CustomerService } from '../../../domain/services/CustomerService';
import { CreateCustomerCommand } from '../CreateCustomerCommand';
import { Customer } from '../../../domain/entities/Customer';

export class CreateCustomerCommandHandler {
    constructor(private customerService: CustomerService) {}

    handle(command: CreateCustomerCommand): Customer {
        return this.customerService.createCustomer(
            command.id,
            command.name,
            command.initialDeposit
        );
    }
}
