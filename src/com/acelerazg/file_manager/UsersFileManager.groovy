package com.acelerazg.file_manager

import com.acelerazg.users.Candidate
import com.acelerazg.users.Company
import groovy.json.JsonBuilder
import groovy.json.JsonSlurper

class UsersFileManager {
    def path = "../../../../log/users.json"
    def log = new File(path)

    def readLog() {
        if (log.exists()) {
            def json = new JsonSlurper()
            Map users =json.parseText(log.text)
            def users_obj = [company:[],candidate:[]]
            users['candidate'].forEach { c ->
                users_obj["candidate"] << new Candidate(c)
            }
            users['company'].forEach { c ->
                users_obj["company"] << new Company(c)
            }
            return users_obj
        }
        log.createNewFile()
        [company:[],candidates:[]] // empty users
    }
    def writeLog(Map users) {
        log.createNewFile()
        def jsonString = new JsonBuilder(users).toPrettyString()
        log.withWriter {writer -> writer << jsonString}
    }
}
