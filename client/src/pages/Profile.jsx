import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { app } from '../../firebase';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
function Profile() {
  const {currentUser} = useSelector((state) => state.user)
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined)
  const [filePer, setFilePer] = useState(0)
  const [errorUpload, setErrorUpload] = useState(false);
  const [formData, setFormData] = useState({})
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
  return (
    <div>
             <div className="p-3 max-w-lg mx-auto">
              <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
              <form className='flex flex-col gap-4'>
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
                    <input type="text" placeholder='username' id='username' className='border p-3 rounded-lg' />
                    <input type="email" placeholder='email' id='password' className='rounded-lg p-3 border'/>
                    <input type="text" placeholder='password' id='password' className='border p-3 rounded-lg' />
                    <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>update</button>
              </form>
              <div className="flex justify-between mt-5">
                <span className='text-red-700 cursor-pointer'>Delete User</span>
                <span className='text-red-700 cursor-pointer'>Sign out</span>
              </div>
             </div>
    </div>
  )
}

export default Profile

//  const handleFileUpload = (file) => {
//     const storage = getStorage(app);
//     const fileName = new Date().getTime() + file.name;
//     const storageRef = ref(storage, fileName);
//     const uploadTask = uploadBytesResumable(storageRef, file);

    // uploadTask.on(
    //   'state_changed',
    //   (snapshot) => {
    //     const progress =
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     setFilePerc(Math.round(progress));
    //   },
    //   (error) => {
    //     setFileUploadError(true);
    //   },
    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
    //       setFormData({ ...formData, avatar: downloadURL })
    //     );
    //   }
    // );
  