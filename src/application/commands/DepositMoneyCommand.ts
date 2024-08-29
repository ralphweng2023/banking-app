export class DepositMoneyCommand {
    constructor(
        public readonly customerId: string,
        public readonly amount: number
    ) {}
}
