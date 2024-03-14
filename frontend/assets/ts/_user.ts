function logEntryToCandidate(log:logEntry) {
    return new Candidate(log.entry.get('name') as string,
                        log.entry.get('desc') as string,
                        log.entry.get('email') as string,
                        log.entry.get('country') as string,
                        log.entry.get('cep') as string,
                        log.entry.get('cpf_cnpj') as string,
                        log.entry.get('age') as string,
                        log.entry.get('password') as string,
                        log.entry.get('skills_str') as string,
                        log.entry.get('matches') as string
                        )
}

abstract class User {
    private skills: Array<string>
    constructor(public name:string,
                public desc:string,
                public email:string,
                public country:string,
                public cep:string,
                public cpf_cpnj:string,
                public password:string,
                public skills_str:string,
                public matches:string = '') {
    this.skills = skills_str.split(',')
    }
    
    abstract toLogEntry():logEntry
}

