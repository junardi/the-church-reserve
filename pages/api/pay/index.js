import excuteQuery from "@/lib/db";
import { hashPassword } from "@/lib/data-helper";


export default async function handler(req, res) {
  
    //const reservationId = req.query.reservationId;
  
    if(req.method === 'GET') {
    
    } else if(req.method === 'POST') {

    } else if(req.method === 'PUT') {

      const { transaction_code, paid, booking_id } = req.body;

      try {

        const result = await excuteQuery({
          query: 'UPDATE bookings SET transaction_code=?, paid=? WHERE booking_id = ?',                                                                                  
          values: [transaction_code, paid, booking_id]
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


    } else if(req.method === 'DELETE') {

    
    }
  
  }
  