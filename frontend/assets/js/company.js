"use strict";
class Company extends User {
    constructor(name, desc, email, country, cep, cpf_cnpj, password, skills_str, matches) {
        super(name, desc, email, country, cep, cpf_cnpj, password, skills_str, matches);
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
    createNewJob(title, desc, skills, country) {
        const createdJob = new Job(title, this.email, desc, skills, country);
        return new Job(title, this.email, desc, skills, country);
    }
}
