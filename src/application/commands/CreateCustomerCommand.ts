export class CreateCustomerCommand {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly initialDeposit: number
    ) {}
}
