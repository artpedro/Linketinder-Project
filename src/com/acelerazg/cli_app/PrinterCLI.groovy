package com.acelerazg.cli_app

import com.acelerazg.users.Candidate
import com.acelerazg.users.Company

class PrinterCLI {
    def static askCommand() {
        println "Waiting for command to execute: "+
                TextColors.ANSI_GREEN_BACKGROUND + TextColors.ANSI_BLACK + "[New]" + TextColors.ANSI_RESET + " " +
                TextColors.ANSI_BLUE_BACKGROUND + TextColors.ANSI_BLACK + "[Check]" + TextColors.ANSI_RESET + " " +
                TextColors.ANSI_YELLOW_BACKGROUND + TextColors.ANSI_BLACK + "[View]" + TextColors.ANSI_RESET + " " +
                TextColors.ANSI_RED_BACKGROUND + TextColors.ANSI_BLACK + "[Like]" + TextColors.ANSI_RESET + " " +
                TextColors.ANSI_BLACK_BACKGROUND + TextColors.ANSI_WHITE + "[Close]" + TextColors.ANSI_RESET
    }

    def static viewUsers(Map users) {
        println "All companies: \n"
        users["company"].forEach {
            if (it) println it
        }
        println "All candidates: \n"
        users["candidate"].forEach {
            if (it) println it
        }
    }

    def static printMenu() {
        println TextColors.ANSI_RED+ TextColors.ANSI_BLACK_BACKGROUND + "888      d8b          888               888    d8b               888                  \n" +
                "888      Y8P          888               888    Y8P               888                  \n" +
                "888                   888               888                      888                  \n" +
                "888      888 88888b.  888  888  .d88b.  888888 888 88888b.   .d88888  .d88b.  888d888 \n" +
                "888      888 888 \"88b 888 .88P d8P  Y8b 888    888 888 \"88b d88\" 888 d8P  Y8b 888P\"   \n" +
                "888      888 888  888 888888K  88888888 888    888 888  888 888  888 88888888 888     \n" +
                "888      888 888  888 888 \"88b Y8b.     Y88b.  888 888  888 Y88b 888 Y8b.     888     \n" +
                "88888888 888 888  888 888  888  \"Y8888   \"Y888 888 888  888  \"Y88888  \"Y8888  888     \n" + TextColors.ANSI_RESET
                "                                                                                      \n" +
                "                                                                                      \n" +
                "                                                                                      "
    }

    def static printEnd() {
        println "Terminating Application..."

    }
}
