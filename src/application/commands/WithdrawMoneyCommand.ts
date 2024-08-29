export class WithdrawMoneyCommand {
    constructor(
        public readonly customerId: string,
        public readonly amount: number
    ) {}
}
