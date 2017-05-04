const nodemailer = require('nodemailer');
const sesTransport = require('nodemailer-ses-transport');
const EmailTemplate = require('email-templates').EmailTemplate;
const ses = require('../services/aws').SES;
const transporter = nodemailer.createTransport(sesTransport({ ses }));
const logger = require('../services/logger');

const internals = {};

const FROM_EMAIL = 'no-reply@simsaw.org';

exports.send = (to, subject, model, templateDir) => new Promise((resolve, reject) => {
  internals
    .emailTemplate({ subject, model }, templateDir)
    .then((template) => internals.sendEmail(FROM_EMAIL, to, subject, model, template.html))
    .then(resolve)
    .catch(err => {
      logger.error(err);
      reject('Unable to send email');
    });
});

// === INTERNALS ===
internals.emailTemplate = (context, templateDir) => new Promise((resolve, reject) => {
  const template = new EmailTemplate(templateDir);
  template.render(context, (err, result) => {
    if (err) {
      return reject(err);
    }

    resolve(result);
  });
});

internals.sendEmail = (from, to, subject, model, bodyHtml) => {
  const mailOptions = { from, to, subject, html: bodyHtml };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
};
