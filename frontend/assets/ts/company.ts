class Company extends User {

    constructor(name:string,
                desc:string,
                email:string,
                country:string,
                cep:string,
                cpf_cnpj:string,
                password:string,
                skills_str:string) {
        super(name,desc,email,country,cep,cpf_cnpj,password,skills_str)
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
}