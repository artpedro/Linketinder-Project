class Job {
    matches: string[]
    constructor(public title:string,public owner:string, public desc:string, public skills:string[], public country:string, hardMatches:string[]=['placeholder','teste']) {
        this.matches = hardMatches
    }
    
    toJobEntry():jobEntry{
        return new Map<string,string|string[]>([['title',this.title],['owner',this.owner],['desc',this.desc],['country',this.country],['skills',this.skills],['matches',this.matches]])
    }
}