// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

// * Manager - extends `Employee`.      
// * In addition to `Employee`'s properties and methods, `Manager` has the following:
//   * `officeNumber`
//   * `getRole()`&mdash;overridden to return `'Manager'`

const Employee = require("./Employee.js");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);

        this.officeNumber = officeNumber;
    }

    getOfficeNumber() {
      return this.officeNumber;
  }

    getRole() {
        return "Manager";
    }
}

module.exports = Manager;