import { CustomerService } from '../../../domain/services/CustomerService';
import { WithdrawMoneyCommand } from '../WithdrawMoneyCommand';

export class WithdrawMoneyCommandHandler {
    constructor(private customerService: CustomerService) {}

    handle(command: WithdrawMoneyCommand): boolean {
        return this.customerService.withdraw(command.customerId, command.amount);
    }
}
