// TODO: Write code to define and export the Employee class

// * `Employee` parent class has the following properties and methods:       
// * `name`
// * `id`
// * `email`
// * `getName()`
// * `getId()`
// * `getEmail()`
// * `getRole()`&mdash;returns `'Employee'`

class Employee {
    constructor(name, id, email) {
      // // ensure valid name - type.
      // if (typeof name !== "string" || !name.trim().length) {
      //   throw new Error("Expected parameter 'name' to be a non-empty string");
      // }

      // // ensure valid id - type.
      // id = parseInt(id);
      // if (typeof id !== "number" || isNaN(id) || id < 0) {
      //   throw new Error("Expected parameter 'id' to be a non-negative number");
      // }

      // // ensure valid email address - type.
      // if (typeof email !== "string" || !email.trim().length) {
      //   throw new Error("Expected parameter 'email' to be a non-empty string");
      // }

      // // ensure valid email address - format.
      // if (!email.includes("@")) {
      //   throw new Error("Expected parameter 'email' to be a valid email address");
      // }

        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return "Employee";
    }
}

module.exports = Employee;