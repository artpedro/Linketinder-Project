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
function whichInvalid(checks) {
    let order = ['name', 'bio', 'email', 'country', 'CEP', 'CPF or CNPJ', 'password', 'skills', 'age'];
    let index = checks.findIndex(check => !check);
    console.log(checks);
    console.log(index);
    if (index === -1) {
        return 'valid';
    }
    else {
        return order[index];
    }
}
(_a = document.getElementById('new-user')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    event.preventDefault();
    const handler = new userHandler();
    let formData = new FormData(this);
    let formDataMap = new Map();
    for (const [key, value] of formData.entries()) {
        formDataMap.set(key, value);
    }
    let isCandidate = formDataMap.has('candidate');
    const name = (_a = formDataMap.get('name')) !== null && _a !== void 0 ? _a : '';
    const validName = fieldChecker.checkField('name', name);
    console.log(name, validName);
    const desc = (_b = formDataMap.get('bio')) !== null && _b !== void 0 ? _b : '';
    const validDesc = fieldChecker.checkField('desc', desc);
    const email = (_c = formDataMap.get('email')) !== null && _c !== void 0 ? _c : '';
    const validEmail = fieldChecker.checkField('email', email);
    const country = (_d = formDataMap.get('country')) !== null && _d !== void 0 ? _d : '';
    const validCountry = fieldChecker.checkField('country', country);
    const cep = (_e = formDataMap.get('cep')) !== null && _e !== void 0 ? _e : '';
    const validCep = fieldChecker.checkField('cep', cep);
    const cpf_cnpj = (_f = formDataMap.get('cpf_cnpj')) !== null && _f !== void 0 ? _f : '';
    const validCpf_cnpj = isCandidate ? fieldChecker.checkField('cpf', cpf_cnpj) : fieldChecker.checkField('cnpj', cpf_cnpj);
    const password = (_g = formDataMap.get('password')) !== null && _g !== void 0 ? _g : '';
    const validPassword = fieldChecker.checkField('password', password);
    const skills = (_h = formDataMap.get('skills')) !== null && _h !== void 0 ? _h : '';
    const validSkills = fieldChecker.checkField('skills', skills);
    const age = isCandidate ? formDataMap.get('age') : '21';
    const validAge = fieldChecker.checkField('age', age);
    const validCredentials = validName && validDesc && validEmail && validCountry && validCep && validCpf_cnpj && validPassword && validSkills && validAge;
    console.log(validCredentials);
    console.log(formDataMap);
    if (isCandidate && validCredentials) {
        console.log("new candidate created");
        handler.add_candidate(name, desc, email, country, cep, cpf_cnpj, password, skills, age);
        window.location.href = './login.html';
    }
    else if (validCredentials) {
        console.log("new company created");
        handler.add_company(name, desc, email, country, cep, cpf_cnpj, password, skills);
        window.location.href = './login.html';
    }
    else {
        let errorElem = document.getElementById("error");
        let errorPossibilities = [validName, validDesc, validEmail, validCountry, validCep, validCpf_cnpj, validPassword, validSkills];
        errorElem.style.display = 'inline';
        errorElem.innerHTML = `Invalid ${whichInvalid(errorPossibilities)}`;
    }
});
