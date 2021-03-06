const chalk = require('chalk');
const users = require('../data/users-data');

/**
 *  Login with the credentials for the specified user.
 *
 * @param {string} userKey - The key of the user object to use for login (see data/usersData.js).
 * @param [done] - Pass the done callback when used in the before hook.
 * @returns {exports}
 */
exports.command = function (userKey, done) {
  const loginUser = users[userKey];
  console.log(chalk.cyan('Logging in with ' + loginUser.name + '...'));

  this.url(this.launchUrl + '/login')
    .waitForElementVisible('#email')
    .clearValue('#email')
    .setValue('#email', loginUser.email)
    .clearValue('#password')
    .setValue('#password', loginUser.password)
    .click('button[type="submit"]')
    .waitForElementVisible('#dashboard')
    .perform(function () {
      console.log(chalk.cyan('Logged in'));
      if (typeof done === 'function') {
        done();
      }
    });

  return this;
};
