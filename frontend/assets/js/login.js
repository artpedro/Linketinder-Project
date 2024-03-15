"use strict";
var _a;
(_a = document.getElementById('login')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault();
    let formData = new FormData(this);
    let formDataMap = new Map();
    for (const [key, value] of formData.entries()) {
        formDataMap.set(key, value);
    }
    let logins = JSON.parse(localStorage.getItem('all_login'));
    let loginEmail = formDataMap.get('email');
    if (loginEmail in logins) {
        let password = logins[loginEmail];
        if (formDataMap.get('password') === password) {
            localStorage.setItem('current_user', loginEmail);
            window.location.href = './candidate.html';
        }
        else {
            console.log('invalid password');
        }
    }
});
