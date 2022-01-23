const core = require('@actions/core')
const mustache = require('mustache')
const axios = require('axios')

try {
  const dataURL = core.getInput('resume-data-url')
  const templateURL = core.getInput('resume-template-url')

  const mustacheConfig = {
    tags: ["<%", "%>"],
    escape: text => text
  }

  // const template = await fetch("https://gist.github.com/joshmsamuels/14a51cb1be5e15a3e54b0dccf3b80286")

  const template = await axios.get("https://gist.github.com/joshmsamuels/951453f0aade3a132f6c8cbd91fd8a52")

  // console.log(render("Here is a sample template \{<%foo%>}", { foo: "MOOstashe" }, {}, mustacheConfig))
  console.log(mustache.render(template, { foo: "MOOstashe" }, {}, mustacheConfig))
  core.setOutput("filled", mustache.render(template, { foo: "MOOstashe" }, {}, mustacheConfig))

} catch (error) {
  if (error instanceof Error) {
    core.setFailed(error.message);
  } else {
    core.setFailed(`error: ${error}`);
  }

  console.error(error)
}
