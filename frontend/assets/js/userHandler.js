"use strict";
class userHandler extends logHandler {
    constructor() {
        super(...arguments);
        this.default_matches = 'company@example.com';
    }
    add_company(name, desc, email, country, cep, cpf_cnpj, password, skills_str) {
        let new_company = new Company(name, desc, email, country, cep, cpf_cnpj, password, skills_str, this.default_matches);
        this.addToLog(new_company);
    }
    add_candidate(name, desc, email, country, cep, cpf_cnpj, password, skills_str, age) {
        let new_candidate = new Candidate(name, desc, email, country, cep, cpf_cnpj, age, password, skills_str, this.default_matches);
        this.addToLog(new_candidate);
    }
    removeUserByEmail(email) {
        var _a, _b;
        (_a = this.current_log.get('candidates')) === null || _a === void 0 ? void 0 : _a.delete(email);
        (_b = this.current_log.get('company')) === null || _b === void 0 ? void 0 : _b.delete(email);
        this.login_log.delete(email);
        this.saveLog();
    }
}
