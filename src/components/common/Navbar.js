import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

function Navbar({ profile }) {
  const history = useHistory()
  const [dropdown, setDropdown] = useState(false)
  const handleLogout = () => {
    localStorage.removeItem('token')
    return history.push('/home')
  }
  return (
    <nav>
      <div className="navbar-menu">
        <li><Link to='/'>Home</Link></li>
      </div>
      <div className="navbar-end" onMouseLeave={() => setDropdown(false)}>
        <li>
          <Link to="/profile">
            <h4 style={{ color: 'white' }} className="username">{profile?.username}</h4>
          </Link>
        </li>
        <li>
          <div
            className="circle" onClick={() => setDropdown(!dropdown)}>
            <img src={profile?.profilePic} />
          </div>
          {dropdown && <div className="dropdown">
            <div>
              <Link to="/profile">
                Profile
              </Link>
            </div>
            <div>
              <button onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
          }
        </li>
      </div >
    </nav >
  )
}

export default Navbar
