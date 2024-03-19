"use strict";
class Job {
    constructor(title, owner, desc, skills, country, hardMatches = []) {
        this.title = title;
        this.owner = owner;
        this.desc = desc;
        this.skills = skills;
        this.country = country;
        this.matches = hardMatches;
    }
    toJobEntry() {
        return new Map([['title', this.title], ['desc', this.desc], ['country', this.country], ['skills', this.skills]]);
    }
}
