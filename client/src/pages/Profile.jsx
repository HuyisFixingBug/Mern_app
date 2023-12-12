import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { app } from '../../firebase';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { useDispatch } from 'react-redux';
import { updateUserStart, updateUserSuccess, updateUserFailure,
deleteUserFailure,deleteUserSuccess, deleteUserStart } from '../../redux/user/userSlice.js';
function Profile() {
  const dispatch = useDispatch();
  const {currentUser, loading, error} = useSelector((state) => state.user)
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined)
  const [filePer, setFilePer] = useState(0)
  const [errorUpload, setErrorUpload] = useState(false);
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)
    // console.log(filePer);
    // console.log(formData);

  // console.log(file);
  useEffect(() =>{
    if(file) {
      handleFIleUpload(file)
    }
  }, [file]);
  const handleFIleUpload = (file) =>{
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on('state_changed', 
  (snapshot) =>{
    const process = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setFilePer(Math.round(process))
    // console.log(process);
    // console.log(filePer);
  }
  , (error) =>{
    setErrorUpload(true);
  },
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => setFormData({...formData, avatar: downloadURL}))
    
  }
  )

  }
  // firebase storage
  //  allow read;
  //     allow write: if
  //     request.resource.size < 2 * 1024 * 10 &&
  //     request.resource.contentType.matches('image/.*')
  const handleChange = (e) =>{
        setFormData({...formData, [e.target.id]: e.target.value});
  }
  const handleSubmit =async (e) =>{
      e.preventDefault();
      try {
        dispatch(updateUserStart())
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
        const data = await res.json();
        if(data.success === false) {
          dispatch(updateUserFailure(data.message)) ;
          return;
        }
        dispatch(updateUserSuccess(data))
        setUpdateSuccess(true)
      } catch (error) {
        dispatch(updateUserFailure(error.message))
      }
  }
  const handleDeleteUser = async() =>{
    try {
      dispatch(deleteUserStart())
      const res= await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      })
      const data = await res.json();
      if(data.success ===false) {
        dispatch(deleteUserFailure(data.message))
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
}
  return (
    <div>
             <div className="p-3 max-w-lg mx-auto">
              <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
              <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input onChange={(e) =>{setFile(e.target.files[0])}} type="file" ref={fileRef} hidden accept='image/*'/>
                    <img onClick={() =>fileRef.current.click()} src={formData.avatar||currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
                    <p className='text-sm self-center'>
                      {errorUpload ? (<span className='text-red-700'>Error Image Upload</span>)
                    : filePer >0 && filePer <100 ? (<span className='text-slate-700'>
                      {`Uploading ${filePer}%`}
                    </span>)  : filePer ===100 ? (<span className='text-green-700'>Image successfully upload!</span>)
                    : ('') 
                    }

                    </p>
                    <input onChange={handleChange} defaultValue={currentUser.username} type="text" placeholder='username' id='username' className='border p-3 rounded-lg' />
                    <input onChange={handleChange} defaultValue={currentUser.email} type="email" placeholder='email' id='email' className='rounded-lg p-3 border'/>
                    <input onChange={handleChange} type="text" placeholder='password' id='password' className='border p-3 rounded-lg' />
                    <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>update</button>
              </form>
              <div className="flex justify-between mt-5">
                <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete User</span>
                <span className='text-red-700 cursor-pointer'>Sign out</span>
              </div>
             </div>
    </div>
  )
}

export default Profile

