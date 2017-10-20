const { shell } = require('electron')
const packageJSON = require('../package.json')

const generateHelpMsg = () => {
  const { name, version, atomCommands: commands } = packageJSON
  return `## [${name}](https://atom.io/packages/${name}) \n\n${version}\n${
    Object.keys(commands)
      .map(cmd => `  - \`${cmd}\` ${commands[cmd]}`)
      .join('\n')
  }`
}

const gerneateButtons = () => {
  const repoUrl = packageJSON.homepage.replace(/#.*/, '').replace(/\/$/, '')
  return [
    {
      text: ' FAQ',
      onDidClick: () => { shell.openExternal(`${repoUrl}#faq`) },
      className: 'btn btn-info btn-lg icon-link selected',
    },
    {
      text: ' Send Issue',
      onDidClick: () => { shell.openExternal(`${repoUrl}/issues/new`) },
      className: 'btn btn-info btn-lg icon-link',
    },
  ]
}

const registerHelpCommands = () => {
  atom.commands.add('atom-workspace', `${packageJSON.name}:help`, () => {
    atom.notifications.addInfo(
      generateHelpMsg(),
      {
        buttons: gerneateButtons(),
        dismissable: true,
        icon: 'mortar-board',
      }
    )
  })
}


module.exports = {
  registerHelpCommands,
}
