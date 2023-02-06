import axios from 'axios'
const MY_SERVER="http://127.0.0.1:8000/"

export function login(cred:any) {
  console.log(cred)
  return new Promise<{ data: any }>((resolve) =>
    axios.post(MY_SERVER +"login/",cred).then(res=> resolve({ data: res.data }))
  );
}
