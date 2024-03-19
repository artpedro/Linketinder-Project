"use strict";
function logEntryToCandidate(log) {
    return new Candidate(log.entry.get('name'), log.entry.get('desc'), log.entry.get('email'), log.entry.get('country'), log.entry.get('cep'), log.entry.get('cpf_cnpj'), log.entry.get('age'), log.entry.get('password'), log.entry.get('skills_str'), log.entry.get('matches'));
}
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
