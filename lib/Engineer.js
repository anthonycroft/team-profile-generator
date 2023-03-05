// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

// * Engineer - extends `Employee`.   
// * In addition to `Employee`'s properties and methods, `Engineer` has the following:
// * `github`&mdash;GitHub username
// * `getGithub()`
// * `getRole()`&mdash;overridden to return `'Engineer'`

const Employee = require("./Employee.js");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        
        // ensure valid github username - type.
        if (typeof github !== "string" || !github.trim().length) {
          throw new Error("Expected parameter 'github' to be a non-empty string");
        }

        this.github = github;
    }

    getGithub() {
        return this.github;
    }

    getRole() {
        return "Engineer";
    }
}

module.exports = Engineer;