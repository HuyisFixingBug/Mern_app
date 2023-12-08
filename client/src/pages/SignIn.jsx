import React from 'react'
import {Link, useNavigate} from "react-router-dom"
import { useState } from 'react'
import {useSelector, useDispatch} from "react-redux"
import { signInStart, singInSuccess, signInFailure } from "../../redux/user/userSlice.js"
function SignIn() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
// const [error, setError] = useState(null);
// const [loading, setLoading] = useState(false)
const {loading, error} = useSelector((state) => state.user)
const navigate = useNavigate();
const handleChange = (e) =>{
  setFormData({
    ...formData,
    [e.target.id] : e.target.value,
  })

}
  console.log(FormData);
const handleSubmit =  async (e) =>{
  e.preventDefault();
  try {
    // setLoading(true);
    dispatch(signInStart());
    const res = await fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    const data = await res.json();
    console.log("data from backend res", data);
    if(data.success === false){
     dispatch(signInFailure(data.message))
      return;
    }
    dispatch(singInSuccess(data))
    navigate('/');
  } catch (error) {
    dispatch(signInFailure(error.message))
  }
}
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        {/* <input onChange={handleChange} type="text" placeholder='username' className='border p-3 rounded-lg' id='username'/> */}
        <input onChange={handleChange} type="email" placeholder='email' className='border p-3 rounded-lg' id='email' />
        <input onChange={handleChange} type="password" placeholder='password' className='border p-3 rounded-lg'  id='password' />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
          <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
        {error && <p className='text-red-500 mt-8'>{error}</p>}

    </div>

  )
}

export default SignIn
