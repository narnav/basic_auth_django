import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  loginAsync,selectLogged,logout
} from './loginSlice';
import styles from './Counter.module.css';

export function Login() {
  const logged = useAppSelector(selectLogged);
  const dispatch = useAppDispatch();

  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")                       
  return (
    <div>
      {!logged?
      <div className={styles.row}>
        Login
        Username:<input onChange={(e)=>setusername(e.target.value)}/>
        password:<input type={"password"} onChange={(e)=>setpassword(e.target.value)}/>
        <button onClick={()=>dispatch(loginAsync({username,password}))}>Login</button>
      </div>:
      <button onClick={()=>dispatch(logout())  }>Logout</button>}
    </div>
  );
}
