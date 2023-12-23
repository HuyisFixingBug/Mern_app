import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
function Contact({listing}) {
  const [landlord, setLandLord] = useState(null)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  useEffect(() => {
    const fetchUser = async() => {
        try {
          const res = await fetch(`/api/user/${listing.userRef}`);
          const data = await res.json();
          if(data.success===false) {
          setError(data.message);
          return ;
          }
          setLandLord(data);
        } catch (error) {
          setError(error);
        }
    }
        fetchUser();
  }, [listing.userRef])
  console.log(message);
  return (
    <div>
      {landlord && (
        <div className="flex flex-col gap-3">
        <span>Contact {landlord && landlord.username} for {listing.name}</span>
        <textarea value={message} onChange={(e) =>setMessage(e.target.value)} className='p-3 border rounded-lg' placeholder='Enter your message here...' rows="3"></textarea> 
        <Link className='bg-slate-700 p-3 rounded-lg uppercase text-white font-semi text-center' to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}>Send Message</Link>
        </div>
      )}
    </div>
  )
}

export default Contact
