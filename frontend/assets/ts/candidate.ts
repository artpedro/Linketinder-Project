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
                skills_str:string) {
        super(name,desc,email,country,cep,cpf_cnpj,password,skills_str)
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
