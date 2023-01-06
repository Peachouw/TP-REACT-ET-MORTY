import Header from "./Header";
import CarteEpisode from "./CarteEpisode";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Episode() {
    const [episode, setEpisode] = useState([]);
    const [loaded, setLoaded] = useState(false);
    var listeEpisode = [];
    const page = useParams();
    console.log(page);


    useEffect(() => {
        var a = `https://rickandmortyapi.com/api/episode/${page.id}`;
        console.log(a);
        fetch(a)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                episode.push(data);
                console.log(data);
                console.log(episode);
                setLoaded(true);
            });
        
        
    }, [page]);

    
    return (
        <>
            <Header />
            <div>{loaded && <CarteEpisode data={episode[0]} />}</div>
        </>
    );
}
