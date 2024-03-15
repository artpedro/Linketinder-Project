type logEntry = {
    email : string,
    entry : Map<string,string>
}
type UserInfo = Map<string, string>;
type UserCategory = 'candidates' | 'company';
type UsersLog = Map<UserCategory, Map<string, UserInfo>>;

function mapToObject<T>(map: Map<string, T>): {[key: string]: T | any} {
    const out: {[key: string]: T | any} = {};
    for (const [key, value] of map) {
        out[key] = value instanceof Map ? mapToObject(value as unknown as Map<string, any>) : value;
    }
    return out;
}

const objectToUsersLog = (obj: any): UsersLog => {
    const map: UsersLog = new Map<UserCategory, Map<string, UserInfo>>();

    Object.keys(obj).forEach(key => {
        if (key === 'candidates' || key === 'company') {
            const userCategory: UserCategory = key as UserCategory;
            const innerMap: Map<string, UserInfo> = new Map<string, UserInfo>();

            Object.entries(obj[key]).forEach(([innerKey, innerValue]) => {
                innerMap.set(innerKey, new Map(Object.entries(innerValue as Record<string, string>)));
            });

            map.set(userCategory, innerMap);
        }
    });

    return map;
};

class logHandler {
    public current_log: UsersLog
    public login_log: Map<string,string>
    constructor() {
        const allUsersFromLocal: string | null = localStorage.getItem('all_users')
        const allLoginFromLocal: string | null = localStorage.getItem('all_login')
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
                        ['matches','company@example.com,company2@example.com,company4@example.com,company5@example.com']
                    ])]
                ])],
                ['company', new Map([
                    ['company@example.com', new Map([
                        ['name', 'Company Name1'],
                        ['country', 'Corporateland'],
                        ['email', 'contact@company.example.com'],
                        ['desc','Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque veniam cum dolorem asperiores accusamus sapiente corporis maiores dolores! Cupiditate aspernatur iusto, corporis dolore sed consequuntur provident hic laboriosam? Recusandae, reprehenderit.'],
                        ['cep', '98765-432'],
                        ['cpf_cnpj', '999.888.777/0001-66'],
                        ['password', 'securePassword456'],
                        ['skills_str', 'Innovation, Development'],
                        ['matches','candidate@example.com']
                    ])],
                    ['company2@example.com', new Map([
                            ['name', 'Company Name2'],
                            ['country', 'Corporateland'],
                            ['email', 'contact@company.example.com'],
                            ['desc','Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque veniam cum dolorem asperiores accusamus sapiente corporis maiores dolores! Cupiditate aspernatur iusto, corporis dolore sed consequuntur provident hic laboriosam? Recusandae, reprehenderit.'],
                            ['cep', '98765-432'],
                            ['cpf_cnpj', '999.888.777/0001-66'],
                            ['password', 'securePassword456'],
                            ['skills_str', 'Innovation, Development'],
                            ['matches','candidate@example.com']
                        ])
                    ],
                    ['company3@example.com', new Map([
                        ['name', 'Company Name3'],
                        ['country', 'Corporateland'],
                        ['email', 'contact@company.example.com'],
                        ['cep', '98765-432'],
                        ['desc','Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque veniam cum dolorem asperiores accusamus sapiente corporis maiores dolores! Cupiditate aspernatur iusto, corporis dolore sed consequuntur provident hic laboriosam? Recusandae, reprehenderit.'],
                        ['cpf_cnpj', '999.888.777/0001-66'],
                        ['password', 'securePassword456'],
                        ['skills_str', 'Innovation, Development'],
                        ['matches','']
                    ])
                   ],
                    ['company4@example.com', new Map([
                        ['name', 'Company Name4'],
                        ['country', 'Corporateland'],
                        ['email', 'contact@company.example.com'],
                        ['cep', '98765-432'],
                        ['cpf_cnpj', '999.888.777/0001-66'],
                        ['password', 'securePassword456'],
                        ['desc','Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque veniam cum dolorem asperiores accusamus sapiente corporis maiores dolores! Cupiditate aspernatur iusto, corporis dolore sed consequuntur provident hic laboriosam? Recusandae, reprehenderit.'],
                        ['skills_str', 'Innovation, Development'],
                        ['matches','candidate@example.com']
                    ])
                    ],
                    ['company5@example.com', new Map([
                        ['name', 'Company Name5'],
                        ['country', 'Corporateland'],
                        ['email', 'contact@company.example.com'],
                        ['cep', '98765-432'],
                        ['desc','Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque veniam cum dolorem asperiores accusamus sapiente corporis maiores dolores! Cupiditate aspernatur iusto, corporis dolore sed consequuntur provident hic laboriosam? Recusandae, reprehenderit.'],
                        ['cpf_cnpj', '999.888.777/0001-66'],
                        ['password', 'securePassword456'],
                        ['skills_str', 'JavaScript, Java, Typescript'],
                        ['matches','candidate@example.com']
                    ])
                   ]
                ])]
            ])
            this.login_log = new Map([['company@example.com','securePassword456'],['company2@example.com','securePassword456'],['company3@example.com','securePassword456'],['company4@example.com','securePassword456'],['company5@example.com','securePassword456'],['candidate@example.com','candidatePassword123']])
            console.log(typeof this.login_log);
            
            console.log(this.current_log, 'on constructor')
            this.saveLog()
        } else {
            console.log('on constructor but in else');
            this.login_log = new Map<string,string>(Object.entries(JSON.parse(allLoginFromLocal as string)))
            this.current_log = objectToUsersLog(JSON.parse(allUsersFromLocal as string))

            this.saveLog()
        }
    }

    saveLog(newLog: UsersLog = this.current_log, loginLog = this.login_log): void {      
        const logObject:Object = mapToObject(newLog)  

        const logToString: string = JSON.stringify(logObject);

        const loginObject: Object = mapToObject(loginLog)

        const loginToString: string = JSON.stringify(loginObject)
        
        localStorage.setItem('all_users', logToString);
        localStorage.setItem('all_login', loginToString)
    }

    addToLog(user: Candidate | Company) {
        const userEntry: logEntry = user.toLogEntry();
        const logType = user instanceof Candidate ? 'candidates' : 'company';

        console.log("in add to log: ",userEntry,logType);
        
        let userLog = this.current_log.get(logType);
        
        if (!userLog) {
            console.log('inside !userlog');
            
            userLog = new Map<string, Map<string, string>>();
            this.current_log.set(logType, userLog);
        }
        userLog.set(userEntry.email, userEntry.entry);
        let email:string = user.email
        let password:string = user.password

        this.login_log.set(email, password)

        this.saveLog(); // Persist changes
    }
}