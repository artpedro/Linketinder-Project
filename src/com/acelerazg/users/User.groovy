package com.acelerazg.users

trait User {
    String name, desc, email, country, CEP, CPF_CNPJ

    Set skills = []
    def likes = []

    default void like(User liked) {
        if (this.name in likes) println "This like already occurred"
        else this.likes << liked.name
    }
    default void setSkills(List new_skills) {
       new_skills.forEach {
           this.skills << it
       }
    }
}
