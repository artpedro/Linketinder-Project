"use strict";
var _a;
document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('is-candidate');
    const ageContainer = document.getElementById('candidate-age');
    const skillsContainer = document.getElementById('candidate-skills');
    checkbox === null || checkbox === void 0 ? void 0 : checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            ageContainer.style.display = 'block';
            skillsContainer.style.display = 'block';
        }
        else {
            ageContainer.style.display = 'none';
            skillsContainer.style.display = 'none';
        }
    });
    const init = new logHandler();
});
(_a = document.getElementById('new-user')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    event.preventDefault();
    const handler = new userHandler();
    let formData = new FormData(this);
    let formDataMap = new Map();
    for (const [key, value] of formData.entries()) {
        formDataMap.set(key, value);
    }
    const name = (_a = formDataMap.get('name')) !== null && _a !== void 0 ? _a : '';
    const desc = (_b = formDataMap.get('bio')) !== null && _b !== void 0 ? _b : '';
    const email = (_c = formDataMap.get('email')) !== null && _c !== void 0 ? _c : '';
    const country = (_d = formDataMap.get('country')) !== null && _d !== void 0 ? _d : '';
    const cep = (_e = formDataMap.get('cep')) !== null && _e !== void 0 ? _e : '';
    const cpf_cnpj = (_f = formDataMap.get('cpf_cnpj')) !== null && _f !== void 0 ? _f : '';
    const password = (_g = formDataMap.get('password')) !== null && _g !== void 0 ? _g : '';
    const skills = (_h = formDataMap.get('skills')) !== null && _h !== void 0 ? _h : '';
    console.log(formDataMap);
    if (formDataMap.has('candidate')) {
        console.log("new candidate created");
        const age = (_j = formDataMap.get('age')) !== null && _j !== void 0 ? _j : '';
        handler.add_candidate(name, desc, email, country, cep, cpf_cnpj, password, skills, age);
    }
    else {
        console.log("new company created");
        handler.add_company(name, desc, email, country, cep, cpf_cnpj, password, skills);
    }
    window.location.href = './login.html';
});
