package com.acelerazg.users

class Company implements User{

    Company(String name,desc,email,country,CEP,CPF_CNPJ, List skills) {
        this.name = name
        this.desc = desc
        this.email = email
        this.country = country
        this.CEP = CEP
        this.CPF_CNPJ = CPF_CNPJ
        this.skills = skills
    }
    Company(Map map) {
        this.name = map['name']
        this.desc = map['desc']
        this.email = map['email']
        this.country = map['country']
        this.CEP = map['CEP']
        this.CPF_CNPJ = map['CPF_CNPJ']
        this.skills = map['skills']
        this.likes = map['likes']
    }

    boolean equals(o) {
        if (this.is(o)) return true
        if (!(o instanceof Company)) return false

        Company company = (Company) o

        if (com_acelerazg_users_User__CEP != company.com_acelerazg_users_User__CEP) return false
        if (com_acelerazg_users_User__CPF_CNPJ != company.com_acelerazg_users_User__CPF_CNPJ) return false
        if (com_acelerazg_users_User__country != company.com_acelerazg_users_User__country) return false
        if (com_acelerazg_users_User__desc != company.com_acelerazg_users_User__desc) return false
        if (com_acelerazg_users_User__email != company.com_acelerazg_users_User__email) return false
        if (com_acelerazg_users_User__name != company.com_acelerazg_users_User__name) return false

        return true
    }

    int hashCode() {
        int result
        result = (com_acelerazg_users_User__name != null ? com_acelerazg_users_User__name.hashCode() : 0)
        result = 31 * result + (com_acelerazg_users_User__desc != null ? com_acelerazg_users_User__desc.hashCode() : 0)
        result = 31 * result + (com_acelerazg_users_User__email != null ? com_acelerazg_users_User__email.hashCode() : 0)
        result = 31 * result + (com_acelerazg_users_User__country != null ? com_acelerazg_users_User__country.hashCode() : 0)
        result = 31 * result + (com_acelerazg_users_User__CEP != null ? com_acelerazg_users_User__CEP.hashCode() : 0)
        result = 31 * result + (com_acelerazg_users_User__CPF_CNPJ != null ? com_acelerazg_users_User__CPF_CNPJ.hashCode() : 0)
        return result
    }

    @Override
    String toString() {
        "Company name: ${this.name}\n" +
        "Description: ${this.desc}\n" +
        "Info:" +
        "\n\tEmail: ${this.email}" +
        "\n\tCNPJ: ${this.CPF_CNPJ}" +
        "\n\tCountry: ${this.country}    CEP: ${this.CEP}" +
        "\n\tRequired_skills: ${this.skills}\n"
    }
}
