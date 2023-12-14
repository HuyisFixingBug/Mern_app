import React from 'react'

function createListing() {
  return (
    <div>
      <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
        <form className='flex flex-col sm:flex-row gap-4'>
            <div className="flex flex-col gap-4 flex-1">
                <input
                className='border p-3 rounded-lg'
                type="text" placeholder='Name' id='name' required/>
                <textarea
                className='rounded-lg p-3 border'
                placeholder='Description' id="description" required></textarea>
                <input 
                className='p-3 rounded-lg border'
                type="text" id="address" placeholder='Address' required/>

                <div className="flex gap-6 flex-wrap">
                    <div className="flex gap-2">
                        <input type="checkbox" id='sale' className='w-5' />
                        <span>Sell</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" className='w-5' id='rent' />
                        <span>Rent</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" className='w-5' id='parking' />
                        <span>Parking spot</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" className='w-5' id='furnished' />
                        <span>Furnished</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" className='w-5' id='offer' />
                        <span>Offer</span>
                    </div>
                </div>
                <div className="flex gap-6 flex-wrap">
                    <div className="flex items-center gap-2">
                        <input type="number" id='bedrooms' min='1' max='10' required
                        className='p-3 border border-gray-300 rounded-lg'
                        />
                        <p>Beds</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="number" id='bathrooms' min='1' max='10' required
                        className='p-3 border border-gray-300 rounded-lg'
                        />
                        <p>Baths</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="number"
                         id='regularPrice' min='1'
                          max='10' required
                        className='p-3 border border-gray-300 rounded-lg'
                        />
                        <div className="flex flex-col items-center">
                        <p>Regular Price</p>
                        <span className='text-sm'>($ / month)</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="number" id='discountPrice' min='1' max='10' required
                        className='p-3 border border-gray-300 rounded-lg'
                        />
                        <div className="flex flex-col items-center">
                        <p>Discount Price</p>
                        <span className='text-sm'>($ / month)</span>
                        </div>
                    </div>

                </div>
            </div>
            <div className="flex flex-col flex-1 gap-4">
                <p className='font-semibold'>Images:
                <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
                
                </p>
                <div className="flex gap-4">
                    <input
                    className='p-3 border cursor-pointer border-gray-300 rounded w-full'
                    type="file"  id="images" accept='image/*' multiple />
                    <button className='text-green-700 p-3 border
                    disabled:opacity-80
                    border-green-600 rounded-lg uppercase hover:shadow-lg hover:opacity-90'>Upload</button>
                </div>
                <button className='uppercase p-3 bg-slate-700 rounded-lg text-white hover:opacity-90 disabled:opacity-80'>Create Listing</button>
            </div>
        </form>
      </main>
    </div>
  )
}

export default createListing
