import axios from "axios";
import FormData from "form-data";

export default async function handler(req, res) {

    try {
        //const authSaludo = await authCheck(req);
        const body = new FormData();
        body.append("requireSignedURLs", "false");
    
        // KEYS
        const AUTH_TOKEN = process.env.NEXT_PUBLIC_TOKEN_CLOUDFLARE;
        const GENERATE_LINK = process.env.NEXT_PUBLIC_CLOUDFLARE_GENERATE_LINK_UPLOAD;
    
        // Generate link from cloudinary
        // const  {data}  = await axios.post(GENERATE_LINK, body, {
        //   headers: {
        //     Authorization: AUTH_TOKEN,
        //   },
        // });

        const response = await fetch(GENERATE_LINK, {
            //body: "requireSignedURLs=false",
            headers: {
                
                Authorization: AUTH_TOKEN,
            },
            method: "post",
        })
        const data = await response.json()
        
        
        
       res.json(data)
    
        //return data;
      } catch (error) {
        console.log(error);
        res.json(error)
        
      }
}
  