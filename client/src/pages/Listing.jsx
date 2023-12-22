import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
function Listing() {
const [formData, setFormData] = useState([])

    const params = useParams()
    useEffect(() =>{
        const fetchListing = async() =>{
            try {
            const res = await fetch(`/api/listing/get/${params.listingId}`);
            const data = await res.json();
            if(data.success===false){
                console.log(data.message);
                return;
            }
            setFormData(data)
        } catch(error) {
            console.log(error);
        }
        }
        fetchListing()
    }, [params.listingId])
  return (
    <div>
      listing pages
      {formData && (
        <p>{ formData.name}</p>
       
      )
    }
    </div>
  )
}

export default Listing
