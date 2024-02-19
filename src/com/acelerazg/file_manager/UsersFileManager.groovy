package com.acelerazg.file_manager

import groovy.json.JsonBuilder
import groovy.json.JsonSlurper

class UsersFileManager {
    def path = "../../../log/users.json"
    def log = new File(path)

    def readLog() {
        if (log.exists()) {
            def json = new JsonSlurper()
            return json.parseText(log.text)
        }
        return [company:[:],candidates:[:]] // empty users
    }
    def writeLog(Map users) {
        log.createNewFile()
        def jsonString = new JsonBuilder(users).toPrettyString()
        log.withWriter {writer -> writer << jsonString}
    }
}
