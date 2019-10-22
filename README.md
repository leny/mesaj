# mesaj

[![NPM version](http://img.shields.io/npm/v/mesaj.svg)](https://www.npmjs.org/package/mesaj) ![Downloads counter](http://img.shields.io/npm/dm/mesaj.svg) [![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

> A simple commandline wrapper over Apple's Message app.

* * *

## Usage

### Installation

To use **mesaj**, you must at first install it globally.

    (sudo) npm install -g mesaj

### Usage

	mesaj [options]

If no option is given, the target contact and message will be prompted.

#### Options
* `-V, --version`            output the version number
* `-c, --contact <contact>`  target contact to send message
* `-m, --message <message>`  message to send
* `-s, --service`            choose the account in charge of sending the message
* `-r, --refresh`            refresh cache info for contacts
* `-h, --help`               output usage information

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.

## License
Copyright ©2018 Leny  
Licensed under the MIT license.
