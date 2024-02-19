package com.acelerazg.users

class Candidate implements User{
    int age

    Candidate(String name,desc,email,country, CEP, CPF_CNPJ, age) {
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
        this.skills = map['skills']
        this.likes = map['likes']
    }

    @Override
    String toString() {
        "Candidate name: ${this.name}\n" +
        "Description: ${this.desc}\n" +
        "Info:" +
        "\n\tAge: ${this.age}" +
        "\n\tEmail: ${this.email}" +
        "\n\tCNPJ: ${this.CPF_CNPJ}" +
        "\n\tCountry: ${this.country}    CEP: ${this.CEP}" +
        "\n\tSkills: ${this.skills}\n"
    }
}
