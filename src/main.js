const cp = require('child_process')
const path = require('path')
const { AutoLanguageClient } = require('atom-languageclient')
const { registerHelpCommands } = require('./help_cmd')
const { checkRequirementsThenWelcome } = require('./welcome_notification')

class RubyLanguageClient extends AutoLanguageClient {
  constructor() {
    super()
    atom.config.set('core.debugLSP', true)
    registerHelpCommands()
    checkRequirementsThenWelcome()
  }
  getGrammarScopes () { return ['source.rb', 'source.ruby'] }
  getLanguageName () { return 'Ruby' }
  getServerName () { return 'Ruby-lang-server' }
  getConnectionType() { return 'stdio' } // ipc, socket, stdio

  startServerProcess (projectRoot) {
    const command = '/usr/local/bin/docker'
    const image = "mtsmfm/language_server-ruby:latest"
    const args = ["run", "--rm", "-i", "-v", `${projectRoot}:${projectRoot}`, image];

    // this.logger.debug(`starting "${command} ${args.join(' ')}"`)
    const childProcess = cp.spawn(command, args, { })
    this.captureServerErrors(childProcess)
    return childProcess
  }

}

module.exports = new RubyLanguageClient()
