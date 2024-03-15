"use strict";
class Candidate extends User {
    constructor(name, desc, email, country, cep, cpf_cnpj, age, password, skills_str, matches) {
        super(name, desc, email, country, cep, cpf_cnpj, password, skills_str, matches);
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
