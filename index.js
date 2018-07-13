const Nexmo = require('nexmo');
const privateKey = require('fs').readFileSync('./private.key');
const appId = process.env.appId;
const recipientNumber = process.env.phoneNumber;

const nexmo = new Nexmo({
  apiKey: process.env.apiKey,
  apiSecret: process.env.apiSecret,
  applicationId: appId,
  privateKey: privateKey
})

exports.handler = (event, context, callback) => {
    console.log('Calling phone number', recipientNumber);

    nexmo.calls.create({
      to: [{
        type: 'phone',
        number: recipientNumber
      }],
      from: {
        type: 'phone',
        number: 12345678901
      },
      answer_url: ["https://nexmo-community.github.io/ncco-examples/first_call_talk.json"]
    }, (err, res) => {
      if(err) {
        console.error("there is an error");
        console.error(err);
      }
      else {
        console.log(res);
      }
    });
};
