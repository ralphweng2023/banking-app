import {CustomerService} from "../../../../../src/domain/services/CustomerService";
import {
    CreateCustomerCommandHandler
} from "../../../../../src/application/commands/handlers/CreateCustomerCommandHandler";
import {CreateCustomerCommand} from "../../../../../src/application/commands/CreateCustomerCommand";

describe('CreateCustomerCommandHandler', () => {
    let customerService: CustomerService;
    let createCustomerCommandHandler: CreateCustomerCommandHandler;

    beforeEach(() => {
        customerService = {
            createCustomer: jest.fn(),
        } as unknown as CustomerService;

        createCustomerCommandHandler = new CreateCustomerCommandHandler(customerService);
    });

    it('should call CustomerService.createCustomer with the correct parameters', () => {
        const command = new CreateCustomerCommand('customer-id-1', 'Alice', 1000);
        createCustomerCommandHandler.handle(command);

        expect(customerService.createCustomer).toHaveBeenCalledWith('customer-id-1', 'Alice', 1000);
    });
});