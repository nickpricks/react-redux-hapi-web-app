const smtp = require('../../smtp');
const config = require('config');

module.exports = (inviteModel) => {
  const url = config.url;
  const subject = 'User Invitation';
  const verifyLink = `${url}/accounts/register?role=${inviteModel.role}&email=${inviteModel.email}`;
  const model = Object.assign({}, inviteModel, { verifyLink });
  return smtp.send(inviteModel.email, subject, model, __dirname);
};
