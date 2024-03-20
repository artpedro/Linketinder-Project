document.addEventListener('DOMContentLoaded', () => {
    const checkbox: HTMLInputElement | null = document.getElementById('is-candidate') as HTMLInputElement
    const ageContainer: HTMLElement | null = document.getElementById('candidate-age')
    const skillsContainer: HTMLElement | null = document.getElementById('candidate-skills')
    checkbox?.addEventListener('change', () => {
        if (checkbox.checked) {
            ageContainer!.style.display = 'block'
            skillsContainer!.style.display = 'block'
        } else {
            ageContainer!.style.display = 'none'
            skillsContainer!.style.display = 'none'
        }
    })
    const init:logHandler = new logHandler()
})
function whichInvalid(checks:boolean[]):string {
    let order:string[] = ['name', 'bio', 'email', 'country', 'CEP', 'CPF or CNPJ' , 'password', 'skills', 'age']
    let index:number = checks.findIndex(check => !check)
    console.log(checks)
    console.log(index)
    if (index === -1) {
        return 'valid'
    } else {
        return order[index]
    }
}

document.getElementById('new-user')?.addEventListener('submit', function (this: HTMLFormElement, event: Event): void {
    event.preventDefault()
    const handler: userHandler = new userHandler()
    let formData: FormData = new FormData(this)

    let formDataMap: Map<string, string> = new Map();
    for (const [key,value] of formData.entries()) {
        formDataMap.set(key,value as string)
    }
    let isCandidate = formDataMap.has('candidate')
    const name:string = formDataMap.get('name') ?? ''
    const validName:boolean = fieldChecker.checkField('name',name)
    console.log(name,validName);
    
    const desc:string = formDataMap.get('bio')  ?? ''
    const validDesc:boolean = fieldChecker.checkField('desc',desc)
    const email:string = formDataMap.get('email') ?? ''
    const validEmail:boolean = fieldChecker.checkField('email',email)
    const country:string = formDataMap.get('country') ?? ''
    const validCountry:boolean = fieldChecker.checkField('country',country)
    const cep:string = formDataMap.get('cep') ?? ''
    const validCep:boolean = fieldChecker.checkField('cep',cep)
    const cpf_cnpj:string = formDataMap.get('cpf_cnpj') ?? ''
    const validCpf_cnpj:boolean = isCandidate? fieldChecker.checkField('cpf',cpf_cnpj) : fieldChecker.checkField('cnpj',cpf_cnpj)
    const password:string = formDataMap.get('password') ?? ''
    const validPassword:boolean = fieldChecker.checkField('password',password)
    const skills:string = formDataMap.get('skills') ?? ''
    const validSkills:boolean = fieldChecker.checkField('skills',skills)
    const age:string  = isCandidate? formDataMap.get('age') as string: '21'
    const validAge:boolean = fieldChecker.checkField('age',age)
    
    const validCredentials = validName && validDesc && validEmail && validCountry && validCep && validCpf_cnpj && validPassword && validSkills && validAge
    console.log(validCredentials)
    console.log(formDataMap)

    if (isCandidate && validCredentials) {
        console.log("new candidate created")
        handler.add_candidate(name,desc,email,country,cep,cpf_cnpj,password,skills,age)
        window.location.href = './login.html'
    }
    else if (validCredentials) {
        console.log("new company created")
        handler.add_company(name,desc,email,country,cep,cpf_cnpj,password,skills)
        window.location.href = './login.html'
    } else {
        let errorElem:HTMLElement = document.getElementById("error") as HTMLElement
        let errorPossibilities = [validName, validDesc, validEmail, validCountry, validCep, validCpf_cnpj, validPassword, validSkills]
        console.log(errorPossibilities)
        errorElem.style.display = 'inline'
        errorElem.innerHTML = `Invalid ${whichInvalid(errorPossibilities)}`
    }
    
})