import {CustomerService} from "../../../../../src/domain/services/CustomerService";
import {
    TransferMoneyCommandHandler
} from "../../../../../src/application/commands/handlers/TransferMoneyCommandHandler";
import {TransferMoneyCommand} from "../../../../../src/application/commands/TransferMoneyCommand";

describe('TransferMoneyCommandHandler', () => {
    let customerService: CustomerService;
    let transferMoneyCommandHandler: TransferMoneyCommandHandler;

    beforeEach(() => {
        customerService = {
            transfer: jest.fn(),
        } as unknown as CustomerService;

        transferMoneyCommandHandler = new TransferMoneyCommandHandler(customerService);
    });

    it('should call CustomerService.transfer with the correct parameters', () => {
        const command = new TransferMoneyCommand('sender-id-1', 'recipient-id-2', 300);
        transferMoneyCommandHandler.handle(command);

        expect(customerService.transfer).toHaveBeenCalledWith('sender-id-1', 'recipient-id-2', 300);
    });
});