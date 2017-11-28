import { IAccountService, AccountService } from "./services/account-service";
import { Inject, Service } from "typedi";
import * as passport from 'passport';
import { Strategy as LocalStrategy, IVerifyOptions } from 'passport-local';
import { IAccountModel } from './models';


@Service()
export class PassportInitializer {
    constructor( @Inject(AccountService.type) private readonly accountService: IAccountService) {
    }

    initialize() {
        passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, this.verify));
        passport.serializeUser(this.serializeUser);
        passport.deserializeUser(this.deserializeUser);
    }

    private serializeUser = (user: IAccountModel, done: (err: any, id?: any) => void) => done(null, user._id);

    private deserializeUser = async (id: string, done: (err: any, user?: IAccountModel) => void) => {
        const account = await this.accountService.getById(id);
        if (account === undefined) {
            done(`account doesn't exist`, undefined);
            return;
        }
        done(null, account);
    };

    private verify = async (email: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void) => {
        try {
            const result = await this.accountService.validate(email, password);
            done(null, result);
        }
        catch (e) {
            done(e, null, { message: e.message });
        }
    }
}