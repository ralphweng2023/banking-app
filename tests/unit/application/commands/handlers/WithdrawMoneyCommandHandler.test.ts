import {CustomerService} from "../../../../../src/domain/services/CustomerService";
import {
    WithdrawMoneyCommandHandler
} from "../../../../../src/application/commands/handlers/WithdrawMoneyCommandHandler";
import {WithdrawMoneyCommand} from "../../../../../src/application/commands/WithdrawMoneyCommand";

describe('WithdrawMoneyCommandHandler', () => {
    let customerService: CustomerService;
    let withdrawMoneyCommandHandler: WithdrawMoneyCommandHandler;

    beforeEach(() => {
        customerService = {
            withdraw: jest.fn(),
        } as unknown as CustomerService;

        withdrawMoneyCommandHandler = new WithdrawMoneyCommandHandler(customerService);
    });

    it('should call CustomerService.withdraw with the correct parameters', () => {
        const command = new WithdrawMoneyCommand('customer-id-1', 300);
        withdrawMoneyCommandHandler.handle(command);

        expect(customerService.withdraw).toHaveBeenCalledWith('customer-id-1', 300);
    });
});