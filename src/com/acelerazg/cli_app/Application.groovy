package com.acelerazg.cli_app

import com.acelerazg.file_manager.UsersFileManager
// import com.acelerazg.users.MatchChecker
// import com.acelerazg.users.UserHandler

UsersFileManager fileManager = new UsersFileManager()
// UserHandler userHandler = new UserHandler()

def all_users = fileManager.readLog()

PrinterCLI.printMenu()
while (true) {
    PrinterCLI.askCommand()
    command = InputCLI.getCommand()
    if (command == "close") break
    switch (command) {
        case "view": // must show all users, separated by type
            PrinterCLI.viewUsers(all_users)
            break
        case "new": // must add a new user
        //    userHandler.newUser(all_users)
            break
        case "like": // choose an user to like another
        //    userHandler.liking()
            break
        case "check": // check an user's likes and matches
        //    MatchChecker matchChecker = new MatchChecker()
        //    matchChecker.checkMatch()
            break
        default: println "Invalid command"
    }
}
PrinterCLI.printEnd()