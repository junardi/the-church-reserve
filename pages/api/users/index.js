import excuteQuery from "@/pages/lib/db";
import { hashPassword } from "@/pages/lib/data-helper";


export default async function handler(req, res) {
  
    //const reservationId = req.query.reservationId;
  
    if(req.method === 'GET') {
    

      console.log('HI lets get data');  
      try {

        const result = await excuteQuery({
          query: 'SELECT * FROM users'
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

        //console.log('request body is ', req.body);

        const { first_name, last_name, gender, date_of_birth, contact_no, address, email, password, role } = req.body;
        console.log('first_name', first_name);
        console.log('last_name', last_name);
        console.log('gender', gender);
        console.log('date_of_birth', date_of_birth);
        console.log('contact_no', contact_no);
        console.log('address', address);
        console.log('email', email);
        console.log('password', password);
        console.log('role', role);

        // console.log('HI IM here in POST');

        try {
            const result = await excuteQuery({
              query: 'INSERT INTO users (first_name, last_name, gender, date_of_birth, contact_no, address, email, password, role) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)',                                                                 
              values: [first_name, last_name, gender, date_of_birth, contact_no, address, email, password, role]
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
  
    } else if(req.method === 'DELETE') {
      
    }
  
  }
  