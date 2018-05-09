const jq = require('node-jq');

class Pretty {
  constructor(serverless, options) {
    const filter = (((serverless || {}).service || {}).custom || {}).jsonOutputFilter || '.';
    process.stdout.write = (function (write) {
      return function (string, encoding, fd) {
        jq.run(filter, string, { input: 'string', sort: true, color: true })
          .then((output) => {
            write.apply(process.stdout, [output+'\n', encoding, fd]);
          })
          .catch((err) => {
            write.apply(process.stdout, arguments);
          })
      }
    })(process.stdout.write);
  }
}

module.exports = Pretty;