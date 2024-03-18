document.getElementById('login')?.addEventListener('submit', function (this: HTMLFormElement, event: Event): void {
    event.preventDefault()
    let formData: FormData = new FormData(this)

    let formDataMap: Map<string, string> = new Map();
    
    for (const [key,value] of formData.entries()) {
        formDataMap.set(key,value as string)
    }
   
    let logins: Record<string,string> = JSON.parse(localStorage.getItem('all_login') as string)
    let loginEmail: string = formDataMap.get('email') as string
    if (!(loginEmail as string in logins)) {
        console.log('Email inválido')
    } else {
        let password = logins[loginEmail]
        if (!(formDataMap.get('password') === password)) {
            console.log('Senha inválida')
        } else {
            localStorage.setItem('current_user',loginEmail)
            const allUsers: UsersLog = objectToUsersLog(JSON.parse(localStorage.getItem('all_users') as string))
            let allCompanies:string[] = Array.from(allUsers.get('company')?.keys() ?? [''])
            console.log(loginEmail)
            console.log(allCompanies)
            if (allCompanies.includes(loginEmail)) {
                window.location.href = './company.html'
            } else {
            window.location.href = './candidate.html'
            }
        }
    } 
})