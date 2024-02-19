package com.acelerazg.users

class Company implements User{

    Company(String name,desc,email,country,CEP,CPF_CNPJ) {
        this.name = name
        this.desc = desc
        this.email = email
        this.country = country
        this.CEP = CEP
        this.CPF_CNPJ = CPF_CNPJ
    }
    Company(Map map) {
        this.name = map['name']
        this.desc = map['desc']
        this.email = map['email']
        this.country = map['country']
        this.CEP = map['CEP']
        this.CPF_CNPJ = map['CPF_CNPJ']
    }

    @Override
    String toString() {
        "Company name: ${this.name}\n" +
        "Description: ${this.desc}\n" +
        "Info:" +
        "\n\tEmail: ${this.email}" +
        "\n\tCNPJ: ${this.CPF_CNPJ}" +
        "\n\tCountry: ${this.country}    CEP: ${this.CEP}\n"
    }
}
