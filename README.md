# ide-yaml

[![apm-download-count][apm-download-count]][apm-download-link]
[![travis-status][travis-status]][travis-project]
[![dependency-status][david-status]][david-project]

Atom-IDE support for YAML language

![demo1][demo1]

![demo2][demo2]


## Features

  - YAML Outline in *Outline View*
      - Quick navigation by clicking
      - Searching by entering keywords
  - Tooltips for
      - Linter message


## Requirements

you need to install following requirements before installing [`ide-yaml`][apm-download-link]:

  - Atom editor *1.21.0-beta0* or higher version
  - Atom package [`atom-ide-ui`][atom-ide-ui]


## FAQ

> Why I could not download this Atom package?

Please make sure you have installed all softwares in [*Requirements*](#requirements) section.

---

> I've installed ide-yaml. Why there is still nothing shown in Outline View when yaml opened?

Please check the file exists in the *Project Tree View* so that it can be handled by [`ide-yaml`][apm-download-link].

In addition, to show outline view, use Atom command `Outline View: Toggle`.

---

> How can I customize this package?

Please read [CONTRIBUTING.md][CONTRIBUTING.md] for more details.

---

  - :confused: Still feeling confused? Please [provide feedbacks via issues][create-issue] to make ide-yaml better. :pray:


## Notes and References
  - [`ide-yaml`][apm-download-link] acts as a *client* of language server basing on [`atom-languageclient`][atom-languageclient]
  - [`yaml-language-server`][yaml-language-server] acts as a *language server* and analyze your YAML in separate process
  - language servers and clients are talking with [Language Server Protocol (LSP)][lsp]


## License

[MIT License][mit-license]


[apm-download-count]: https://img.shields.io/apm/dm/ide-yaml.svg "apm-download-count"
[apm-download-link]: https://atom.io/packages/ide-yaml "apm-download-link"
[travis-status]: https://travis-ci.org/liuderchi/ide-yaml.svg?branch=master "travis-status"
[travis-project]: https://travis-ci.org/liuderchi/ide-yaml "travis-project"
[david-status]: https://david-dm.org/liuderchi/ide-yaml.svg "david-status"
[david-project]: https://david-dm.org/liuderchi/ide-yaml "david-project"
[demo1]: https://user-images.githubusercontent.com/4994705/30978941-b57d0f08-a441-11e7-84c7-c832b64c337d.png "demo1"
[demo2]: https://user-images.githubusercontent.com/4994705/30978942-b5ad6a0e-a441-11e7-989d-25db64fc33d1.png "demo2"

[atom-ide-ui]: https://atom.io/packages/atom-ide-ui "atom-ide-ui"
[CONTRIBUTING.md]: https://github.com/liuderchi/ide-yaml/blob/master/CONTRIBUTING.md "CONTRIBUTING.md"
[create-issue]: https://github.com/liuderchi/ide-yaml/issues/new "create-issue"

[atom-languageclient]: https://github.com/atom/atom-languageclient "atom-languageclient"
[yaml-language-server]: https://github.com/redhat-developer/yaml-language-server "yaml-language-server"
[lsp]: http://langserver.org/ "lsp"

[mit-license]: https://liuderchi.mit-license.org/ "mit-license"
