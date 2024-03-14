abstract class User {
    private skills: Array<string>
    constructor(public name:string,
                public desc:string,
                public email:string,
                public country:string,
                public cep:string,
                public cpf_cpnj:string,
                public password:string,
                public skills_str:string) {
    this.skills = skills_str.split(',')
    }
    
    abstract toLogEntry():logEntry
}

