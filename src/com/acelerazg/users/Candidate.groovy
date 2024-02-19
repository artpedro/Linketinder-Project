package com.acelerazg.users

@groovy.transform.ToString
class Candidate implements User{
    int age

    Candidate(String name,desc,email,country,int CEP, CPF_CNPJ, age) {
        this.name = name
        this.desc = desc
        this.email = email
        this.country = country
        this.CEP = CEP
        this.CPF_CNPJ = CPF_CNPJ
        this.age = age
    }
    Candidate(Map map) {
        this.name = map['name']
        this.desc = map['desc']
        this.email = map['email']
        this.country = map['country']
        this.CEP = map['CEP']
        this.CPF_CNPJ = map['CPF_CNPJ']
        this.age = map['age']
    }

}
