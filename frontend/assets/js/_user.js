"use strict";
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
