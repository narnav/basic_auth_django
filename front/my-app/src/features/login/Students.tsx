import React, { useState } from 'react';
import axios from 'axios'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    loginAsync, selectLogged, selectAccess
} from './loginSlice';

const Students = () => {
    const logged = useAppSelector(selectLogged);
    const access = useAppSelector(selectAccess);
    const [myStudents, setmyStudents] = useState([])
    const getAllStudents=async ()=>{
        const MY_SERVER="http://127.0.0.1:8000/student"

        const res= await axios.get(MY_SERVER, {
            headers: {
              'Authorization': `Bearer ${access}`
            }
          })
          console.log(res.data)
          setmyStudents(res.data)
          
    }
    return (
        <div style={{ backgroundColor: "red" }}>Students
            <br></br>
            {/* {access} */}
            {logged ? <button onClick={()=>getAllStudents()}>get Students</button> : "please login"}
        {myStudents.map(stu=><div>
            Name:{stu["sName"]},Age{stu["age"]}
        </div>)
        }

        </div>
    )
}

export default Students