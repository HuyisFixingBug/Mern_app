import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { app } from '../../firebase';
import {getDownloadURL, getStorage, list, ref, uploadBytesResumable} from 'firebase/storage'
import { useDispatch } from 'react-redux';
import { updateUserStart, updateUserSuccess, updateUserFailure,
deleteUserFailure,deleteUserSuccess, deleteUserStart, signOutStart, signOutFailure, signOutSuccess } from '../../redux/user/userSlice.js';
import { Link } from 'react-router-dom';
import { Next } from 'react-bootstrap/esm/PageItem.js';
function Profile() {
  const dispatch = useDispatch();
  const {currentUser, loading, error} = useSelector((state) => state.user)
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined)
  const [filePer, setFilePer] = useState(0)
  const [errorUpload, setErrorUpload] = useState(false);
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [errorShowListing, setErrorShowListing] = useState(false)
  const [ShowListing, setShowListing] = useState([])
    // console.log(filePer);
    // console.log(formData);

  // console.log(file);
useEffect(() => {
    if (updateSuccess) {
      const timer = setTimeout(() => {
        // Đặt lại updateSuccess thành false sau 5 giây
        setUpdateSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [updateSuccess]);

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
    if(window.confirm('Are sure want to be deleted user?')) {
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
  } else {
    return;
  }
}
const handleSignOut = async() =>{
  try {
    dispatch(signOutStart());
    const res = await fetch('/api/auth/sign-out');
    const data = await res.json();
    if(data.success === false){
      dispatch(signOutFailure(data.message)); return;
    }
    dispatch(signOutSuccess(data));
  } catch (error) {
    dispatch(signOutFailure(error.message));
  }
}
const handleShowListing = async() =>{
  try {
    setErrorShowListing(false);
    const res = await fetch(`/api/listing/listings/${currentUser._id}`);
    const data = await res.json();
    if(data.success===false) {
      setErrorShowListing(true);
      return;
    }
    
      setErrorShowListing(false);
      setShowListing(data)
    
  } catch (error) {
    setErrorShowListing(true);
  }
}
const handleDeleteListing = async(idListing) =>{
      try {
        const res = await fetch(`/api/listing/delete/${idListing}`,{
          method: 'DELETE',
        });
        const data = await res.json();
        if(data.success === false){
          console.log(data.message);
          return;
        }
        setShowListing((prev) => {
            prev.filter((listing) => listing._id !== idListing)
        })
      } catch (error) {
        console.log(error.message);
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
                    <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>{loading? 'Loading...': 'update'}</button>
                    <Link className='p-3 bg-green-700 rounded-lg uppercase text-center text-white hover:opacity-90' to={"/create-listing"}>Create Listing</Link>

              </form>
              <div className="flex justify-between mt-5">
                <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete User</span>
                <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign out</span>
                 
              </div>
              <p className='text-red-700 mt-5'>{error ? error : ''}</p>
              <p className='text-green-700 mt-5 self-center text-center'>
              {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
             </div>
              <button onClick={handleShowListing}  className='text-green-700 mt-5 w-full text-center items-center text-lg' >Show Listing</button>
                  {ShowListing && ShowListing.length > 0 &&(
                    <div className="flex gap-4 flex-col max-w-lg mx-auto p-3">
                      <h1 className='text-center mt-7 text-2xl font-semibold'>Your Listing</h1>
                      {ShowListing.map((listing) =>(
                        <div key={listing._id} className="flex border rounded-lg p-3 justify-between items-center gap-4">
                          <Link>
                          <img className='h-16 w-16 object-contain' src={listing.imagesUrls} alt="Listing cover" />
                          </Link>
                          <Link className='flex-1'>
                          <p className='font-semibold'>{listing.name}</p>
                          </Link>
                          <div className="flex flex-col items-center">
                            
                              <button onClick={() =>handleDeleteListing(listing._id)} className='text-red-700 uppercase hover:opacity-90 hover:shadow'>delete</button>
                              <Link to={`/edit-listing/${listing._id}`}>
                            <button  className='text-green-700 uppercase hover:opacity-90 hover:shadow'>
                              edit
                            </button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
    </div>
  )
}

export default Profile

