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
                        ['alice.tech@example.com', new Map([
                                ['name', 'Alice Tech'],
                                ['country', 'Techtopia'],
                                ['email', 'alice.tech@example.com'],
                                ['desc', 'Passionate about Python and data analysis.'],
                                ['cep', '12345-678'],
                                ['age', '23'],
                                ['cpf_cnpj', '123.456.789-01'],
                                ['password', 'alicePassword123'],
                                ['skills_str', 'Python, Data Analysis'],
                                ['matches', 'innovatech@example.com,devstars@example.com']
                            ])],
                        ['bob.dev@example.com', new Map([
                                ['name', 'Bob Dev'],
                                ['country', 'Codeville'],
                                ['email', 'bob.dev@example.com'],
                                ['desc', 'Full-stack developer with a focus on JavaScript and React.'],
                                ['cep', '23456-789'],
                                ['age', '23'],
                                ['cpf_cnpj', '234.567.890-12'],
                                ['password', 'bobPassword123'],
                                ['skills_str', 'JavaScript, React, Node.js'],
                                ['matches', 'webfronts@example.com']
                            ])],
                        ['charlie.web@example.com', new Map([
                                ['name', 'Charlie Web'],
                                ['country', 'Designland'],
                                ['email', 'charlie.web@example.com'],
                                ['desc', 'Front-end wizard specializing in React and web design.'],
                                ['cep', '34567-890'],
                                ['age', '23'],
                                ['cpf_cnpj', '345.678.901-23'],
                                ['password', 'charliePassword123'],
                                ['skills_str', 'React, CSS, HTML'],
                                ['matches', 'devstars@example.com,innovatech@example.com']
                            ])],
                        ['diana.code@example.com', new Map([
                                ['name', 'Diana Code'],
                                ['country', 'Codetopia'],
                                ['email', 'diana.code@example.com'],
                                ['desc', 'Backend specialist with a love for databases and server architecture.'],
                                ['cep', '45678-912'],
                                ['age', '23'],
                                ['cpf_cnpj', '456.789.012-34'],
                                ['password', 'dianaSecure123'],
                                ['skills_str', 'Node.js, MongoDB, SQL, Docker'],
                                ['matches', 'cloudtechs@example.com,datadynamics@example.com']
                            ])],
                        ['ethan.devops@example.com', new Map([
                                ['name', 'Ethan DevOps'],
                                ['country', 'Deployland'],
                                ['email', 'ethan.devops@example.com'],
                                ['desc', 'DevOps engineer focused on CI/CD pipelines and cloud infrastructure.'],
                                ['cep', '56789-012'],
                                ['age', '23'],
                                ['cpf_cnpj', '567.890.123-45'],
                                ['password', 'ethanOps456'],
                                ['skills_str', 'AWS, Kubernetes, Docker, Jenkins, Python,Tensorflow'],
                                ['matches', 'cloudtechs@example.com,innovatech@example.com,ainnovations@example.com']
                            ])],
                        ['fiona.frontend@example.com', new Map([
                                ['name', 'Fiona Frontend'],
                                ['country', 'UIdesign'],
                                ['email', 'fiona.frontend@example.com'],
                                ['desc', 'Creative UI/UX designer and developer, specializing in React and user experience.'],
                                ['cep', '67890-123'],
                                ['age', '23'],
                                ['cpf_cnpj', '678.901.234-56'],
                                ['password', 'fionaDesign789'],
                                ['skills_str', 'React, Figma, CSS, UI/UX Design'],
                                ['matches', 'webfronts@example.com,devstars@example.com,ainnovations@example.com']
                            ])], ['george.blockchain@example.com', new Map([
                                ['name', 'George Blockchain'],
                                ['country', 'Innovatia'],
                                ['email', 'george.blockchain@example.com'],
                                ['desc', 'Blockchain developer experienced in smart contracts and decentralized applications.'],
                                ['cep', '78901-234'],
                                ['age', '23'],
                                ['cpf_cnpj', '789.012.345-67'],
                                ['password', 'georgeBlock123'],
                                ['skills_str', 'Solidity, Ethereum, Smart Contracts'],
                                ['matches', 'blocknext@example.com,cryptoledge@example.com']
                            ])],
                        ['hannah.ai@example.com', new Map([
                                ['name', 'Hannah AI'],
                                ['country', 'Intellectia'],
                                ['email', 'hannah.ai@example.com'],
                                ['desc', 'AI researcher focused on neural networks and deep learning technologies.'],
                                ['cep', '89012-345'],
                                ['age', '23'],
                                ['cpf_cnpj', '890.123.456-78'],
                                ['password', 'hannahAI456'],
                                ['skills_str', 'Python, TensorFlow, Deep Learning, Machine Learning, Neural Networks'],
                                ['matches', 'datadynamics@example.com,ainnovations@example.com']
                            ])],
                        ['ivan.security@example.com', new Map([
                                ['name', 'Ivan Security'],
                                ['country', 'Safeland'],
                                ['email', 'ivan.security@example.com'],
                                ['desc', 'Cybersecurity expert with a knack for ethical hacking and system defense.'],
                                ['cep', '90123-456'],
                                ['age', '23'],
                                ['cpf_cnpj', '901.234.567-89'],
                                ['password', 'ivanSecure789'],
                                ['skills_str', 'Ethical Hacking, Cybersecurity, Network Defense'],
                                ['matches', 'cyberfront@example.com,securetechs@example.com']
                            ])],
                        ['julia.mobile@example.com', new Map([
                                ['name', 'Julia Mobile'],
                                ['country', 'Appville'],
                                ['email', 'julia.mobile@example.com'],
                                ['desc', 'Mobile developer skilled in creating engaging iOS and Android apps.'],
                                ['cep', '01234-567'],
                                ['age', '23'],
                                ['cpf_cnpj', '012.345.678-90'],
                                ['password', 'juliaAppDev'],
                                ['skills_str', 'Swift, Kotlin, Flutter'],
                                ['matches', 'appcrafter@example.com,mobileminds@example.com,datadynamics@example.com']
                            ])]
                    ])],
                ['company', new Map([
                        ['cloudtechs@example.com', new Map([
                                ['name', 'CloudTechs Solutions'],
                                ['country', 'Cloudscape'],
                                ['email', 'hr@cloudtechs.com'],
                                ['desc', 'Leading provider of cloud services and infrastructure.'],
                                ['cep', '99876-543'],
                                ['cpf_cnpj', '111.222.333/0004-44'],
                                ['password', 'cloudTechSecure'],
                                ['skills_str', 'AWS, Azure, Google Cloud, Kubernetes'],
                                ['matches', 'diana.code@example.com,ethan.devops@example.com']
                            ])],
                        ['datadynamics@example.com', new Map([
                                ['name', 'Data Dynamics'],
                                ['country', 'Dataville'],
                                ['email', 'info@datadynamics.com'],
                                ['desc', 'Data analytics and machine learning company transforming business intelligence.'],
                                ['cep', '88976-432'],
                                ['cpf_cnpj', '222.333.444/0005-55'],
                                ['password', 'dataDynamicsSecure'],
                                ['skills_str', 'Python, Machine Learning, Data Analysis, SQL'],
                                ['matches', 'alice.tech@example.com,diana.code@example.com,julia.mobile@example.com']
                            ])],
                        ['webfronts@example.com', new Map([
                                ['name', 'WebFronts Technologies'],
                                ['country', 'Designland'],
                                ['email', 'contact@webfronts.com'],
                                ['desc', 'Front-end development house crafting beautiful and responsive web applications.'],
                                ['cep', '77665-321'],
                                ['cpf_cnpj', '333.444.555/0006-66'],
                                ['password', 'webFronts123'],
                                ['skills_str', 'JavaScript, React, CSS, Web Design'],
                                ['matches', 'charlie.web@example.com,fiona.frontend@example.com']
                            ])],
                        ['innovatech@example.com', new Map([
                                ['name', 'InnovaTech'],
                                ['country', 'Innovatia'],
                                ['email', 'hr@innovatech.com'],
                                ['desc', 'Pioneering software solutions with cutting-edge technologies.'],
                                ['cep', '98765-432'],
                                ['cpf_cnpj', '999.888.777/0001-11'],
                                ['password', 'techInnovationsSecure'],
                                ['skills_str', 'Python, Scala, Cloud Computing'],
                                ['matches', 'alice.tech@example.com,charlie.web@example.com']
                            ])],
                        ['devstars@example.com', new Map([
                                ['name', 'DevStars Ltd.'],
                                ['country', 'Devland'],
                                ['email', 'contact@devstars.com'],
                                ['desc', 'We build amazing web experiences using JavaScript and React.'],
                                ['cep', '87654-321'],
                                ['cpf_cnpj', '888.777.666/0002-22'],
                                ['password', 'devStarsPassword'],
                                ['skills_str', 'JavaScript, React, Node.js'],
                                ['matches', 'bob.dev@example.com,charlie.web@example.com']
                            ])],
                        ['blocknext@example.com', new Map([
                                ['name', 'BlockNext Solutions'],
                                ['country', 'Cryptonia'],
                                ['email', 'info@blocknext.com'],
                                ['desc', 'Innovative blockchain solutions provider, specializing in custom blockchain development.'],
                                ['cep', '66554-321'],
                                ['cpf_cnpj', '444.555.666/0007-77'],
                                ['password', 'blockNextSecure'],
                                ['skills_str', 'Java, Blockchain, Solidity, DApps'],
                                ['matches', 'george.blockchain@example.com']
                            ])],
                        ['cryptoledge@example.com', new Map([
                                ['name', 'CryptoLedge'],
                                ['country', 'Ledgerville'],
                                ['email', 'contact@cryptoledge.com'],
                                ['desc', 'Leading the edge in cryptocurrency innovations and ledger technologies.'],
                                ['cep', '55443-210'],
                                ['cpf_cnpj', '555.666.777/0008-88'],
                                ['password', 'cryptoSecure'],
                                ['skills_str', 'Blockchain, Cryptography, Ethereum'],
                                ['matches', 'george.blockchain@example.com']
                            ])],
                        ['ainnovations@example.com', new Map([
                                ['name', 'AI Innovations Inc.'],
                                ['country', 'Techtopia'],
                                ['email', 'hr@aiinnovations.inc'],
                                ['desc', 'Frontiers of AI research and development, focusing on scalable AI solutions.'],
                                ['cep', '44332-109'],
                                ['cpf_cnpj', '666.777.888/0009-99'],
                                ['password', 'aiInnovations123'],
                                ['skills_str', 'Artificial Intelligence, Machine Learning, Neural Networks, Python'],
                                ['matches', 'hannah.ai@example.com,fiona.frontend@example.com,ethan.devops@example.com']
                            ])],
                        ['cyberfront@example.com', new Map([
                                ['name', 'CyberFront Technologies'],
                                ['country', 'Secureland'],
                                ['email', 'support@cyberfront.tech'],
                                ['desc', 'Cybersecurity firm providing cutting-edge security solutions to businesses worldwide.'],
                                ['cep', '33221-098'],
                                ['cpf_cnpj', '777.888.999/0010-00'],
                                ['password', 'cyberFrontSafe'],
                                ['skills_str', 'Cybersecurity, Network Security, Ethical Hacking, Python'],
                                ['matches', 'ivan.security@example.com']
                            ])]
                    ])]
            ]);
            this.login_log = new Map([
                ['innovatech@example.com', 'techInnovationsSecure'],
                ['devstars@example.com', 'devStarsPassword'],
                ['cloudtechs@example.com', 'cloudTechSecure'],
                ['datadynamics@example.com', 'dataDynamicsSecure'],
                ['webfronts@example.com', 'webFronts123'],
                ['blocknext@example.com', 'blockNextSecure'],
                ['cryptoledge@example.com', 'cryptoSecure'],
                ['ainnovations@example.com', 'aiInnovations123'],
                ['cyberfront@example.com', 'cyberFrontSafe'],
                ['appcrafter@example.com', 'appCraft123'],
                ['mobileminds@example.com', 'mobileMinds456'],
                ['alice.tech@example.com', 'alicePassword123'],
                ['bob.dev@example.com', 'bobPassword123'],
                ['charlie.web@example.com', 'charliePassword123'],
                ['diana.code@example.com', 'dianaSecure123'],
                ['ethan.devops@example.com', 'ethanOps456'],
                ['fiona.frontend@example.com', 'fionaDesign789'],
                ['george.blockchain@example.com', 'georgeBlock123'],
                ['hannah.ai@example.com', 'hannahAI456'],
                ['ivan.security@example.com', 'ivanSecure789'],
                ['julia.mobile@example.com', 'juliaAppDev']
            ]);
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
