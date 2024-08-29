import { InMemoryCustomerRepository } from '../../src/infrastructure/repositories/InMemoryCustomerRepository';
import { CustomerService } from '../../src/domain/services/CustomerService';
import { CreateCustomerCommand } from '../../src/application/commands/CreateCustomerCommand';
import { DepositMoneyCommand } from '../../src/application/commands/DepositMoneyCommand';
import { WithdrawMoneyCommand } from '../../src/application/commands/WithdrawMoneyCommand';
import { TransferMoneyCommand } from '../../src/application/commands/TransferMoneyCommand';
import { CreateCustomerCommandHandler } from '../../src/application/commands/handlers/CreateCustomerCommandHandler';
import { DepositMoneyCommandHandler } from '../../src/application/commands/handlers/DepositMoneyCommandHandler';
import { WithdrawMoneyCommandHandler } from '../../src/application/commands/handlers/WithdrawMoneyCommandHandler';
import { TransferMoneyCommandHandler } from '../../src/application/commands/handlers/TransferMoneyCommandHandler';

describe('Banking Integration Test', () => {
    let customerRepository: InMemoryCustomerRepository;
    let customerService: CustomerService;

    let createCustomerHandler: CreateCustomerCommandHandler;
    let depositMoneyHandler: DepositMoneyCommandHandler;
    let withdrawMoneyHandler: WithdrawMoneyCommandHandler;
    let transferMoneyHandler: TransferMoneyCommandHandler;

    beforeEach(() => {
        customerRepository = new InMemoryCustomerRepository();
        customerService = new CustomerService(customerRepository);

        createCustomerHandler = new CreateCustomerCommandHandler(customerService);
        depositMoneyHandler = new DepositMoneyCommandHandler(customerService);
        withdrawMoneyHandler = new WithdrawMoneyCommandHandler(customerService);
        transferMoneyHandler = new TransferMoneyCommandHandler(customerService);
    });

    it('should allow a customer to join the bank with an initial deposit', () => {
        // Create a customer
        const createCustomerCommand = new CreateCustomerCommand('1', 'Alice', 1000);
        createCustomerHandler.handle(createCustomerCommand);

        const createdCustomer = customerRepository.findById('1');
        expect(createdCustomer?.getBalance().getAmount()).toBe(1000);
        expect(createdCustomer?.getName()).toBe('Alice');
    });

    it('should allow customers to deposit, withdraw, and check their current balances', () => {
        // Create a customer
        const createCustomerCommand = new CreateCustomerCommand('1', 'Alice', 1000);
        createCustomerHandler.handle(createCustomerCommand);

        // Deposit money
        const depositMoneyCommand = new DepositMoneyCommand('1', 500);
        depositMoneyHandler.handle(depositMoneyCommand);

        const customerAfterDeposit = customerRepository.findById('1');
        expect(customerAfterDeposit?.getBalance().getAmount()).toBe(1500);

        // Withdraw money
        const withdrawMoneyCommand = new WithdrawMoneyCommand('1', 300);
        const withdrawSuccess = withdrawMoneyHandler.handle(withdrawMoneyCommand);

        expect(withdrawSuccess).toBe(true);
        const customerAfterWithdrawal = customerRepository.findById('1');
        expect(customerAfterWithdrawal?.getBalance().getAmount()).toBe(1200);
    });

    it('should calculate the total balance of all customers for the bank manager', () => {
        // Create first customer
        const createFirstCustomerCommand = new CreateCustomerCommand('1', 'Alice', 1000);
        createCustomerHandler.handle(createFirstCustomerCommand);

        // Create second customer
        const createSecondCustomerCommand = new CreateCustomerCommand('2', 'Bob', 500);
        createCustomerHandler.handle(createSecondCustomerCommand);

        // Create third customer
        const createThirdCustomerCommand = new CreateCustomerCommand('3', 'Mike', 2500);
        createCustomerHandler.handle(createThirdCustomerCommand);

        const totalBalance = customerService.getTotalBalance();
        expect(totalBalance.getAmount()).toBe(4000);
    });

    it('should prevent a customer from withdrawing more money than they have', () => {
        // Create a customer
        const createCustomerCommand = new CreateCustomerCommand('1', 'Alice', 1000);
        createCustomerHandler.handle(createCustomerCommand);

        // Attempt to withdraw more money than the customer has
        const withdrawMoneyCommand = new WithdrawMoneyCommand('1', 1200);
        const withdrawSuccess = withdrawMoneyHandler.handle(withdrawMoneyCommand);

        expect(withdrawSuccess).toBe(false);

        const customerAfterFailedWithdrawal = customerRepository.findById('1');
        expect(customerAfterFailedWithdrawal?.getBalance().getAmount()).toBe(1000);
    });

    it('should allow customers to transfer money to another customer', () => {
        // Create a customer
        const createCustomerCommand1 = new CreateCustomerCommand('1', 'Alice', 1000);
        createCustomerHandler.handle(createCustomerCommand1);

        // Create another customer
        const createCustomerCommand2 = new CreateCustomerCommand('2', 'Bob', 500);
        createCustomerHandler.handle(createCustomerCommand2);

        // Transfer money
        const transferMoneyCommand = new TransferMoneyCommand('1', '2', 400);
        const transferSuccess = transferMoneyHandler.handle(transferMoneyCommand);

        expect(transferSuccess).toBe(true);

        const customerAfterTransfer = customerRepository.findById('1');
        const recipientAfterTransfer = customerRepository.findById('2');

        expect(customerAfterTransfer?.getBalance().getAmount()).toBe(600);
        expect(recipientAfterTransfer?.getBalance().getAmount()).toBe(900);
    });
});
