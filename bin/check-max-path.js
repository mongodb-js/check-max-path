#!/usr/bin/env node
/* eslint no-sync:0, no-console:0 */

var path = require('path');
var fs = require('fs');
var usage = fs.readFileSync(path.resolve(__dirname, '../usage.txt')).toString();
var args = require('minimist')(process.argv.slice(2), {
  boolean: ['debug']
});
const chalk = require('chalk');

if (args.debug) {
  process.env.DEBUG = 'check-max-path';
}

var check = require('../');
var pkg = require('../package.json');

args.src = args._[0];
if (args._[1]) {
  args.dest = args._[1];
}

if (args.help || args.h || !args.src) {
  console.error(usage);
  process.exit(1);
}

if (args.version) {
  console.error(pkg.version);
  process.exit(1);
}

console.log('running check', args);

check(args, function(err) {
  if (err) {
    console.error(chalk.red(err.message) + '\n\n');
    if (err.tooLong) {
      err.tooLong.map(function(f) {
        console.error(`- (${chalk.red(f.length)}) ${f}`, f);
      });
    }
    process.exit(1);
    return;
  }
  console.log('👍');
  process.exit(0);
});
