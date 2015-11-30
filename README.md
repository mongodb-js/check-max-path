# check-max-path [![travis][travis_img]][travis_url] [![npm][npm_img]][npm_url]

> Will you hit the [Windows Maximum Path Length Limitation][max-path-docs]?

## Installation

```
npm install -g check-max-path
```

## Usage

```
Usage: check-max-path <./glob/to/src> [<./glob/to/dest>]

Will you hit the Windows Maximum Path Length Limitation?

Usage:
  check-max-path "build/{!*.asar,*,**/*}" dist/MyElectronApp

Options:
  --debug              Enable debug messages.
  -h --help            Show this screen.
  --version            Show version.
```

## License

Apache 2.0

[travis_img]: https://img.shields.io/travis/mongodb-js/check-max-path.svg
[travis_url]: https://travis-ci.org/mongodb-js/check-max-path
[npm_img]: https://img.shields.io/npm/v/check-max-path.svg
[npm_url]: https://npmjs.org/package/check-max-path
: https://msdn.microsoft.com/en-us/library/windows/desktop/aa365247(v=vs.85).aspx#maxpath
