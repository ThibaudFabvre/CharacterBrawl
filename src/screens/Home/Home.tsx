import { Link } from 'react-router-dom';

const Home = () => {
    return(
        <>
            <Link to="/login"><button>Login</button></Link>
            <Link to="/register"><button>SignUp</button></Link>
        </>
    )
}

export default Home;