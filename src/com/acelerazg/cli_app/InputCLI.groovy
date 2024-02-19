package com.acelerazg.cli_app

class InputCLI {
    static String getCommand() {
        System.in.newReader().readLine().toLowerCase()
    }
}
