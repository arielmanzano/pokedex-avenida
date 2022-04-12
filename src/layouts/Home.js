import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/pokedex')
    }, []);

    return <Spinner />
}

export default Home;