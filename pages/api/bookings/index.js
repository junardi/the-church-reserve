import excuteQuery from "@/lib/db";
import { hashPassword } from "@/lib/data-helper";

const { Vonage } = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: 'ee67f346',
  apiSecret: 'GrkesPkDDp2oJXzW'
})


export default async function handler(req, res) {
  
    //const reservationId = req.query.reservationId;
  
    if(req.method === 'GET') {
    

      
      try {

        const result = await excuteQuery({
          query: 'SELECT * FROM bookings'
        });

        const data = {
          success: true,
          data: result 
        };
  
        res.status(200).json(data);
      } catch(error) {
        const data = {
          success: false,
          data: {}
        };
  
        res.status(200).json(data);
      }
  
  
    } else if(req.method === 'POST') {

        const { details, user_id, status, paid, date, time, event } = req.body;

        // console.log('details ', details);
        // console.log('user_id ', user_id);
        // console.log('status ', status);
        // console.log('paid ', paid);
        // console.log('date ', date);
        // console.log('time ', time);
        // console.log('event ', event);

        try {
            const result = await excuteQuery({
              query: 'INSERT INTO bookings (details, user_id, status, paid, date, time, event) VALUES(?, ?, ?, ?, ?, ?, ?)', 
              values: [details, user_id, status, paid, date, time, event]
            });
      
            const data = {
              success: true,
              data: result 
            };
      
            res.status(200).json(data);
            
          } catch(error) {

            console.log('error is ', error);
        
            const data = {
              success: false,
              data: {}
            };

            res.status(200).json(data);
        }
     
    } else if(req.method === 'PUT') {

      const { amount, status, booking_id } = req.body;

      try {

        const result = await excuteQuery({
          query: 'UPDATE bookings SET status=?, amount=? WHERE booking_id = ?',                                                                                  
          values: [status, amount, booking_id]
        });
  
        const data = {
          success: true,
          data: result 
        };

        const to = '639562490328';
        //const to = '639662385023';
        const from = 'Saint James Parish Church';
        const text = "Your booking is approved";

        await vonage.sms.send({to, from, text})
        .then(resp => { console.log('Message sent successfully'); console.log(resp); })
        .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
      
        res.status(200).json(data);
        
      } catch(error) {

        const data = {
          success: false,
          data: {}
        };
  
        res.status(200).json(data);
      }    

    

  
    } else if(req.method === 'DELETE') {

      const booking_id = req.body.booking_id;

      try {

        const result = await excuteQuery({
          query: 'DELETE FROM bookings WHERE booking_id = ?',
          values: [booking_id]
        });

        const data = {
          success: true,
          data: result 
        };

        res.status(200).json(data);
        
      } catch(error) {

        const data = {
          success: false,
          data: {}
        };

        res.status(200).json(data);
      }


    }
  
  }
  