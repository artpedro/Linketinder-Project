"use strict";
class Job {
    constructor(title, owner, desc, skills, country, hardMatches = ['placeholder', 'teste']) {
        this.title = title;
        this.owner = owner;
        this.desc = desc;
        this.skills = skills;
        this.country = country;
        this.matches = hardMatches;
    }
    toJobEntry() {
        return new Map([['title', this.title], ['owner', this.owner], ['desc', this.desc], ['country', this.country], ['skills', this.skills], ['matches', this.matches]]);
    }
}
