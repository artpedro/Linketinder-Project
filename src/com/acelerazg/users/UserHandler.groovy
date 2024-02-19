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
        def new_user = ["skills":[],"likes":[]]

        def fields = ["name", "desc", "email", "country", "CEP", "CPF_CNPJ"]
        if (candidate) fields.add("age")

        fields.forEach { field ->
            println "Insert ${field}:"
            new_user[field] = getCommand()
        }
        if (candidate) new_user["age"] = new_user["age"].toInteger()
        while (true) {
            println "Want to insert a new skill? [y] [n]"
            String answer = getCommand()
            if (answer != "yes" && answer != "y") break
            if (candidate) println "Insert a skill: "
            else println "Insert a desired skill"
            new_user["skills"] << getCommand()
        }
        println "Creating user"
        new_user
    }
}
