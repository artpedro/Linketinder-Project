document.getElementById('login')?.addEventListener('submit', function (this: HTMLFormElement, event: Event): void {
    event.preventDefault()
    let formData: FormData = new FormData(this)

    let formDataMap: Map<string, string> = new Map();
    
    for (const [key,value] of formData.entries()) {
        formDataMap.set(key,value as string)
    }
   
    let logins: Record<string,string> = JSON.parse(localStorage.getItem('all_login') as string)
    let loginEmail: string = formDataMap.get('email') as string

    if (loginEmail as string in logins){
        let password = logins[loginEmail]
        if (formDataMap.get('password') === password) {
            localStorage.setItem('current_user',loginEmail)
            window.location.href = './candidate.html'
        } else {
            console.log('invalid password')
        }
    } 
})