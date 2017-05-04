const smtp = require('../../smtp');
const config = require('config');

module.exports = (emailPayload) => {
  const hostUrl = config.url;
  const subject = 'Reset Password';

  const verifyLink = `${hostUrl}/accounts/reset-password?token=${emailPayload.token}`;

  const model = Object.assign({}, emailPayload, { verifyLink });

  return smtp.send(emailPayload.email, subject, model, __dirname);
};
