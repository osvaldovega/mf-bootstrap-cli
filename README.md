# mf-bootstrap-cli

[![NPM version](https://img.shields.io/npm/v/mf-bootstrap-cli.svg?style=plastic)][npm-url]
![APM](https://img.shields.io/apm/l/react?style=plastic)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=plastic)](https://github.com/prettier/prettier)
[![npm download](https://img.shields.io/npm/dm/mf-bootstrap-cli.svg?style=plastic)][npm-url]

[npm-url]: https://www.npmjs.com/package/mf-bootstrap-cli

> 🚧 Working in progress
>
> NOTE: There are a few details still in progress, for what is recommend it use the default template as the TypeScript template is under improvements.

This package includes the global command to create a React micro-frontend project (base project).

After all the questions are answered or all necessary arguments passed, the CLI will create a directory in the same directory where the CLI run. The output will be a basic React base application including the configuration of `Webpack 5.0.0-beta.25` to make possible the use of the `Module Federation Plugin`.

There are 2 available templates:

- JavaScript (default).
- TypeScript.

And 2 available package manager for the run the application:

- npm (default).
- yarn.

There is one last option that is `-s` or `--skip` that will create a micro-frontend template using the default values.

#### Default values:

    Project name: mf-application
    Template: JavaScript
    Package Manager: npm
    Initialize Git: false
    Install dependencies: false

Some of the settings supported by the template are:

- React v16.13.1
- ReactDOM v16.13.1
- Jest and Enzyme configuration.
- CSS and CSS Modules
- ESLint and Prettier config
- Webpack 5.0.0-beta.25
- MIT License

## Prerequisites

- NodeJS version 10 or higher.
- Git version 2.25.0 or higher.

## Installation

The package can be installed globally.

```
npm i -g mf-bootstrap-cli
```

or you can use it by `npx`

```
npx mf-bootstrap-cli [options]
```

## Usage

The CLI can receive the arguments inline or you can just type the package name and if there are pending mandatory options to create the project, a list of questions will be prompt to the user.

These are all the available arguments that can be pass to the bootstrap CLI.

### Options

```
  -h, --help		 print mf-bootstrap-cli command line options (currently set)
  -i, --install		 let the application know if the micro-frontend dependencies will be install. Is set FALSE by default
  -g, --git		 let the application know if the micro-frontend application will be initialize with Git. Is set FALSE by default
  -n, --name		micro-frontend application name
  -p, --pManager	package manager to use, npm (default) or yarn
  -s, --skip		parameter to create a micro-frontend application using default values
  -t, --template	micro-frontend type of project, JavaScript (default) or TypeScript
  -v, --version		print mf-bootstrap-cli version
```

### Examples

- Init Git and install dependencies:

```
$> mf-bootstrap-cli -n myApplication -t JavaScript -p yarn --git --install
```

- without git init application and without install dependencies

```
$> mf-bootstrap-cli -n myApplication -t JavaScript -p yarn
```

- Default template (JS), default package manager (NPM), no init and no install dependencies:

```
$> mf-bootstrap-cli -n myApplication
```

- Use default values:

```
$> mf-bootstrap-cli --skip
```

## License

[MIT](./LICENSE)
