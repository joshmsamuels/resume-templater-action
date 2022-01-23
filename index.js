const core = require('@actions/core')
const populateResume = require("./src/populate-resume")

try {
  const dataURL = core.getInput('resume-data-url')
  const templateURL = core.getInput('resume-template-url')

  populateResume.fillResume()
  .then(resume => core.setOutput("filled", resume))

} catch (error) {
  if (error instanceof Error) {
    core.setFailed(error.message);
  } else {
    core.setFailed(`error: ${error}`);
  }

  console.error(error)
}
