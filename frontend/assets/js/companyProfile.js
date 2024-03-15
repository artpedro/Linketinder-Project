"use strict";
document.addEventListener('DOMContentLoaded', function () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const handler = new userHandler();
    const userEmail = localStorage.getItem('current_user');
    const allUsers = objectToUsersLog(JSON.parse(localStorage.getItem('all_users')));
    if (!((_a = allUsers.get('company')) === null || _a === void 0 ? void 0 : _a.has(userEmail))) {
        window.location.href = './login.html';
    }
    const currentUser = (_b = allUsers.get('company')) === null || _b === void 0 ? void 0 : _b.get(userEmail);
    let nameField = document.getElementById('user-name');
    let emailField = document.getElementById('email');
    let bioField = document.getElementById('desc');
    let cpfField = document.getElementById('cpf-cnpj');
    let cepField = document.getElementById('cep');
    let countryField = document.getElementById('country');
    let skillsField = document.getElementById('skills');
    let firstNameField = document.getElementById('first-name');
    nameField.innerHTML = currentUser === null || currentUser === void 0 ? void 0 : currentUser.get('name');
    emailField.innerHTML = userEmail;
    bioField.innerHTML = currentUser === null || currentUser === void 0 ? void 0 : currentUser.get('desc');
    cpfField.innerHTML = 'CNPJ: ' + (currentUser === null || currentUser === void 0 ? void 0 : currentUser.get('cpf_cnpj'));
    skillsField.innerHTML = 'Skills: ' + (currentUser === null || currentUser === void 0 ? void 0 : currentUser.get('skills_str'));
    cepField.innerHTML = 'CEP: ' + (currentUser === null || currentUser === void 0 ? void 0 : currentUser.get('cep'));
    countryField.innerHTML = 'Country: ' + (currentUser === null || currentUser === void 0 ? void 0 : currentUser.get('country'));
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
    const candidateList = document.getElementById('job-list');
    let userMatches = (_e = currentUser === null || currentUser === void 0 ? void 0 : currentUser.get('matches')) === null || _e === void 0 ? void 0 : _e.split(',');
    let count = 1;
    let skillsRequeried = (_g = (_f = currentUser === null || currentUser === void 0 ? void 0 : currentUser.get('skills_str')) === null || _f === void 0 ? void 0 : _f.split(",").map(skills => skills.trim().toLowerCase())) !== null && _g !== void 0 ? _g : [''];
    let maximumScore = skillsRequeried === null || skillsRequeried === void 0 ? void 0 : skillsRequeried.length;
    let countMatchesSkills = new Map();
    userMatches.forEach((match) => {
        var _a, _b, _c;
        let currentMatch = (_a = allUsers.get('candidates')) === null || _a === void 0 ? void 0 : _a.get(match);
        let score = 100;
        if (!(maximumScore === 0)) {
            let userSkills = (_c = (_b = currentMatch === null || currentMatch === void 0 ? void 0 : currentMatch.get('skills_str')) === null || _b === void 0 ? void 0 : _b.split(",").map(skills => skills.trim().toLowerCase())) !== null && _c !== void 0 ? _c : [''];
            userSkills.forEach((skill) => {
                if (countMatchesSkills.has(skill)) {
                    countMatchesSkills.set(skill, countMatchesSkills.get(skill) + 1);
                }
                else {
                    countMatchesSkills.set(skill, 1);
                }
            });
            let overlapSkills = skillsRequeried === null || skillsRequeried === void 0 ? void 0 : skillsRequeried.filter(item => userSkills === null || userSkills === void 0 ? void 0 : userSkills.includes(item)).length;
            score = ((overlapSkills / maximumScore) * 100);
        }
        candidateList.innerHTML += "<div class='card job w-100'>" +
            "<div class='card-body'>" +
            `<h5 class='card-title'>Candidate ${count}</h5>` +
            `<p class='card-text'>${currentMatch === null || currentMatch === void 0 ? void 0 : currentMatch.get('desc')}</p>` +
            `<p class='card-text'>Candidate Skills: ${currentMatch === null || currentMatch === void 0 ? void 0 : currentMatch.get('skills_str')} </p>` +
            `<p class='card-text'> Affinity score: ${score.toFixed(2)}% </p>` +
            "<a href='#' class='btn'>View </a>" +
            "</div>" +
            "</div>";
        count++;
    });
    // Extract the labels (programming languages) and data (counts) from the Map
    const labels = Array.from(countMatchesSkills.keys());
    const data = Array.from(countMatchesSkills.values());
    const combined = labels.map((label, index) => ({
        label,
        value: data[index]
    }));
    combined.sort((a, b) => a.value - b.value);
    const sortedLabels = combined.map(item => item.label);
    const sortedData = combined.map(item => item.value);
    console.log(sortedLabels);
    console.log(sortedData);
    const config = {
        type: 'bar',
        data: {
            labels: sortedLabels,
            datasets: [{
                    label: 'Candidate Skills Count',
                    data: sortedData,
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
                },
                x: {
                    ticks: {
                        color: "white"
                    }
                }
            }
        }
    };
    // Render the chart
    const ctx = (_h = document.getElementById('skill-graph').getContext('2d')) !== null && _h !== void 0 ? _h : '';
    // @ts-ignore
    new Chart(ctx, config);
});
