## Overview

Virtually all the functionality of this package comes from [ruby_language_server](https://github.com/kwerle/ruby_language_server).

## Requirements

  - You must have [docker](https://www.docker.com/) installed
  - You must have really low expectations or be willing to help add features

## Features

  - Very limited completion suggestions.
  - Outline view
  - Jump to definition

## FAQ

> Why bother?

I'm just trying to get the ball rolling.  

> Why does this crash?

Do you have docker installed?  Is the path /usr/local/bin/docker?  You can tweak that in the settings...

Did you start typing something before the outline view said there is none available?  Because that will crash the parser which will lock up the editor.

## License

[MIT License](https://liuderchi.mit-license.org/)
