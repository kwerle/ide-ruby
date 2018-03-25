const cp = require('child_process')
const path = require('path')
const net = require('net')
const { AutoLanguageClient } = require('atom-languageclient')
const { registerHelpCommands } = require('./help_cmd')
const { checkRequirementsThenWelcome } = require('./welcome_notification')

class RubyLanguageClient extends AutoLanguageClient {
  constructor() {
    super()
    atom.config.set('core.debugLSP', true) // Debug the hell out of this
    registerHelpCommands()
    checkRequirementsThenWelcome()
    this.busySignalElement = null
  }

  consumeBusySignal (busySignal) {
    this.busySignal = busySignal
  }

  getGrammarScopes () { return ['source.rb', 'source.ruby', 'source.ruby.rails', 'source.ruby.rails.rjs'] }
  getLanguageName () { return 'Ruby' }
  getServerName () { return 'Ruby-lang-server' }
  getConnectionType() { return 'stdio' } // ipc, socket, stdio

  startServerProcess(projectPath) {
    const command = atom.config.get('ide-ruby.dockerPath');
    const image = atom.config.get('ide-ruby.imageName');
    const lintLevel = atom.config.get('ide-ruby.lintLevel');

    // Update the local image if there is one - this won't update until next run.  I wish there were docker run --pull
    const updateCommand = `${command} pull ${image}`;
    this.logger.debug(`updateCommand ${updateCommand}`)
    cp.exec(updateCommand, (error, stdout, stderr) => {
      if (error) {
        this.logger.error(`${updateCommand} exec error: ${error}`);
        return;
      }
      this.logger.debug(`${updateCommand} stdout: ${stdout}`);
      this.logger.debug(`${updateCommand} stderr: ${stderr}`);
    });

    const projectDirectory = projectPath;

    const args = ["run", "--rm", '-i', '-v', `${projectDirectory}:/project:ro,z`, '-w', '/project', '-e', `LINT_LEVEL=${lintLevel}`, image];

    this.logger.debug(`starting "${command} ${args.join(' ')}"`)

    var childProcess
    try {
      childProcess = cp.spawn(command, args, { })
    } catch (e) {
      this.logger.error(`error "${e}"`)
      this.reportLaunchError(e)
      return
    }
    this.captureServerErrors(childProcess)
    childProcess.on('error', err => {
      this.reportLaunchError(err)
    })

    childProcess.on('exit', err => {
      this.logger.debug(`docker run exit!!!!!!!!!!!!!!!!!!!!!! ${err}`)
      if (err == 125) {
        atom.notifications.addError('Docker failed to start.', {
          dismissable: true,
          description: `This may be beause you launched Atom and Docker at login, and Atom beat docker.  Atom rocks!  I am not clever enough to figure out how to restart it; Node, js, and atom coding are not my strengths.  You should hit CMD-CTRL-ALT-L once Docker has finished launching.  And if you rock at some of these atom things, please stop by and contribute code!`
          })
      }
      }
    )

    return childProcess
  }

  reportLaunchError(error) {
    atom.notifications.addError(`Unable to start the ruby language server: ${error}.`, {
      dismissable: true,
      buttons: [
        { text: 'Download docker', onDidClick: () => shell.openExternal('https://docker.com/') },
        { text: 'Set docker path', onDidClick: () => atom.workspace.open("atom://config/packages/ide-ruby") }
      ],
      description: 'Maybe you do not have docker installed?  Or the internet is broken?  Or it is not running?'
    })
  }
}

module.exports = new RubyLanguageClient()
