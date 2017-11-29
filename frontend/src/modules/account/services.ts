import { IAccountInfo } from './state';

export function register(account: IAccountInfo) {
    fetch('/account/register', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(account),
        headers: [["content-type", "application/json"]]
    }).then(res => {        
        return res.json();
    })
        .then(result => ({ result }))
}