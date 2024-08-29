import { CustomerService } from '../../../domain/services/CustomerService';
import { TransferMoneyCommand } from '../TransferMoneyCommand';

export class TransferMoneyCommandHandler {
    constructor(private customerService: CustomerService) {}

    handle(command: TransferMoneyCommand): boolean {
        return this.customerService.transfer(
            command.senderId,
            command.recipientId,
            command.amount
        );
    }
}
