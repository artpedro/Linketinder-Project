class userHandler extends logHandler {

    add_company(name:string,
        desc:string,
        email:string,
        country:string,
        cep:string,
        cpf_cnpj:string,
        password:string,
        skills_str:string){
            let new_company = new Company(name,desc,email,country,cep,cpf_cnpj,password,skills_str) 
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
            let new_candidate = new Candidate(name,desc,email,country,cep,cpf_cnpj,age,password,skills_str) 
            this.addToLog(new_candidate)
        }
}