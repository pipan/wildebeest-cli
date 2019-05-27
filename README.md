# Cli

[![Build Status](https://travis-ci.com/pipan/wildebeest-cli.svg?branch=master)](https://travis-ci.com/pipan/wildebeest-cli)

## Installation

```sh
npm install -g @wildebeest/cli
```

## Usage

### Create Application

```ts
let app: Application();
app.run([KeyboardShortcutsModule]);
```

## Create your own commands

It's usefull to know these libraries:

* inversify
* @wildebeest/js-modules