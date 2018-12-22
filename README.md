## Overview

Virtually all the functionality of this package comes from [ruby_language_server](https://github.com/kwerle/ruby_language_server).

The first time this fires up (and any time you clear your docker images), the docker image will need to be downloaded - and that may take a few minutes.

Install it, check out a ruby file, and do Outline View: Toggle (alt-o for me).

## Requirements

  - You must have [docker](https://www.docker.com/) installed
  - You must have really low expectations or be willing to help add features

## Features

  - Completion suggestions
  - Outline view
  - Jump to definition
  - Linting using rubocop

## FAQ

> Why bother?

I'm just trying to get the ball rolling.  

> Why does this crash?

Do you have docker installed?  Is the path /usr/local/bin/docker?  You can tweak that in the settings.

## License

[MIT License](https://liuderchi.mit-license.org/)
