class Company extends User {

    constructor(name:string,
                desc:string,
                email:string,
                country:string,
                cep:string,
                cpf_cnpj:string,
                password:string,
                skills_str:string,
                matches:string) {
        super(name,desc,email,country,cep,cpf_cnpj,password,skills_str,matches)
    }
    toLogEntry():logEntry  {
        const attributesMap: Map<string,string> = new Map()
        
        Object.keys(this).forEach(key => {
            if (key !== 'email') {
                const value = this[key as keyof Company];
                if (typeof value === 'string' || typeof value === 'number') {
                    attributesMap.set(key, value.toString())
                }
            }
        })
        return {'email': this.email, 'entry': attributesMap}
    }
    createNewJob(title:string, desc:string,skills:string[],country:string):Job {
        const createdJob:Job = new Job(title,this.email,desc,skills,country)
        
        return new Job(title,this.email,desc,skills,country)
    }

}