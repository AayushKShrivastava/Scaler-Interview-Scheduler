import React from 'react'
import '../css/Container.css'
import Interviews from './Interviews'
import Searchbar from './Searchbar'

function Container() {
  return (
    <div className='container'>
        <div className='content'>
            <Searchbar />
            <h4>Scheduled Interviews</h4>
            <Interviews />
        </div>
    </div>
  )
}

export default Container