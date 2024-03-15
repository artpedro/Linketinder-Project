"use strict";
document.addEventListener('DOMContentLoaded', function () {
    var _a, _b, _c, _d, _e;
    const handler = new userHandler();
    const userEmail = localStorage.getItem('current_user');
    const allUsers = objectToUsersLog(JSON.parse(localStorage.getItem('all_users')));
    if (!((_a = allUsers.get('candidates')) === null || _a === void 0 ? void 0 : _a.has(userEmail))) {
        window.location.href = './login.html';
    }
    const currentUser = (_b = allUsers.get('candidates')) === null || _b === void 0 ? void 0 : _b.get(userEmail);
    let nameField = document.getElementById('user-name');
    let emailField = document.getElementById('email');
    let bioField = document.getElementById('desc');
    let cpfField = document.getElementById('cpf-cnpj');
    let ageField = document.getElementById('age');
    let cepField = document.getElementById('cep');
    let countryField = document.getElementById('country');
    let skillsField = document.getElementById('skills');
    let firstNameField = document.getElementById('first-name');
    nameField.innerHTML = currentUser === null || currentUser === void 0 ? void 0 : currentUser.get('name');
    emailField.innerHTML = userEmail;
    bioField.innerHTML = currentUser === null || currentUser === void 0 ? void 0 : currentUser.get('desc');
    cpfField.innerHTML = 'CPF: ' + (currentUser === null || currentUser === void 0 ? void 0 : currentUser.get('cpf_cnpj'));
    ageField.innerHTML = 'Age: ' + (currentUser === null || currentUser === void 0 ? void 0 : currentUser.get('age'));
    cepField.innerHTML = 'CEP: ' + (currentUser === null || currentUser === void 0 ? void 0 : currentUser.get('cep'));
    countryField.innerHTML = 'Country: ' + (currentUser === null || currentUser === void 0 ? void 0 : currentUser.get('country'));
    skillsField.innerHTML = 'Skills: ' + (currentUser === null || currentUser === void 0 ? void 0 : currentUser.get('skills_str'));
    firstNameField.innerHTML = nameField.innerHTML.split(' ')[0];
    (_c = document.getElementById('delete-acc')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
        handler.removeUserByEmail(userEmail);
        localStorage.removeItem('current_user');
        window.location.href = './login.html';
    });
    (_d = document.getElementById('logout')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => {
        localStorage.removeItem('current_user');
        window.location.href = './login.html';
    });
    const jobList = document.getElementById('job-list');
    let userMatches = (_e = currentUser === null || currentUser === void 0 ? void 0 : currentUser.get('matches')) === null || _e === void 0 ? void 0 : _e.split(',');
    userMatches.forEach((match) => {
        var _a, _b, _c, _d, _e;
        let currentMatch = (_a = allUsers.get('company')) === null || _a === void 0 ? void 0 : _a.get(match);
        let skillsRequeried = (_c = (_b = currentMatch === null || currentMatch === void 0 ? void 0 : currentMatch.get('skills_str')) === null || _b === void 0 ? void 0 : _b.split(',').map(skill => skill.trim().toLowerCase())) !== null && _c !== void 0 ? _c : [''];
        let maximumScore = skillsRequeried === null || skillsRequeried === void 0 ? void 0 : skillsRequeried.length;
        let score = 100;
        if (!(maximumScore === 0)) {
            let userSkills = (_e = (_d = currentUser === null || currentUser === void 0 ? void 0 : currentUser.get('skills_str')) === null || _d === void 0 ? void 0 : _d.split(",").map(skills => skills.trim().toLowerCase())) !== null && _e !== void 0 ? _e : [''];
            let overlapSkills = skillsRequeried === null || skillsRequeried === void 0 ? void 0 : skillsRequeried.filter(item => userSkills === null || userSkills === void 0 ? void 0 : userSkills.includes(item)).length;
            score = ((overlapSkills / maximumScore) * 100);
        }
        jobList.innerHTML += "<div class='card job w-100'>" +
            "<div class='card-body'>" +
            `<h5 class='card-title'>${currentMatch === null || currentMatch === void 0 ? void 0 : currentMatch.get('name')}</h5>` +
            `<p class='card-text'>${currentMatch === null || currentMatch === void 0 ? void 0 : currentMatch.get('desc')}</p>` +
            `<p class='card-text'>Required skills: ${currentMatch === null || currentMatch === void 0 ? void 0 : currentMatch.get('skills_str')} </p>` +
            `<p class='card-text'> Your affinity score: ${score.toFixed(2)}% </p>` +
            "<a href='#' class='btn'>View job</a>" +
            "</div>" +
            "</div>";
    });
});
