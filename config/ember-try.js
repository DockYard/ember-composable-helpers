/*jshint node:true*/
var command = [ 'ember', 'exam', '--split', '3', '--random' ];

module.exports = {
  command: command.join(' '),
  useVersionCompatibility: true,
  scenarios: [
    {
      name: 'ember-alpha',
      allowedToFail: true,
      bower: {
        dependencies: {
          "ember": "alpha"
        },
        resolutions: {
          "ember": "alpha"
        }
      }
    }
  ]
};
