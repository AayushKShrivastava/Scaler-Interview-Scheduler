import React from 'react'
import '../css/Searchbar.css'
import { AiOutlineSearch } from 'react-icons/ai'

function Searchbar({handleSearch}) {

  const onChange = (e) => {
    handleSearch((e.target.value).trim())
  }

  return (
    <div className='searchbar-container'>
      <div className='searchbar'>
          <AiOutlineSearch className='search-icon'/>
          <input type='text' placeholder='Search interviews' className='search-input' onChange={onChange}/>
      </div>
    </div>
  )
}

export default Searchbar