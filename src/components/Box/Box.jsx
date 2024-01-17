import { useState } from "react";

function Box({children}) {
    const [isOpen, setIsOpen] = useState(true);
    const handleSetIsOpen = () => {
      setIsOpen(!isOpen);
    }
    
  return (
    <div className='box'>
        <button className="btn-toggle" onClick={handleSetIsOpen}>
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && children}
    </div>
  )
}

export default Box