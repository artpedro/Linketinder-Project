package com.acelerazg.cli_app

import com.acelerazg.file_manager.UsersFileManager
import com.acelerazg.users.UserHandler

UsersFileManager fileManager = new UsersFileManager()
UserHandler userHandler = new UserHandler()

def all_users = fileManager.readLog()

PrinterCLI.printMenu()
while (true) {
    PrinterCLI.printBar()
    PrinterCLI.askCommand()
    command = InputCLI.getCommand()
    if (command == "close") break
    switch (command) {
        case "view": // must show all users, separated by type
            PrinterCLI.viewUsers(all_users)
            break
        case "new": // must add a new user
            all_users = userHandler.newUser(all_users)
            fileManager.writeLog(all_users)
            break
        case "like": // choose an user to like another
            userHandler.liking(all_users)
            fileManager.writeLog(all_users)
            break
        default: println "Invalid command"
    }
}
PrinterCLI.printEnd()