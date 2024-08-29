import { DepositMoneyCommandHandler } from '../../../../../src/application/commands/handlers/DepositMoneyCommandHandler';
import { CustomerService } from '../../../../../src/domain/services/CustomerService';
import { DepositMoneyCommand } from '../../../../../src/application/commands/DepositMoneyCommand';

describe('DepositMoneyCommandHandler', () => {
    let customerService: CustomerService;
    let depositMoneyCommandHandler: DepositMoneyCommandHandler;

    beforeEach(() => {
        customerService = {
            deposit: jest.fn(),
        } as unknown as CustomerService;

        depositMoneyCommandHandler = new DepositMoneyCommandHandler(customerService);
    });

    it('should call CustomerService.deposit with the correct parameters', () => {
        const command = new DepositMoneyCommand('customer-id-1', 500);
        depositMoneyCommandHandler.handle(command);

        expect(customerService.deposit).toHaveBeenCalledWith('customer-id-1', 500);
    });
});
