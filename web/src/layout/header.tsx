import React from 'react'
import './header.scss'
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {logout} from "../modules/user/user-slice";

const Header = () => {
  const {userLogged} = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  return (
    <nav id='navbar'>
      <ul className='left'>
        <li>
          <Link to="/articles">Articles</Link>
        </li>
        {userLogged &&
        <li>
          <Link to="/user">User</Link>
        </li>}
      </ul>
      <ul className='right'>
        {!userLogged ? <>
            <li>
              <Link to="/sign-up">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </> :
          <li>
            <Link to="/articles" onClick={() => dispatch(logout())}>Logout</Link>
          </li>}
      </ul>
    </nav>
  )
}

export default Header
