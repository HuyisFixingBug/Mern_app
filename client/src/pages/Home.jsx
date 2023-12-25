import 'swiper/css';
import 'swiper/css/bundle';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation} from 'swiper/modules'
import SwiperCore from 'swiper'
import ListingItems from '../components/ListingItems';


function Home() {
  SwiperCore.use([Navigation])
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);

  useEffect (() =>{
    const fetchOffer = async() =>{
      try {
        const res= await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRent()
      } catch (error) {
        console.log(error);
      }
    }
      const fetchRent = async() =>{
      try {
        const res= await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSale()
      } catch (error) {
        console.log(error);
      }
    }
      const fetchSale = async() =>{
      try {
        const res= await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    }
      fetchOffer()
  },[])
  console.log(offerListings);
  console.log(rentListings);
  console.log(saleListings);
  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
          <h1 className='text-3xl text-slate-700 lg:text-6xl font-bold'>Find your next <span className='text-slate-500'>perfect <br/></span> place with ease</h1>
          <div className="text-slate-400 text-xs sm:text-sm">
          Traveling will help you find your home fast, easy and comfortable. <br/>
          Our expert support are always available.
          </div>
          <Link  to='/search' className='text-blue-800 font-bold text-xs sm:text-lg hover:underline'>Let's Start now...</Link>
      </div>

{/* Middle Swiper */}
        <Swiper navigation  slidesPerView={1} loop={false}>
          {offerListings && offerListings.length > 0 && 
          offerListings.map((listing) => (
              <SwiperSlide>
                <div className="h-[550px]">
            <img key={listing._id}
            className='w-full h-full object-cover'
            src={listing.imagesUrls[0]} alt="listing cover" />
            </div>
              </SwiperSlide>
          ))
          }
      </Swiper>
{/* footer */}
      <div className="flex max-w-6xl mx-auto p-3 flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to='/search?offer=true'>
              Show more offers
              </Link>
              <div className="flex gap-6 flex-wrap">
                {offerListings.map((listing) =>(
                  <ListingItems listing={listing} key = {listing._id}/>
                ))}
              </div>
            </div>
          </div>
        )}
        
         {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-600'>Recent rents</h2>
              <Link className='text-sm text-blue-800 hover:underline' to='/search?type=rent'>
              Show more offers
              </Link>
              <div className="flex gap-6 flex-wrap">
                {rentListings.map((listing) =>(
                  <ListingItems listing={listing} key = {listing._id}/>
                ))}
              </div>
            </div>
          </div>
        )}

         {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-600'>Recent sales</h2>
              <Link className='text-sm text-blue-800 hover:underline' to='/search?type=sale'>
              Show more offers
              </Link>
              <div className="flex gap-6 flex-wrap">
                {saleListings.map((listing) =>(
                  <ListingItems listing={listing} key = {listing._id}/>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
