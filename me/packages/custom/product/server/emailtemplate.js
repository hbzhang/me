'use strict';

module.exports = {
  thanks_for_register_werememberrun: function(imgurl, user, mailOptions) {


    mailOptions.html = [

      '<p>Dear ' + user.name + ':',
      '<p><b>Greetings Runners and Walkers!</b></p><p>We are excited that you will be participating in the 3.2-Mile Run in Remembrance on Saturday, April 18th.',
      'This event continues to be a very special community run/walk and we look forward to seeing you out there.',
      'Similar to past years, we anticipate large numbers of participants. Since we will have so many people coming, it will be very helpful if you could read through the notes below.',
      'This will answer many of your questions ahead of time.</p><p><b>Event Details:</b></p>',
      '<p>Saturday, April 18th on the Drillfield at Virginia Tech</p>',
       '<p><span>Pre-Event Check In is required</span></p>',
       '<p><span>Pre-Event Group Picture will take place on the Drillfield at 8:45am in the shape of 3.2.</span><br/></p>',
       '<p><span>Run/Walk Start Time: 9am with a Moment of Silence</span><br/></p><p><span><b>Registration Account:</b></span><br/></p>',
       '<p>During registration, you created an account at www.run.recsports.vt.edu. You can return to this site to find your registration confirmation code and event information and updates.</p>',
       '<p><span><b>Check In:</b></span><br/></p><p>Please bring your confirmation code to check in.This code can be found in your registration account under the tab titled “QR Code.”',
       'You may check in friends and family if you have their confirmation code with you.</p>',
       '<p>Check In Location: War Memorial Hall room 125 (basketball gym)</p>',
       '<p><span>Check In Times: Friday, April 17th between 4pm – 8pm or Saturday, April 18th between 6:30am – 8:30am</span><span> </span></p>',
       '<p>Parking: Please use Perry Street Parking Lot &amp; Garage - More parking information is available at: www.parking.vt.edu</p>',
       '<p>For more information about the Day of Remembrance activities, please visit: http://www.weremember.vt.edu</p>',
       '<p>Join our Facebook at: https://www.facebook.com/VirginiaTechRecSports</p>',
       '<p><a href='+imgurl+'>QRcode For Checkin</p>',
       '<p><b>VT Rec Sports Staff</b></p>'
    ].join('\n\n');
    mailOptions.subject = '3.2 Mile Run';
    return mailOptions;
  }
};











