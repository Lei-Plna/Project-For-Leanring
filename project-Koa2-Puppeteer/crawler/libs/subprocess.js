const cp = require('child_process'),
  { resolve } = require('path');

module.exports = {
  startProcess: (options) => {
    const script = resolve(__dirname, options.path),
      child = cp.fork(script, []);
    let invoked = false;
    
    child.on('message', (data) => {
      if (invoked) return;
      invoked = true;
      options.message(data);
    });

    child.on('exit', (code) => {
      if (invoked) return;
      invoked = true;
      options.exit(code);
    });

    child.on('error', (err) => {
      if (invoked) return;
      invoked = true;
      options.error(err);
    });
  }
}