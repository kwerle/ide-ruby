# Codebase STOLEN FROM THE ide-yaml PROJECT!!!  Security! (but don't blame them)

Uses https://github.com/mtsmfm/language_server-ruby as the back end

See https://github.com/mtsmfm/vscode-ruby-lsc/blob/master/src/extension.ts for notes on how the docker image is used from vscode.

Really poor Atom-IDE support for ruby.

## Requirements

  - You must have [docker](https://www.docker.com/) installed
  - You must have really low expectations or be willing to help add features

## Features

  - Really bad completion suggestions.
  - Outline view

## FAQ

> Why bother?

I'm just trying to get the ball rolling.  

> Why does this crash?

Do you have docker installed?  Is the path /usr/local/bin/docker?  You can tweak that in the settings...

Did you start typing something before the outline view said there is none available?  Because that will crash the parser which will lock up the editor.

## License

[MIT License](https://liuderchi.mit-license.org/)
