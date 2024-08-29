import {CustomerService} from "../../../domain/services/CustomerService";
import { DepositMoneyCommand } from '../DepositMoneyCommand';

export class DepositMoneyCommandHandler {
    constructor(private customerService: CustomerService) {}

    handle(command: DepositMoneyCommand): void {
        this.customerService.deposit(command.customerId, command.amount);
    }
}
