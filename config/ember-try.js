/*jshint node:true*/
var command = [ 'ember', 'exam', '--split', '3', '--random' ];
var pr = process.env.TRAVIS_PULL_REQUEST;

if (pr) {
  command.push(pr);
}

module.exports = {
  command: command.join(' ')
};
