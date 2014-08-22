# Next Beer
> a mobile app that lets you discover new beer you might find interesting.

## Table of Contents

1. [Use Cases](#use-cases)
1. [Architecture](#architecture)
1. [Development](#development)
1. [Authors](#authors)
1. [Contributing](#contributing)

## Use Cases
- At a bar or supermarket, when you want to discover a new beer to try tout
- Collect the beers you like

## Architecture

### Client
- Cordova: cross-platform mobile developement.
- Ionic Framework: css framework for Cordova.
- Angular.js

### Server
- Flask: an API server.
- Python app: using item-based collaborative filtering to predict preference of users.

## Development
### Installing Dependencies

```sh
npm install
bower install
gulp preview # to run the app locally
```

### Gulp
There are three gulp commands with which you will mainly interface with the app.
- gulp watch: watch for any changes in your development directory.
- gulp preview: bundle the app and serve locally. It DOES livereload on any changes.
- gulp build -p [platform name]: build the app from www/ to platforms/ and run an emulator for a test.


## Authors
  - Boris Verkhovskiy
  - Caly Moss
  - DH Lee
  - Neil Lobo

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
