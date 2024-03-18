"use strict";
var _a;
(_a = document.getElementById('login')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a, _b;
    event.preventDefault();
    let formData = new FormData(this);
    let formDataMap = new Map();
    for (const [key, value] of formData.entries()) {
        formDataMap.set(key, value);
    }
    let logins = JSON.parse(localStorage.getItem('all_login'));
    let loginEmail = formDataMap.get('email');
    if (!(loginEmail in logins)) {
        console.log('Email inválido');
    }
    else {
        let password = logins[loginEmail];
        if (!(formDataMap.get('password') === password)) {
            console.log('Senha inválida');
        }
        else {
            localStorage.setItem('current_user', loginEmail);
            const allUsers = objectToUsersLog(JSON.parse(localStorage.getItem('all_users')));
            let allCompanies = Array.from((_b = (_a = allUsers.get('company')) === null || _a === void 0 ? void 0 : _a.keys()) !== null && _b !== void 0 ? _b : ['']);
            console.log(loginEmail);
            console.log(allCompanies);
            if (allCompanies.includes(loginEmail)) {
                window.location.href = './company.html';
            }
            else {
                window.location.href = './candidate.html';
            }
        }
    }
});
