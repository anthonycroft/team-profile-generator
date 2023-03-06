// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

// * Intern - extends `Employee`. 
// * In addition to `Employee`'s properties and methods, `Intern` has the following:
// * `school`
// * `getSchool()`
// * `getRole()`&mdash;overridden to return `'Intern'`

const Employee = require("./Employee.js");

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);

        this.school = school;
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return "Intern";
    }
}

module.exports = Intern;