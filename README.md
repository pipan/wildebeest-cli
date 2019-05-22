# Cli



## Installation

```sh
npm install --save @wildebeest/config
```

## Requirements

It's usefull to know these libraries:

* inversify
* @wildebeest/js-modules

## Usage

### Create Application

```ts
let app: Application();
app.run([KeyboardShortcutsModule]);
```