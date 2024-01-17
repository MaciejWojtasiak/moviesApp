import { useState } from "react";
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
    const [rating, setRating] = useState(1);
    const handleRating = (rating) => {
        setRating(rating);
    }
  return (
    <div className="rating">
        <div style={containerStyle}>
            <div style={starContainerStyle}>
                {Array.from({length:5}, (_,i)=>(
                    <Star 
                        key={i} 
                        onRate={()=>handleRating(i + 1)}                       
                        full={rating >= i + 1}
                    />
                ))}
            </div>  
            <p style={textStyle}>{rating || ''}</p>         
        </div>        
    </div>
  )
}

export default StarRating;