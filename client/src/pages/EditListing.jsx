import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { app } from '../../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
    function EditListing() {
    const navigate = useNavigate();
    const [files, setFiles] = useState([])
    const [formData, setFormData] = useState({
        imagesUrls: [],
        name: '',
        description: "",
        address: "",
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 0,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
    })
    const [uploadImageError, setUploadImageError] = useState(false);
    const [error, setError] = useState(false);
    const [uploading, SetUploading] = useState(false)
    const [loading, SetLoading] = useState(false);
    const {currentUser} = useSelector((state) => state.user)
    const params = useParams()
    useEffect(() =>{
        const getListingFromUseEffect =async () =>{
              try {
            const res= await fetch(`/api/listing/get/${params.listingId}`);
            const data = await res.json();
            if(data.success===false){
                console.log(data.message); return;
            }
            setFormData(data);
         } catch (error) {
            console.log(error);
         }
        }
       getListingFromUseEffect();
    }, [])
    const handleImagesSubmit = (e) =>{
        SetUploading(true);
            if(files.length > 0 && files.length + formData.imagesUrls.length <7){
                const promises = [];
                for (let i = 0; i < files.length; i++) {
                    promises.push(storageImage(files[i]));
                }
                Promise.all(promises).then((urls) =>{
                    setFormData({...formData, imagesUrls: formData.imagesUrls.concat(urls)});
                    console.log(promises);
                    SetUploading(false)
                     setUploadImageError(false);
                }).catch((err) =>{
                    setUploadImageError('Image upload failed (2 mb max per image)')
                    SetUploading(false)
                })
               

            } else if(files.length==0) {
                setUploadImageError('No images is chosen!!!')
                    SetUploading(false)

            }
            else{
                setUploadImageError('You can only upload 6 images per listing')
                    SetUploading(false)

            }
    }  
    const storageImage = async (file) =>{
        return new Promise((resolve, reject) =>{
            const storage = getStorage(app);
            const fileName = new Date().getTime+ file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef,file);
            uploadTask.on(
                "state_changed",
                (snapshot) =>{  
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) =>{
                        reject(error)
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
                        resolve(downloadURL);
                    })
                }
            )   
        })
    }
    console.log(formData);
    const handleChange = (e) =>{
            if(e.target.id ==='rent' || e.target.id ==='sale'){
                    setFormData({
                        ...formData,
                        type: e.target.id
                    })
            }
            if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id ==='offer'){
                setFormData({
                    ...formData,
                    [e.target.id] : e.target.checked,
                })
            }
            if(e.target.type === 'number' ||  e.target.type ==='text' || e.target.type =='textarea'){
                setFormData({
                    ...formData,
                    [e.target.id] : e.target.value
                })
            }
    }
    const handleSubmit =async (e) =>{
        
        e.preventDefault();
        try {
            if(+formData.regularPrice < +formData.discountPrice) {
                return setError('Discount Price must be lower than Regular Price')
            }
                  if(formData.imagesUrls.length < 1){
                    return setError('You must upload at least one image.')
                }
                SetLoading(true);
                setError(false);
                // console.log("1222222", formData)
                    const res = await fetch(`/api/listing/edit/${params.listingId}`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...formData,
                        userRef: currentUser._id,
                    })
                })
                const data = await res.json();
                SetLoading(false);
                if(data.success ===false){
                    setError(data.message);
                }
                console.log("here is data", data);
                navigate(`/listing/${data._id}`);
            }

         catch (error) {
            setError(error.message);
            SetLoading(false);
        }
          
    }
   const handleDeleteImage = (index) =>{
            setFormData({
                ...formData,
                imagesUrls: formData.imagesUrls.filter((_,i) => i!== index)
            })
   }
    return (
    <div>
      <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Update Listing</h1>
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
            <div className="flex flex-col gap-4 flex-1">
                <input
                 onChange={handleChange}
                value={formData.name}
                className='border p-3 rounded-lg'
                type="text" placeholder='Name' id='name' required/>
                <textarea 
                onChange={handleChange}
                value={formData.description}
                className='rounded-lg p-3 border'
                placeholder='Description' id="description" required></textarea>
                <input
                 onChange={handleChange}
                value={formData.address}
                className='p-3 rounded-lg border'
                type="text" id="address" placeholder='Address' required/>

                <div className="flex gap-6 flex-wrap">
                    <div className="flex gap-2">
                        <input
                        onChange={handleChange}
                        checked={formData.type === 'sale'}
                        type="checkbox" id='sale' className='w-5' />
                        <span>Sell</span>
                    </div>
                    <div className="flex gap-2">
                        <input 
                        onChange={handleChange}
                        checked={formData.type === 'rent'}
                        type="checkbox" className='w-5' id='rent' />
                        <span>Rent</span>
                    </div>
                    <div className="flex gap-2">
                        <input
                        onChange={handleChange}
                        checked={formData.parking}
                        type="checkbox" className='w-5' id='parking' />
                        <span>Parking spot</span>
                    </div>
                    <div className="flex gap-2">
                        <input 
                        onChange={handleChange}
                        checked={formData.furnished}
                        type="checkbox" className='w-5' id='furnished' />
                        <span>Furnished</span>
                    </div>
                    <div className="flex gap-2">
                        <input
                        onChange={handleChange}
                        checked={formData.offer}
                        type="checkbox" className='w-5' id='offer' />
                        <span>Offer</span>
                    </div>
                </div>
                <div className="flex gap-6 flex-wrap">
                    <div className="flex items-center gap-2">
                        <input 
                        onChange={handleChange}
                        value={formData.bedrooms}
                        type="number" id='bedrooms' min='1' max='10' required
                        className='p-3 border border-gray-300 rounded-lg'
                        />
                        <p>Beds</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <input 
                        onChange={handleChange}
                        value={formData.bathrooms}
                        type="number" id='bathrooms' min='1' max='10' required
                        className='p-3 border border-gray-300 rounded-lg'
                        />
                        <p>Baths</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <input 
                        onChange={handleChange}
                        value={formData.regularPrice}
                        type="number"
                         id='regularPrice'
                          min='50'
                          max='10000000' required
                        className='p-3 border border-gray-300 rounded-lg'
                        />
                        <div className="flex flex-col items-center">
                        <p>Regular Price</p>
                        {formData.type ==='rent' && (
                        <span className='text-sm'>($ / month)</span>

                        )}
                        </div>
                    </div>
                    {formData.offer && (
                        <div className="flex items-center gap-2">
                        <input
                        onChange={handleChange}
                        value={formData.discountPrice}
                        type="number" id='discountPrice' min='50' max='100000' required
                        className='p-3 border border-gray-300 rounded-lg'
                        />
                        <div className="flex flex-col items-center">
                        <p>Discount Price</p>
                        {formData.type ==='rent' && (
                        <span className='text-sm'>($ / month)</span>
                        )}
                        </div>
                    </div>
                    )}
                    

                </div>
            </div>
            <div className="flex flex-col flex-1 gap-4">
                <p className='font-semibold'>Images:
                <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
                
                </p>
                <div className="flex gap-4">
                    <input onChange={(e)=>{setFiles(e.target.files)}}
                    className='p-3 border cursor-pointer border-gray-300 rounded w-full'
                    type="file"  id="images" accept='image/*' multiple />
                    <button disabled={uploading} type='button' onClick={handleImagesSubmit}
                     className='text-green-700 p-3 border
                    disabled:opacity-80
                    border-green-600 rounded-lg uppercase hover:shadow-lg hover:opacity-90'>{uploading ? 'Uploading...': 'Upload'}</button>
                </div>
               <p className='text-red-700'>{uploadImageError && uploadImageError}</p> 
               {
                formData.imagesUrls.length > 0 && formData.imagesUrls.map((image, index) =>(

                    <div className="flex justify-between items-center">
                        <img src={image} alt="listing image" className='w-20 h-20 object-cover rounded-lg' />
                        <button onClick={() =>handleDeleteImage(index)} className='p-3 bg-red-500 rounded-lg text-white hover:opacity-80' type='button'>Delete</button>
                        </div>
                    
                ))
               }    
               <p className='text-red-500'>{error && error}</p>
                <button
                type='submit'
                className='uppercase p-3 bg-slate-700 rounded-lg text-white hover:opacity-90 disabled:opacity-80'>Update Listing</button>
            </div>
        </form>
      </main>
    </div>
  )
}

export default EditListing
