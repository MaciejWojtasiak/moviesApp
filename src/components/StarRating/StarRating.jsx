import { useEffect, useState } from "react";
import Star from "../../Star";

const containerStyle = {
    display:'flex',
    alignItems:'center',
    gap:'12px'
}

const starContainerStyle = {
    display:'flex',
    gap:'2px'
}

const textStyle = {
    lineHeight:'1',
    margin:'0'
}

function StarRating() {  
    const [rating, setRating] = useState(0);
    const [tempRating, setTempRating] = useState(0);  
    const [isRated, setIsRated] = useState(false);  

    const handleRating = (rating) => {
        setRating(rating);
        setIsRated(true);
    }
     
  return (
    <div className="rating">
        <div style={containerStyle}>
            <div style={starContainerStyle}>
                {Array.from({length:10}, (_,i)=>(
                    <Star 
                        key={i} 
                        full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
                        onRate={()=>handleRating(i + 1)}                       
                        onHoverIn = {()=>setTempRating(i+1)}
                        onHoverOut = {()=>setTempRating(0)}
                    />
                ))}
            </div>  
            <p style={textStyle}>{tempRating || ''}</p>         
        </div>        
        {isRated && <button className="btn-add">+ Add to list</button>}        
    </div>
  )
}

export default StarRating;