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
    this.dockerStartAttempts = 0
    const dockerPromise = new Promise((resolve, reject) => {
      this.checkOnDocker(resolve, reject)
    }).then((result) => {
      this.updateDockerImage()
      return this.runDocker(projectPath)
    })
    return dockerPromise
  }

  dockerCommand() {
    return atom.config.get('ide-ruby.dockerPath')
  }

  dockerImage() {
    return atom.config.get('ide-ruby.imageName');
  }

  checkOnDocker(resolve, reject) {
    // Update the local image if there is one - this won't update until next run.  I wish there were docker run --pull
    const updateCommand = `${this.dockerCommand()} ps`;
    this.dockerStartAttempts = this.dockerStartAttempts + 1
    this.logger.debug(`updateCommand ${updateCommand}`)
    const childProcess = cp.exec(updateCommand, (error, stdout, stderr) => {
      if (error) {
        this.logger.error(`${updateCommand} exec error: ${error}`);
        return;
      }
      this.logger.debug(`${updateCommand} stdout: ${stdout}`);
      this.logger.debug(`${updateCommand} stderr: ${stderr}`);
    });

    childProcess.on('exit', err => {
      if (err == 0) {
        return resolve()
      }
      this.logger.error(`docker ps exit!!!!!!!!!!!!!!!!!!!!!! ${err}`)
      if (this.dockerStartAttempts < 4) {
        return new Promise((iresolve, ireject) => {
          setTimeout(() => {resolve(this.checkOnDocker(iresolve, ireject))}, 20000)
        })
      } else {
        atom.notifications.addError('Docker failed to start.', {
          dismissable: true,
          description: `Maybe docker was not running?  You should hit CMD-CTRL-ALT-L once Docker has finished launching.`
        })
        reject(`Docker failed to pull ide-ruby image ${this.dockerImage()}: ${err}`)
      }
    })
  }

  updateDockerImage() {
    // Update the local image if there is one - this won't update until next run.  I wish there were docker run --pull
    const updateCommand = `${this.dockerCommand()} pull ${this.dockerImage()}`;
    this.dockerStartAttempts = this.dockerStartAttempts + 1
    this.logger.debug(`updateCommand ${updateCommand}`)
    cp.exec(updateCommand, (error, stdout, stderr) => {
      if (error) {
        this.logger.error(`${updateCommand} exec error: ${error}`);
        return;
      }
      this.logger.debug(`${updateCommand} stdout: ${stdout}`);
      this.logger.debug(`${updateCommand} stderr: ${stderr}`);
    });
  }

  runDocker(projectPath) {
    const lintLevel = atom.config.get('ide-ruby.lintLevel');
    const additionalGems = atom.config.get('ide-ruby.additionalGems');
    const command = this.dockerCommand()

    const args = ["run", "--rm", '-i', '-v', `${projectPath}:/project:ro,z`, '-w', '/project', '-e', `LINT_LEVEL=${lintLevel}`, '-e', `ADDITIONAL_GEMS=${additionalGems}`, this.dockerImage()];
    var childProcess
    this.logger.debug(`starting "${command} ${args.join(' ')}"`)
    try {
      childProcess = cp.spawn(command, args, { })
    } catch (e) {
      this.logger.error(`error "${e}"`)
      this.reportLaunchError(e)
    }
    this.captureServerErrors(childProcess)
    childProcess.on('error', err => {
      this.reportLaunchError(err)
    })
    childProcess.on('exit', err => {
      this.logger.debug(`docker run exit!!!!!!!!!!!!!!!!!!!!!! ${err}`)
      if (err > 0) { // 125 means docker failed
        atom.notifications.addError('Docker exited!', {
          dismissable: true,
          description: `Maybe you restarted docker.  Hit cmd-opt-ctrl-l to restart (Reload Window)`
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
