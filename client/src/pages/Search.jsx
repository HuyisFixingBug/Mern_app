import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row'>
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className='flex flex-col gap-8'>
            <div className="flex items-center gap-2">
                <label className='font-semibold whitespace-nowrap'>Search Term: </label>
                <input
                id='searchTerm'
                placeholder='Search...'
                className='border rounded-lg p-3 w-full'
                type="text" />
            </div>
            <div className="flex gap-2 flex-wrap items-center">
                <label className='font-semibold'>Type:</label>
                <div className="flex gap-2">
                    <input id='all' type="checkbox" className='w-5' />
                    <span>Rent & Sale</span>
                </div>
                 <div className="flex gap-2">
                    <input id='rent' type="checkbox" className='w-5' />
                    <span>Rent</span>
                </div>
                 <div className="flex gap-2">
                    <input id='sale' type="checkbox" className='w-5' />
                    <span>Sale</span>
                </div>
                 <div className="flex gap-2">
                    <input id='offer' type="checkbox" className='w-5' />
                    <span>Offer</span>
                </div>

            </div>
            <div className="flex gap-2 flex-wrap items-center">
                <label className='font-semibold'>Amenities:</label>
                <div className="flex gap-2">
                    <input id='parking' type="checkbox" className='w-5' />
                    <span>Parking</span>
                </div>
                 <div className="flex gap-2">
                    <input id='furnished' type="checkbox" className='w-5' />
                    <span>Furnished</span>
                </div>
            </div>
             <div className="flex gap-2 items-center">
            <label className='font-semibold'>Sort:</label>    
            <select  className='p-3 rounded-lg border' id="sort_order">
                <option value="">Price high to low</option>
                <option value="">Price low to high</option>
                <option value="">Latest</option>
                <option value="">Oldest</option>
            </select>
            </div> 
            <button className='p-3 
            hover:opacity-90
            rounded-lg bg-slate-700 text-white uppercase'>Search</button>
        </form>
      </div>


      <div className="">
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing Results:</h1>
      </div>
    </div>
  )
}
