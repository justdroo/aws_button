const Nexmo = require('nexmo');
const privateKey = require('fs').readFileSync('./private.key');

const zoomRoom = '16468769923';
const recipientNumber = '19193572932';

const nexmo = new Nexmo({
  apiKey: '88ace146',
  apiSecret: 'Fu89XwpGIKV0nKhS',
  applicationId: '82cf3dca-9c2a-45b1-9eb4-a0a86932c56a',
  privateKey: privateKey
})

exports.handler = (event, context, callback) => {
    console.log('Calling phone number', zoomRoom);

    nexmo.calls.create({
      to: [{
        type: 'phone',
        number: zoomRoom,
        dtmfAnswer: 'pppp2863566849#pppp#'
      }],
      from: {
        type: 'phone',
        number: '12345678901'
      },
      answer_url: ['https://raw.githubusercontent.com/justdroo/aws_button/master/ncco_zoom.json']
    }, (err, res) => {
      if(err) {
        console.error("there is an error");
        console.error(err);
      }
      else {
        console.log(res);
        console.log('Calling phone number', recipientNumber);

        nexmo.calls.create({
          to: [{
            type: 'phone',
            number: recipientNumber
          }],
          from: {
            type: 'phone',
            number: '12345678901'
          },
          answer_url: ['https://raw.githubusercontent.com/justdroo/aws_button/master/ncco_drew.json']
        }, (err, res) => {
          if(err) {
            console.error("there is an error");
            console.error(err);
          }
          else {
            console.log(res);
          }
        });
      }
    });
};
