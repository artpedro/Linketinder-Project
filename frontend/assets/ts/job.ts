class Job {
    matches: string[]
    constructor(public title:string,public owner:string, public desc:string, public skills:string[], public country:string, hardMatches:string[]=[]) {
        this.matches = hardMatches
    }
    
    toJobEntry():jobEntry{
        return new Map<string,string|string[]>([['title',this.title],['desc',this.desc],['country',this.country],['skills',this.skills]])
    }
}