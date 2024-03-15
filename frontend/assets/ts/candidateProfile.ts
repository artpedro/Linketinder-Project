document.addEventListener('DOMContentLoaded', function () {
    const handler:userHandler = new userHandler()

    const userEmail: string = localStorage.getItem('current_user') as string
    const allUsers: UsersLog = objectToUsersLog(JSON.parse(localStorage.getItem('all_users') as string))
    
    if (!allUsers.get('candidates')?.has(userEmail)) {
        window.location.href = './login.html'
    }
    const currentUser = allUsers.get('candidates')?.get(userEmail)
    let nameField:HTMLElement = document.getElementById('user-name') as HTMLElement
    let emailField:HTMLElement = document.getElementById('email') as HTMLElement
    let bioField:HTMLElement = document.getElementById('desc') as HTMLElement
    let cpfField:HTMLElement = document.getElementById('cpf-cnpj') as HTMLElement
    let ageField:HTMLElement = document.getElementById('age') as HTMLElement
    let skillsField:HTMLElement = document.getElementById('skills') as HTMLElement
    let firstNameField:HTMLElement = document.getElementById('first-name') as HTMLElement

    nameField.innerHTML= currentUser?.get('name') as string
    emailField.innerHTML= userEmail
    bioField.innerHTML= currentUser?.get('desc') as string
    cpfField.innerHTML= 'CPF: ' + currentUser?.get('cpf_cnpj') as string
    ageField.innerHTML= 'Age: ' + currentUser?.get('age') as string
    skillsField.innerHTML= 'Skills: ' + currentUser?.get('skills_str') as string
    firstNameField.innerHTML= nameField.innerHTML.split(' ')[0]

    document.getElementById('delete-acc')?.addEventListener('click',()=>{
        handler.removeUserByEmail(userEmail)
        localStorage.removeItem('current_user')
        window.location.href = './login.html'       
    })

    document.getElementById('logout')?.addEventListener('click',()=>{
        localStorage.removeItem('current_user')
        window.location.href = './login.html'
    })

    const jobList: HTMLElement = document.getElementById('job-list') as HTMLElement

    let userMatches: string[] = currentUser?.get('matches')?.split(',') as string[]
    userMatches.forEach((match)=>{
        let currentMatch = allUsers.get('company')?.get(match)

        let skillsRequeried:string[] = currentMatch?.get('skills_str')?.split(',').map(skill=>skill.trim().toLowerCase()) ?? ['']
        let maximumScore:number = skillsRequeried?.length
        let score: number = 100
        if (!(maximumScore === 0)) {
            let userSkills: string[] = currentUser?.get('skills_str')?.split(",").map(skills=>skills.trim().toLowerCase()) ?? ['']
        
            let overlapSkills: number = skillsRequeried?.filter(item=> userSkills?.includes(item)).length 
            score = ((overlapSkills / maximumScore) * 100)
        }
        jobList.innerHTML += "<div class='card job w-100'>" +
        "<div class='card-body'>" +
          `<h5 class='card-title'>${currentMatch?.get('name')}</h5>` +
          `<p class='card-text'>${currentMatch?.get('desc')}</p>` +
          `<p class='card-text'>Required skills: ${currentMatch?.get('skills_str')} </p>`+
          `<p class='card-text'> Your affinity score: ${score.toFixed(2)}% </p>` +
          "<a href='#' class='btn'>View job</a>" +
        "</div>" +
      "</div>"
    })
}
)