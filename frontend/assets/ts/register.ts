document.addEventListener('DOMContentLoaded', () => {
    const checkbox: HTMLInputElement | null = document.getElementById('is-candidate') as HTMLInputElement
    const formContainer: HTMLElement | null = document.getElementById('candidate-age')

    checkbox?.addEventListener('change', () => {
        if (checkbox.checked) {
            formContainer!.style.display = 'block'
        } else {
            formContainer!.style.display = 'none'
        }
    })

    const init:logHandler = new logHandler()
})

document.getElementById('new-user')?.addEventListener('submit', function (this: HTMLFormElement, event: Event): void {
    event.preventDefault()
    const handler: userHandler = new userHandler()
    let formData: FormData = new FormData(this)

    let formDataMap: Map<string, string> = new Map();
    for (const [key,value] of formData.entries()) {
        formDataMap.set(key,value as string)
    }
    const name:string = formDataMap.get('name') ?? ''
    const desc:string = formDataMap.get('bio')  ?? ''
    const email:string = formDataMap.get('email') ?? ''
    const country:string = formDataMap.get('country') ?? ''
    const cep:string = formDataMap.get('cep') ?? ''
    const cpf_cnpj:string = formDataMap.get('cpf_cnpj') ?? ''
    const password:string = formDataMap.get('password') ?? ''
    const skills:string = formDataMap.get('skills') ?? ''
    
    console.log(formDataMap)
    if (formDataMap.has('candidate')) {
        console.log("new candidate created")
        const age: string = formDataMap.get('age') ?? ''
        handler.add_candidate(name,desc,email,country,cep,cpf_cnpj,password,skills,age)
    }
    else {
        console.log("new company created")
        handler.add_company(name,desc,email,country,cep,cpf_cnpj,password,skills)
    }
    window.location.href = './login.html'
})