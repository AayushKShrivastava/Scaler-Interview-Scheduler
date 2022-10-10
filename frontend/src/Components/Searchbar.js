import React from 'react'
import '../css/Searchbar.css'
import { AiOutlineSearch } from 'react-icons/ai'

function Searchbar() {
  return (
    <div className='searchbar-container'>
      <div className='searchbar'>
          <AiOutlineSearch className='search-icon'/>
          <input type='text' placeholder='Search interviews' className='search-input'/>
      </div>
    </div>
  )
}

export default Searchbar