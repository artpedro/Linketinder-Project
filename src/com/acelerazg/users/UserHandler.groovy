package com.acelerazg.users

import com.acelerazg.cli_app.TextColors
import static com.acelerazg.cli_app.InputCLI.command

class UserHandler {
    def newUser(Map users) {
        println "You want to add a new Company or a new Candidate?"+
                TextColors.ANSI_YELLOW_BACKGROUND +"[Company]"+TextColors.ANSI_RESET+
                TextColors.ANSI_CYAN_BACKGROUND + "[Candidate]" + TextColors.ANSI_RESET+ "\n> "
        String command = getCommand()
        switch (command) {
            case ("company"):
                users["company"] << new Company(buildUser())
                    break
            case ("candidate"):
                users["candidate"] << new Candidate(buildUser(true))
                    break
            default: println "Invalid user"
        }
        users
    }
    def buildUser(boolean candidate = false) {
        def new_user = [:]

        def fields = ["name", "desc", "email", "country", "CEP", "CPF_CNPJ"]
        if (candidate) fields.add("age")

        fields.forEach { field ->
            println "Insert ${field}:\n> "
            new_user[field] = getCommand()
        }
        if (candidate) new_user["age"] = new_user["age"].toInteger()
        new_user
    }
}
