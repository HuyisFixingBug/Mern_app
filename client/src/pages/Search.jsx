import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import ListingItems from '../components/ListingItems';
export default function Search() {
    const navigate = useNavigate();
    const [sidebarData, setSideBarData] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
    })
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);
        console.log(listings);
    useEffect(() =>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking')
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');
        console.log(urlParams.toString());
        if(
            searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl||
            furnishedFromUrl||
            offerFromUrl||
            sortFromUrl||
            orderFromUrl
        ){
            setSideBarData({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl ==='true' ? true : false,
                furnished:  furnishedFromUrl ==='true' ? true: false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl ||'desc',
            })
        }
        const fetchListing = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`)
            const data = await res.json();
            if(data.length > 8){
                setShowMore(true)
            }
            console.log(showMore);
            setListings(data)
            setLoading(false)
        }
        fetchListing();
    },[location.search])

    const handelChange= (e) =>{
        if(e.target.id ==='all'
         || e.target.id ==='rent'
          || e.target.id === 'sale'){
            setSideBarData({
                ...sidebarData,
                type: e.target.id,
            })
        }
        if(e.target.id ==='parking'
         || e.target.id === 'furnished'
          || e.target.id ==='offer'){
            setSideBarData({
                ...sidebarData,
                [e.target.id] : e.target.checked
            })
        }
        if(e.target.id ==='searchTerm'){
            setSideBarData({
                ...sidebarData,
                searchTerm: e.target.value,
            })
        }
        if(e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] ||'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSideBarData({
                ...sidebarData,
                sort,
                order,
            })
        }
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('type', sidebarData.type);
        urlParams.set('parking', sidebarData.parking);
        urlParams.set('furnished', sidebarData.furnished);
        urlParams.set('order', sidebarData.order);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('offer', sidebarData.offer);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
    }
    const handleShowMoreListing =async () =>{
        const numberListings = listings.length;
        const startIndex = numberListings;
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        if(data.length < 9){
            setShowMore(false)
        }
        setListings([...listings, ...data])
    }
  return (
    <div className='flex flex-col md:flex-row'>
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
            <div className="flex items-center gap-2">
                <label className='font-semibold whitespace-nowrap'>Search Term: </label>
                <input
                onChange={handelChange}
                value={sidebarData.searchTerm}
                
                id='searchTerm'
                placeholder='Search...'
                className='border rounded-lg p-3 w-full'
                type="text" />
            </div>
            <div className="flex gap-2 flex-wrap items-center">
                <label className='font-semibold'>Type:</label>
                <div className="flex gap-2">
                    <input
                    onChange={handelChange}
                    checked={sidebarData.type ==='all'} id='all' type="checkbox" className='w-5' />
                    <span>Rent & Sale</span>
                </div>
                 <div className="flex gap-2">
                    <input
                    onChange={handelChange}
                    checked={sidebarData.type === 'rent'} id='rent' type="checkbox" className='w-5' />
                    <span>Rent</span>
                </div>
                 <div className="flex gap-2">
                    <input
                    onChange={handelChange}
                    checked={sidebarData.type === 'sale'} id='sale' type="checkbox" className='w-5' />
                    <span>Sale</span>
                </div>
                 <div className="flex gap-2">
                    <input
                    onChange={handelChange}
                    checked={sidebarData.offer} id='offer' type="checkbox" className='w-5' />
                    <span>Offer</span>
                </div>

            </div>
            <div className="flex gap-2 flex-wrap items-center">
                <label className='font-semibold'>Amenities:</label>
                <div className="flex gap-2">
                    <input
                    onChange={handelChange}
                    checked={sidebarData.parking} id='parking' type="checkbox" className='w-5' />
                    <span>Parking</span>
                </div>
                 <div className="flex gap-2">
                    <input
                    checked={sidebarData.furnish}
                    onChange={handelChange} id='furnished' type="checkbox" className='w-5' />
                    <span>Furnished</span>
                </div>
            </div>
             <div className="flex gap-2 items-center">
            <label className='font-semibold'>Sort:</label>    
            <select
            onChange={handelChange}
            defaultValue={'created_at_desc'}
            className='p-3 rounded-lg border' id="sort_order">
                <option value="regularPrice_desc">Price high to low</option>
                <option value="regularPrice_asc">Price low to high</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
            </select>
            </div> 
            <button className='p-3 
            hover:opacity-90
            rounded-lg bg-slate-700 text-white uppercase'>Search</button>
        </form>
      </div>


      <div className="">
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing Results:</h1>
        <div className="flex p-6 flex-wrap gap-4">
        {!loading && listings.length === 0 &&(
            <p>No Listing found!</p>
        )}
        {listings && listings.map((listing)=> (
            <ListingItems key={listing._id} listing = {listing}/>
        ))}
        </div>
        {showMore && (
            <button
                onClick={handleShowMoreListing}
            className='text-green-700 p-7 hover:underline text-center w-full'>Show More Listings</button>
        )}
      </div>
    </div>
  )
}
