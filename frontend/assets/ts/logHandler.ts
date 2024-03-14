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
        // Check if value is a Map and recursively convert it
        out[key] = value instanceof Map ? mapToObject(value) : value;
    }
    return out;
}

// Convert a plain object (including nested objects) back to a Map
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
    public current_log: UsersLog;

    constructor() {
        const fromLocal: string | null = localStorage.getItem('all_users');
        console.log(fromLocal);
        
        if (!fromLocal) {
            this.current_log = new Map([
                ['candidates', new Map([
                    ['candidate@example.com', new Map([
                        ['name', 'Candidate Name'],
                        ['cpf', '111.222.333-44'],
                        ['country', 'Exampleland'],
                        ['email', 'candidate@example.com'],
                        ['cep', '12345-678'],
                        ['cpf_cnpj', '111.222.333-44'],
                        ['password', 'candidatePassword123'],
                        ['skills', 'TypeScript, JavaScript']
                    ])]
                ])],
                ['company', new Map([
                    ['company@example.com', new Map([
                        ['name', 'Company Name'],
                        ['cpf', '555.666.777-88'],
                        ['country', 'Corporateland'],
                        ['email', 'contact@company.example.com'],
                        ['cep', '98765-432'],
                        ['cpf_cnpj', '999.888.777/0001-66'],
                        ['password', 'securePassword456'],
                        ['skills', 'Innovation, Development']
                    ])]
                ])]
            ]);
            console.log(this.current_log, 'on constructor')
            this.saveLog()
        } else {
            console.log('on constructor but in else');
            
            this.current_log = objectToUsersLog(JSON.parse(fromLocal))
        }
    }

    saveLog(newLog: UsersLog = this.current_log): void {        
        const log_to_string: string = JSON.stringify(mapToObject(newLog));
        console.log(log_to_string, "log to string")
        localStorage.setItem('all_users', log_to_string);
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

        this.saveLog(); // Persist changes
    }
}