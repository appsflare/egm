import * as passport from 'passport';
import { Request } from 'express';
import { Body, Get, JsonController, Post, Req, UseBefore } from 'routing-controllers';
import { IAccountModel } from '../models/index';
import { IAccountService, AccountService } from '../services';
import { Inject } from 'typedi';

@JsonController("/account")
export class AccountController {

    constructor( @Inject(AccountService.type) private accountService: IAccountService) { }

    @Post("/login")
    @UseBefore(passport.authenticate('local'))
    login( @Req() req: Request) {

        return new Promise((resolve, reject) => (req.logIn(req.user, (err: any) => {

            if (err) {
                reject(err);
                return;
            }

            resolve(req.user);

        })));
    }

    @Get("/me")
    me( @Req() req: Request) {
        console.log('i am at me');
        return { isLoggedIn: req.user !== undefined, ...req.user };
    }

    @Post("/register")
    register( @Body() account: IAccountModel) {
        return this.accountService.register(account);
    }

    @Post("/validate/email")
    validateEmail( @Body() account: Partial<IAccountModel>) {
        return this.accountService.isEmailValid(account.email || '');
    }

    @Get("/logout")
    logout( @Req() req: Request) {
        let result = !!req.user;
        req.logOut();

        return { result }
    }
}