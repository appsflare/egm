import { BaseModel, createModel, prop, pre } from '../lib';
import { Service } from 'typedi';
import { hash, compare } from 'bcrypt';

export interface IAccountModel {
    _id: string;
    email: string;
    password: string;
}
function factory() {
    return createModel(AccountModel);
}

@Service({ id: AccountModel.type, factory })
export class AccountModel extends BaseModel implements Partial<IAccountModel> {

    static type = AccountModel.name;

    @prop({ unique: true, lowercase: true })
    email: string;

    @prop({ select: false })
    password: string;

    @pre("save")
    async beforeSave(next: any) {
        this.password = await hash(this.password, 5);
        next();
    }

    static comparePassword(password: string, hash: string) {
        return compare(password, hash)
    }

}