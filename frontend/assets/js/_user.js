"use strict";
function logEntryToCandidate(log) {
    return new Candidate(log.entry.get('name'), log.entry.get('desc'), log.entry.get('email'), log.entry.get('country'), log.entry.get('cep'), log.entry.get('cpf_cnpj'), log.entry.get('age'), log.entry.get('password'), log.entry.get('skills_str'), log.entry.get('matches'));
}
class User {
    constructor(name, desc, email, country, cep, cpf_cnpj, password, skills_str, matches = '') {
        this.name = name;
        this.desc = desc;
        this.email = email;
        this.country = country;
        this.cep = cep;
        this.cpf_cnpj = cpf_cnpj;
        this.password = password;
        this.skills_str = skills_str;
        this.matches = matches;
        this.skills = skills_str.split(',');
    }
}
