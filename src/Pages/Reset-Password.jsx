import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthContext';


function ResetPassword() {

    const location = useLocation();
    const [password, setNewpassword] = useState('');
    const [confirmPassword, setConfirmpassword] = useState('');
    const search = location.search;
    const searchParams = new URLSearchParams(search);
    const user_id = searchParams.get("id");
    const { fetchData, fetchDataFav } = useContext(AuthContext);
    useEffect(() => {
      fetchDataFav();
    }, []);
  
    useEffect(() => {
      fetchData();
    }, []);




    const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword ){
         toast.error('Invalid Password');
    }else{
          try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/reset-password`, { password, user_id });

      if (response.status === 200) {
      console.log('success');
      }  else if (response.data.statusCode === 100) {
         toast.error(response.data.message);
      }
    } catch (error) {
      console.log('type error');
    }
        }
}






  return (
    <div>
         <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password</label>
          <input type="password" value={password} onChange={(e) => setNewpassword(e.target.value)} />
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmpassword(e.target.value)} />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
    </div>
  )
}

export default ResetPassword