"use strict";
class User {
    constructor(name, desc, email, country, cep, cpf_cpnj, password, skills_str) {
        this.name = name;
        this.desc = desc;
        this.email = email;
        this.country = country;
        this.cep = cep;
        this.cpf_cpnj = cpf_cpnj;
        this.password = password;
        this.skills_str = skills_str;
        this.skills = skills_str.split(',');
    }
}
class Candidate extends User {
    constructor(name, desc, email, country, cep, cpf_cnpj, age, password, skills_str) {
        super(name, desc, email, country, cep, cpf_cnpj, password, skills_str);
        this.age = age;
    }
    toLogEntry() {
        const attributesMap = new Map();
        Object.keys(this).forEach(key => {
            if (key !== 'email') {
                const value = this[key];
                if (typeof value === 'string' || typeof value === 'number') {
                    attributesMap.set(key, value.toString());
                }
            }
        });
        return { 'email': this.email, 'entry': attributesMap };
    }
}
class Company extends User {
    constructor(name, desc, email, country, cep, cpf_cnpj, password, skills_str) {
        super(name, desc, email, country, cep, cpf_cnpj, password, skills_str);
    }
    toLogEntry() {
        const attributesMap = new Map();
        Object.keys(this).forEach(key => {
            if (key !== 'email') {
                const value = this[key];
                if (typeof value === 'string' || typeof value === 'number') {
                    attributesMap.set(key, value.toString());
                }
            }
        });
        return { 'email': this.email, 'entry': attributesMap };
    }
}
function mapToObject(map) {
    const out = {};
    for (const [key, value] of map) {
        out[key] = value instanceof Map ? mapToObject(value) : value;
    }
    return out;
}
const objectToUsersLog = (obj) => {
    const map = new Map();
    Object.keys(obj).forEach(key => {
        if (key === 'candidates' || key === 'company') {
            const userCategory = key;
            const innerMap = new Map();
            Object.entries(obj[key]).forEach(([innerKey, innerValue]) => {
                innerMap.set(innerKey, new Map(Object.entries(innerValue)));
            });
            map.set(userCategory, innerMap);
        }
    });
    return map;
};
class logHandler {
    constructor() {
        const allUsersFromLocal = localStorage.getItem('all_users');
        const allLoginFromLocal = localStorage.getItem('all_login');
        if (allUsersFromLocal === null && allLoginFromLocal === null) {
            this.current_log = new Map([
                ['candidates', new Map([
                        ['candidate@example.com', new Map([
                                ['name', 'Candidate Name'],
                                ['cpf', '111.222.333-44'],
                                ['country', 'Exampleland'],
                                ['email', 'candidate@example.com'],
                                ['cep', '12345-678'],
                                ['cpf_cnpj', '111.222.333-44'],
                                ['password', 'candidatePassword123'],
                                ['skills', 'TypeScript, JavaScript']
                            ])]
                    ])],
                ['company', new Map([
                        ['company@example.com', new Map([
                                ['name', 'Company Name'],
                                ['cpf', '555.666.777-88'],
                                ['country', 'Corporateland'],
                                ['email', 'contact@company.example.com'],
                                ['cep', '98765-432'],
                                ['cpf_cnpj', '999.888.777/0001-66'],
                                ['password', 'securePassword456'],
                                ['skills', 'Innovation, Development']
                            ])]
                    ])]
            ]);
            this.login_log = new Map([['company@example.com', 'securePassword456'], ['candidate@example.com', 'candidatePassword123']]);
            console.log(typeof this.login_log);
            console.log(this.current_log, 'on constructor');
            this.saveLog();
        }
        else {
            console.log('on constructor but in else');
            this.login_log = new Map(Object.entries(JSON.parse(allLoginFromLocal)));
            this.current_log = objectToUsersLog(JSON.parse(allUsersFromLocal));
            this.saveLog();
        }
    }
    saveLog(newLog = this.current_log, loginLog = this.login_log) {
        const logObject = mapToObject(newLog);
        const logToString = JSON.stringify(logObject);
        const loginObject = mapToObject(loginLog);
        const loginToString = JSON.stringify(loginObject);
        localStorage.setItem('all_users', logToString);
        localStorage.setItem('all_login', loginToString);
    }
    addToLog(user) {
        const userEntry = user.toLogEntry();
        const logType = user instanceof Candidate ? 'candidates' : 'company';
        console.log("in add to log: ", userEntry, logType);
        let userLog = this.current_log.get(logType);
        if (!userLog) {
            console.log('inside !userlog');
            userLog = new Map();
            this.current_log.set(logType, userLog);
        }
        userLog.set(userEntry.email, userEntry.entry);
        let email = user.email;
        let password = user.password;
        this.login_log.set(email, password);
        this.saveLog(); // Persist changes
    }
}
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
        }
        else {
            console.log('invalid password');
        }
    }
});
var _a;
document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('is-candidate');
    const formContainer = document.getElementById('candidate-age');
    checkbox === null || checkbox === void 0 ? void 0 : checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            formContainer.style.display = 'block';
        }
        else {
            formContainer.style.display = 'none';
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
class userHandler extends logHandler {
    add_company(name, desc, email, country, cep, cpf_cnpj, password, skills_str) {
        let new_company = new Company(name, desc, email, country, cep, cpf_cnpj, password, skills_str);
        this.addToLog(new_company);
    }
    add_candidate(name, desc, email, country, cep, cpf_cnpj, password, skills_str, age) {
        let new_candidate = new Candidate(name, desc, email, country, cep, cpf_cnpj, age, password, skills_str);
        this.addToLog(new_candidate);
    }
}
