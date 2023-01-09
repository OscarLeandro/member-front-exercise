// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  if (req.method === "GET") {
    async function getUsers(url = "") {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    }
    try {
      const data = await getUsers("http://localhost:8000/api/users");
      res.status(200).json(data);
    } catch (error) {
      res.status(401).end();
    }
  } else if (req.method === "POST") {
    console.log('ahciendop un post user')
    async function postUsers(url = "", body = {}) {

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authtoken:req.headers.authtoken,
        },
        body: JSON.stringify(body),
      });
      return response.json();
    }

    try {
      const data = await postUsers("http://localhost:8000/api/users", req.body);
      console.log('ESTE ES EL users DATA',data);
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(401).end();
    }
  }
}
//https://member-exercise.vercel.app/api/users