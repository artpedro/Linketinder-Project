class userHandler extends logHandler {
    default_matches = 'company@example.com'
    
    add_company(name:string,
        desc:string,
        email:string,
        country:string,
        cep:string,
        cpf_cnpj:string,
        password:string,
        skills_str:string){
            let new_company = new Company(name,desc,email,country,cep,cpf_cnpj,password,skills_str,this.default_matches) 
            this.addToLog(new_company)
        }

    add_candidate(name:string,
        desc:string,
        email:string,
        country:string,
        cep:string,
        cpf_cnpj:string,
        password:string,
        skills_str:string,
        age:string) {
            let new_candidate = new Candidate(name,desc,email,country,cep,cpf_cnpj,age,password,skills_str,this.default_matches) 
            this.addToLog(new_candidate)
        }

    removeUserByEmail(email:string) {
        this.current_log.get('candidates')?.delete(email)
        this.current_log.get('company')?.delete(email)
        this.login_log.delete(email)
        this.saveLog()
    }
}