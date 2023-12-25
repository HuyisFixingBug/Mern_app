import React from 'react'
import { Link } from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
export default function ListingItems({listing}) {
  return (
    <div className='bg-white
    rounded-lg shadow-md hover:shadow-lg transition-shadow
    w-full overflow-hidden sm:max-w-[330px] border'>
        <Link to={`/listing/${listing._id}`}>
      <img src={listing.imagesUrls[0]} alt="Listing cover" 
      className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
      />
      <div className="p-2 flex flex-col gap-1">
        <h1 className='font-semibold'>{listing.name}</h1>
        <div className="flex items-center gap-2">
        <MdLocationOn className='h-4 w-4 text-green-700' />
        <span>
            {listing.address}
        </span>
        </div>
        <p className=' line-clamp-2'>{listing.description}</p>
        <p className='text-slate-700 font-bold'>$
            {listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
        </p>
        <div className="flex gap-2">
            <span>{listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}</span>
            <span>{listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}</span>

        </div>
      </div>
      </Link>
    </div>
  )
}
