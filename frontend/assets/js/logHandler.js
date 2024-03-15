"use strict";
function mapToObject(map) {
    const out = {};
    for (const [key, value] of map) {
        out[key] = value instanceof Map ? mapToObject(value) : value;
    }
    return out;
}
const objectToUsersLog = (obj) => {
    const map = new Map();
    Object.keys(obj).forEach(key => {
        if (key === 'candidates' || key === 'company') {
            const userCategory = key;
            const innerMap = new Map();
            Object.entries(obj[key]).forEach(([innerKey, innerValue]) => {
                innerMap.set(innerKey, new Map(Object.entries(innerValue)));
            });
            map.set(userCategory, innerMap);
        }
    });
    return map;
};
class logHandler {
    constructor() {
        const allUsersFromLocal = localStorage.getItem('all_users');
        const allLoginFromLocal = localStorage.getItem('all_login');
        if (allUsersFromLocal === null && allLoginFromLocal === null) {
            this.current_log = new Map([
                ['candidates', new Map([
                        ['candidate@example.com', new Map([
                                ['name', 'Candidate Name'],
                                ['country', 'Exampleland'],
                                ['email', 'candidate@example.com'],
                                ['desc', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque veniam cum dolorem asperiores accusamus sapiente corporis maiores dolores! Cupiditate aspernatur iusto, corporis dolore sed consequuntur provident hic laboriosam? Recusandae, reprehenderit.'],
                                ['cep', '12345-678'],
                                ['cpf_cnpj', '111.222.333-44'],
                                ['password', 'candidatePassword123'],
                                ['skills_str', 'TypeScript, JavaScript'],
                                ['matches', 'company@example.com,company2@example.com,company4@example.com,company5@example.com']
                            ])]
                    ])],
                ['company', new Map([
                        ['company@example.com', new Map([
                                ['name', 'Company Name1'],
                                ['country', 'Corporateland'],
                                ['email', 'contact@company.example.com'],
                                ['desc', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque veniam cum dolorem asperiores accusamus sapiente corporis maiores dolores! Cupiditate aspernatur iusto, corporis dolore sed consequuntur provident hic laboriosam? Recusandae, reprehenderit.'],
                                ['cep', '98765-432'],
                                ['cpf_cnpj', '999.888.777/0001-66'],
                                ['password', 'securePassword456'],
                                ['skills_str', 'Innovation, Development'],
                                ['matches', 'candidate@example.com']
                            ])],
                        ['company2@example.com', new Map([
                                ['name', 'Company Name2'],
                                ['country', 'Corporateland'],
                                ['email', 'contact@company.example.com'],
                                ['desc', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque veniam cum dolorem asperiores accusamus sapiente corporis maiores dolores! Cupiditate aspernatur iusto, corporis dolore sed consequuntur provident hic laboriosam? Recusandae, reprehenderit.'],
                                ['cep', '98765-432'],
                                ['cpf_cnpj', '999.888.777/0001-66'],
                                ['password', 'securePassword456'],
                                ['skills_str', 'Innovation, Development'],
                                ['matches', 'candidate@example.com']
                            ])
                        ],
                        ['company3@example.com', new Map([
                                ['name', 'Company Name3'],
                                ['country', 'Corporateland'],
                                ['email', 'contact@company.example.com'],
                                ['cep', '98765-432'],
                                ['desc', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque veniam cum dolorem asperiores accusamus sapiente corporis maiores dolores! Cupiditate aspernatur iusto, corporis dolore sed consequuntur provident hic laboriosam? Recusandae, reprehenderit.'],
                                ['cpf_cnpj', '999.888.777/0001-66'],
                                ['password', 'securePassword456'],
                                ['skills_str', 'Innovation, Development'],
                                ['matches', '']
                            ])
                        ],
                        ['company4@example.com', new Map([
                                ['name', 'Company Name4'],
                                ['country', 'Corporateland'],
                                ['email', 'contact@company.example.com'],
                                ['cep', '98765-432'],
                                ['cpf_cnpj', '999.888.777/0001-66'],
                                ['password', 'securePassword456'],
                                ['desc', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque veniam cum dolorem asperiores accusamus sapiente corporis maiores dolores! Cupiditate aspernatur iusto, corporis dolore sed consequuntur provident hic laboriosam? Recusandae, reprehenderit.'],
                                ['skills_str', 'Innovation, Development'],
                                ['matches', 'candidate@example.com']
                            ])
                        ],
                        ['company5@example.com', new Map([
                                ['name', 'Company Name5'],
                                ['country', 'Corporateland'],
                                ['email', 'contact@company.example.com'],
                                ['cep', '98765-432'],
                                ['desc', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque veniam cum dolorem asperiores accusamus sapiente corporis maiores dolores! Cupiditate aspernatur iusto, corporis dolore sed consequuntur provident hic laboriosam? Recusandae, reprehenderit.'],
                                ['cpf_cnpj', '999.888.777/0001-66'],
                                ['password', 'securePassword456'],
                                ['skills_str', 'JavaScript, Java, Typescript'],
                                ['matches', 'candidate@example.com']
                            ])
                        ]
                    ])]
            ]);
            this.login_log = new Map([['company@example.com', 'securePassword456'], ['company2@example.com', 'securePassword456'], ['company3@example.com', 'securePassword456'], ['company4@example.com', 'securePassword456'], ['company5@example.com', 'securePassword456'], ['candidate@example.com', 'candidatePassword123']]);
            console.log(typeof this.login_log);
            console.log(this.current_log, 'on constructor');
            this.saveLog();
        }
        else {
            console.log('on constructor but in else');
            this.login_log = new Map(Object.entries(JSON.parse(allLoginFromLocal)));
            this.current_log = objectToUsersLog(JSON.parse(allUsersFromLocal));
            this.saveLog();
        }
    }
    saveLog(newLog = this.current_log, loginLog = this.login_log) {
        const logObject = mapToObject(newLog);
        const logToString = JSON.stringify(logObject);
        const loginObject = mapToObject(loginLog);
        const loginToString = JSON.stringify(loginObject);
        localStorage.setItem('all_users', logToString);
        localStorage.setItem('all_login', loginToString);
    }
    addToLog(user) {
        const userEntry = user.toLogEntry();
        const logType = user instanceof Candidate ? 'candidates' : 'company';
        console.log("in add to log: ", userEntry, logType);
        let userLog = this.current_log.get(logType);
        if (!userLog) {
            console.log('inside !userlog');
            userLog = new Map();
            this.current_log.set(logType, userLog);
        }
        userLog.set(userEntry.email, userEntry.entry);
        let email = user.email;
        let password = user.password;
        this.login_log.set(email, password);
        this.saveLog(); // Persist changes
    }
}
