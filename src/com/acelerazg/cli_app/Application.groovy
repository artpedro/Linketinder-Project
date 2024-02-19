package com.acelerazg.cli_app

import com.acelerazg.file_manager.UsersFileManager

UsersFileManager fileManager = new UsersFileManager()

def all_users = fileManager.readLog()
PrinterCLI.printMenu()
while (true) {
    PrinterCLI.askCommand()
    command = InputCLI.getCommand()
    if (command == "close") break
    switch (command) {
        case "view": // must show all users, separated by type
            break
        case "add": // must add a new user
            break
        case "update": // choose an user to update
            break
        case "like": // choose an user to like another
            break
        case "check": // check an user's likes and matches
            break
        default: println "Invalid command"
    }
}
PrinterCLI.printEnd()