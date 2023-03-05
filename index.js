const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require('util');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const writeFileAsync = util.promisify(fs.writeFile);

// TODO: Write Code to gather information about the development team members, and render the HTML file.

// Create an empty array to store the team members
let teamMembers = [];

// Create a function to prompt the user for team member details
async function promptUser() {
  try {
    const manager = await addTeamMember('Manager');
    // console.log('Manager has been added!');
    let moreMembers = true;
    while (moreMembers) {
      const memberType = await inquirer.prompt([
        {
          type: 'list',
          name: 'memberType',
          message: 'Which type of team member would you like to add?',
          choices: ['Engineer', 'Intern', 'I don\'t want to add any more team members']
        }
      ]);

      if (memberType.memberType === 'I don\'t want to add any more team members') {
        moreMembers = false;
        console.log('Team roster is complete!')
        break;
      }

      const member = await addTeamMember(memberType.memberType);
    }
    return teamMembers;
  } catch (error) {
    console.log(`An error has occurred: ${error}`);
  }
}

// Add a team manager to the teamMembers array
async function addManager() {
// prompt user for manager details and add to team
 await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the manager\'s name?'
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is the manager\'s ID?'
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is the manager\'s email?'
    },
    {
      type: 'input',
      name: 'officeNumber',
      message: 'What is the manager\'s office number?'
    }
  ])
    .then(managerAnswers => {

    // Create a manager object and add it to the teamMembers array
    const teamManager = new Manager(
      managerAnswers.name,
      managerAnswers.id,
      managerAnswers.email,
      managerAnswers.officeNumber
    );
    teamMembers.push(teamManager)
    console.log(`${teamManager.getName()} has been added to the team.`);
  });
}

// Add an engineer to the teamMembers array
async function addEngineer() {
  // prompt user for engineer details and add to team
  await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the engineer\'s name?'
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is the engineer\'s ID?'
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is the engineer\'s email?'
    },
    {
      type: 'input',
      name: 'github',
      message: 'What is the engineer\'s GitHub username?'
    }
  ])
    .then(engineerAnswers => {

    // Create an engineer object and add it to the teamMembers array
    let teamEngineer = new Engineer(
      engineerAnswers.name,
      engineerAnswers.id,
      engineerAnswers.email,
      engineerAnswers.github
    );
    teamMembers.push(teamEngineer);
    console.log(`${teamEngineer.getName()} has been added to the team.`);
  });
}

// Add an intern to the teamMembers array
async function addIntern() {
  // prompt user for intern details and add to team
  await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the intern\'s name?',
      // validate entry
      validate: function(input) {
        if (isNaN(Number(input)) && typeof input === 'string' && input.trim().length !== 0) {
          return true;
        } else {
          return 'Please enter a valid name';
        }
      }
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is the intern\'s ID?',
      // validate entry
      validate: function(input) {
        const isValidNumber = !isNaN(Number(input));
        if (isValidNumber && input.trim().length !== 0) {
          return true;
        } else {
          return 'Please enter a valid ID number';
        }
      }
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is the intern\'s email?',
      // validate entry
      validate: function(input) {
        // validate email address
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(input)) {
          return true;
        } else {
          return 'Please enter a valid email address';
        }
      }
    },
    {
      type: 'input',
      name: 'school',
      message: 'What is the intern\'s school?'
    }
  ])
    .then(internAnswers => {

    // Create an intern object and add it to the teamMembers array
    let teamIntern = new Intern(
      internAnswers.name,
      internAnswers.id,
      internAnswers.email,
      internAnswers.school
    );
    teamMembers.push(teamIntern);
    console.log(`${teamIntern.getName()} has been added to the team.`);
  });
}

// controls which 'Add team member' function is called based on the user's selection in 'promptUser'
async function addTeamMember(teamMemberType) {
  if (teamMemberType === 'Manager') {
    await addManager();
  } else if (teamMemberType === 'Engineer') {
    await addEngineer();
  } else if (teamMemberType === 'Intern') {
    await addIntern();
  }
}

// initialise program
const init = async () => {
  console.log('hi');
  try {
    const answers = await promptUser();

    // Create the output directory if it doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    await writeFileAsync(outputPath, render(answers), 'utf8');

    console.log('Successfully wrote to team.html');
  } catch (err) {
    console.log(err);
  }
};

init();






