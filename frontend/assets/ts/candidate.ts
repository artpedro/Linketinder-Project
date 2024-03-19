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

class Candidate extends User {
    age:string
    constructor(name:string,
                desc:string,
                email:string,
                country:string,
                cep:string,
                cpf_cnpj:string,
                age:string,
                password:string,
                skills_str:string,
                matches:string) {
        super(name,desc,email,country,cep,cpf_cnpj,password,skills_str,matches)
        this.age = age
    }
    toLogEntry():logEntry  {
        const attributesMap: Map<string,string> = new Map()
        
        Object.keys(this).forEach(key => {
            if (key !== 'email') {
                const value = this[key as keyof Candidate];
                if (typeof value === 'string' || typeof value === 'number') {
                    attributesMap.set(key, value.toString())
                }
            }
        })
        return {'email': this.email, 'entry': attributesMap}
    }
}
