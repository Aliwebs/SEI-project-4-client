import { useEffect } from 'react'
import { Link } from 'react-router-dom'
function Navbar({ profile }) {
  useEffect()
  return (
    <>
      {profile &&
        <nav>
          <div className="navbar-menu">
            <li><Link to='/'>Home</Link></li>
          </div>
          <div className="navbar-end">
            <li><Link to="/profile"><h4 className="username">{profile?.username}</h4></Link></li>
            <li>
              <Link to="/profile">
                <div className="circle">
                  <img src={profile?.profilePic} />
                </div>
              </Link>
            </li>
          </div>
        </nav>
      }
    </>
  )
}

export default Navbar