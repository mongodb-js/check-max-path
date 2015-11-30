var debug = require('debug')('check-max-path');
var glob = require('glob');
var util = require('util');
var path = require('path');

var MAX_PATH = 260;

module.exports = function(opts, done) {
  var options = {
    dot: true,
    nomount: true,
    nodir: true
  };
  glob.glob(opts.src, options, function(err, files) {
    if (err) {
      debug('error from glob:', err, files);
      return done(err);
    }
    files = files.map(function(f) {
      return path.join(process.cwd(), f);
    });
    debug('Checking %d files', files.length);

    var destPaths = files;

    if (opts.dest) {
      destPaths = files.map(function(file) {
        return file.replace(process.cwd(), opts.dest);
      });
    }

    var tooLong = destPaths.filter(function(file) {
      debug('- (%d) %s', file.length, file);
      return file.length + 1 >= MAX_PATH;
    });

    if (tooLong.length === 0) {
      debug('all good.  no paths are too long.');
      return done();
    }

    debug('%d paths too long!', tooLong.length);
    debug('paths that are too long: ', tooLong);

    var msg = util.format('%d paths too long!', tooLong.length);

    err = new Error(msg);
    err.tooLong = tooLong;
    return done(err);
  });
};
