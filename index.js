const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the name of your project?",
    },
    {
      type: "input",
      name: "description",
      message: "Enter a description.",
    },
    {
      type: "input",
      name: "installation",
      message: "Enter installation instructions",
    },
    {
      type: "input",
      name: "usage",
      message: "Enter useage information.",
    },
    {
      type: "input",
      name: "contributer",
      message: "Enter contributers.",
    },
    {
      type: "list",
      name: "liscense",
      message: "Select a license.",
      choices: ["None", "MIT", "Apache 2.0", "GPLv3"],
    },
    {
      type: "input",
      name: "test",
      message: "List any test information.",
    },
    {
      type: "input",
      name: "email",
      message: "Enter your email.",
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub user name.",
    },
  ]);
}

function templateGenerator(answers) {
  return `
    ![GitHub](https://img.shields.io/badge/license-${answers.license}-green)
    
  # ${answers.title}
  ## Description
  ${answers.description}
  ## Table of Contents
  * [Installation](##Installation)
  * [Usage](##Usage)
  * [Contributers](##Contributers)
  * [License](##License)
  * [Tests](##Tests)
  * [Questions](##Questions)
  ## Installation
  ${answers.installation}
  ## Usage
  ${answers.usage}
  ## License
  This project uses the ${answers.license} license.
  ## Contributers
  ${answers.contributer}
  ## Tests
  ${answers.test}
  ## Questions
  If you have any questions or suggestions, please contact me here:
  [${answers.questions}](${answers.questions})`;
}

promptUser()
  .then((answers) => {
    const readme = templateGenerator(answers);
    console.log("Successfully wrote to README.md");

    return writeFileAsync("README.md", readme);
  })
  .catch(function (err) {
    console.log(err);
  });
