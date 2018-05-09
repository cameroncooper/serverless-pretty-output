const jq = require('node-jq');

class Pretty {
  constructor(serverless, options) {
    const filter = (((serverless || {}).service || {}).custom || {}).jsonOutputFilter || '.';
    const hook = function (write) {
      return function (string, encoding, fd) {
        jq.run(filter, string, { input: 'string', sort: true, color: true })
          .then((output) => {
            write.apply(process.stdout, [output + '\n', encoding, fd]);
          })
          .catch((err) => {
            write.apply(process.stdout, arguments);
          })
      }
    };

    console._stdout.write = hook(console._stdout.write)
    console._stderr.write = hook(console._stderr.write)
    process.stdout.write = hook(process.stdout.write);
  }
}

module.exports = Pretty;