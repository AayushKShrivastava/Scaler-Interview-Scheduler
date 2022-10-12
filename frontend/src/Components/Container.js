import React, {useEffect} from 'react'
import '../css/Container.css'
import Interviews from './Interviews'
import Searchbar from './Searchbar'
import API from '../api/api'
import { constants } from '../constants/constants'

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