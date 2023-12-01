import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import options from '../assets/White Option.svg'
import logut_img from '../assets/logout.png'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <div className="user">
        <div className="userbox">
          <img src={currentUser.photoURL} alt="" />
          <span>{currentUser.displayName}</span>
        </div>
        <div className='buttons'>
        <button><img src={options} alt="3dot" /></button>
        <button onClick={()=>signOut(auth)}> <img src={logut_img} alt="logout"/></button>
        </div>
        
      </div>
    </div>
  )
}

export default Navbar