import { Service, Token, Inject } from 'typedi';
import { IAccountModel, AccountModel } from '../models';
import { Document, Model } from 'mongoose';

export interface IAccountService {

    getById(id: string): Promise<IAccountModel | undefined>;

    register(account: IAccountModel): Promise<IAccountModel | undefined>;

    validate(email: string, password: string): Promise<IAccountModel | undefined>;

}

@Service(AccountService.type)
export class AccountService implements IAccountService {

    static type = new Token<AccountService>();

    constructor( @Inject(AccountModel.type) private readonly accountModel: Model<IAccountModel & Document>) {
    }

    async getById(id: string): Promise<IAccountModel | undefined> {
        const result = await this.accountModel.findById(id);

        return result ? result.toJSON() as IAccountModel : undefined;
    }

    async register(account: IAccountModel): Promise<IAccountModel | undefined> {
        const result = await this.accountModel.create(account);

        return this.getById(result._id);
    }

    async validate(email: string, password: string): Promise<IAccountModel | undefined> {
        const result = await this.accountModel.findOne({ email }).select({ email: 1, password: 1 });
        if (result === null || !await AccountModel.comparePassword(password, result.password)) {
            throw new Error('Email or password is invalid');
        }
        return this.getById(result._id);
    }

}