import { useEffect,useState } from "react";
import { Link } from "react-router-dom";

export default function Header(){
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include' // Ensure cookies are sent with the request
    })});
    return(
        <header>
            <Link to='/' className='logo'>MyBlog</Link>
      <nav>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
      </nav>
      </header>
    )
}