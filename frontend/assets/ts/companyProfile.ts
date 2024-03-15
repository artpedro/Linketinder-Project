

document.addEventListener('DOMContentLoaded', function () {
    const handler:userHandler = new userHandler()

    const userEmail: string = localStorage.getItem('current_user') as string
    const allUsers: UsersLog = objectToUsersLog(JSON.parse(localStorage.getItem('all_users') as string))
    
    if (!allUsers.get('company')?.has(userEmail)) {
        window.location.href = './login.html'
    }
    const currentUser = allUsers.get('company')?.get(userEmail)
    let nameField:HTMLElement = document.getElementById('user-name') as HTMLElement
    let emailField:HTMLElement = document.getElementById('email') as HTMLElement
    let bioField:HTMLElement = document.getElementById('desc') as HTMLElement
    let cpfField:HTMLElement = document.getElementById('cpf-cnpj') as HTMLElement
    let skillsField:HTMLElement = document.getElementById('skills') as HTMLElement
    let firstNameField:HTMLElement = document.getElementById('first-name') as HTMLElement

    nameField.innerHTML= currentUser?.get('name') as string
    emailField.innerHTML= userEmail
    bioField.innerHTML= currentUser?.get('desc') as string
    cpfField.innerHTML= 'CNPJ: ' + currentUser?.get('cpf_cnpj') as string
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

    const candidateList: HTMLElement = document.getElementById('job-list') as HTMLElement

    let userMatches: string[] = currentUser?.get('matches')?.split(',') as string[]
    let count: number = 1;
    let skillsRequeried:string[] = currentUser?.get('skills_str')?.split(",").map(skills=>skills.trim().toLowerCase()) ?? ['']
    let maximumScore:number = skillsRequeried?.length
    let countMatchesSkills = new Map<string,number>()
    userMatches.forEach((match)=>{
        let currentMatch = allUsers.get('candidates')?.get(match)   
        let score: number = 100
        if (!(maximumScore === 0)) {
            let userSkills: string[] = currentMatch?.get('skills_str')?.split(",").map(skills=>skills.trim().toLowerCase()) ?? ['']
            userSkills.forEach((skill)=>{
                if (countMatchesSkills.has(skill)) {
                    countMatchesSkills.set(skill, countMatchesSkills.get(skill) as number +1)
                } else {
                    countMatchesSkills.set(skill,1)
                }
            })
            let overlapSkills: number = skillsRequeried?.filter(item=> userSkills?.includes(item)).length 
            score = ((overlapSkills / maximumScore) * 100)
        }
        candidateList.innerHTML += "<div class='card job w-100'>" +
        "<div class='card-body'>" +
          `<h5 class='card-title'>Candidate ${count}</h5>` +
          `<p class='card-text'>${currentMatch?.get('desc')}</p>` +
          `<p class='card-text'>Candidate Skills: ${currentMatch?.get('skills_str')} </p>`+
          `<p class='card-text'> Affinity score: ${score.toFixed(2)}% </p>` +
          "<a href='#' class='btn'>View </a>" +
        "</div>" +
      "</div>"
      count++
    })

    // Extract the labels (programming languages) and data (counts) from the Map
const labels = Array.from(countMatchesSkills.keys())
const data = Array.from(countMatchesSkills.values())

// Configuration for the Chart.js histogram
const config = {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Candidate Skills Count',
            data: data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'white'
                }
            }
            x: {
                ticks:{
                    color: "white"
                }
            }
        }
    }
};

// Render the chart
const ctx = (document.getElementById('skill-graph') as HTMLCanvasElement).getContext('2d') ?? ''
// @ts-ignore
new Chart(ctx, config)
}
)