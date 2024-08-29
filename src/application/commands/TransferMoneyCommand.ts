export class TransferMoneyCommand {
    constructor(
        public readonly senderId: string,
        public readonly recipientId: string,
        public readonly amount: number
    ) {}
}
