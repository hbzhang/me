'use strict';

module.exports = {
  forgot_password_email: function(user, req, token, mailOptions) {

   // req.headers.host

    var resetpassword = 'http://run.recsports.vt.edu/#!/reset/';

    mailOptions.html = [
      'Hi ' + user.name + ',',
      'We have received a request to reset the password for your account.',
      'If you made this request, please click on the link below or paste this into your browser to complete the process:',
      '' + resetpassword + token,
      'This link will work for 1 hour or until your password is reset.',
      'If you did not ask to change your password, please ignore this email and your account will remain unchanged.'
    ].join('\n\n');
    mailOptions.subject = 'Resetting your password';
    return mailOptions;
  },
  thanks_for_register: function(user, mailOptions) {

    var resetpassword = 'http://run.recsports.vt.edu/#!/forgot-password';

    mailOptions.html = [

      '<p>Dear ' + user.name + ':' + '</p>',
      '<p>Thank you for creating an account with Virginia Tech Recreational Sports.',
      'To access your account, please visit http://run.recsports.vt.edu',
      'using your user name:'+ user.username + '</p>',
      '<p>If you have forgotten your password, <a href='+ resetpassword +'>click here</a></p>',
      '<p>For more information about VT Rec Sports, visit our departmental website, www.recsports.vt.edu.</p>',
      '<p>In Health,</p>',
      '<p><b>VT Rec Sports Staff</b></p>'
    ].join('\n\n');
    mailOptions.subject = 'Welcome to VT Recsports';
    return mailOptions;
  }
};

