import Header from "./Header";
import CarteEpisode from "./CarteEpisode";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function PageEpisode() {
    const [episodes, setEpisodes] = useState([]);
    const [loaded, setLoaded] = useState(false);
    var listeEpisode = [];
    const page = useParams();
    var pagemoins = page.page==1 ? 1 : page.page - 1;
    var pageplus = page.page==3 ? 3 : parseInt(page.page) + +1;
    console.log(page);


    useEffect(() => {
        var a = `https://rickandmortyapi.com/api/episode?page=${page.page}`;
        console.log(a);
        fetch(a)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setEpisodes(data.results);
                console.log(data.results);
            });
        setLoaded(true);
    }, [page]);

    if (loaded) {
        for (let index = 0; index < episodes.length; index++) {
            listeEpisode.push(
                <CarteEpisode key={index} page={page.page} data={episodes[index]} />
            );
        }
    }

    return (
        <>
            <Header />
            <div className="flex w-full">
                <div className="ml-2  bg-slate-800 mt-3 mt-3 p-2 text-white rounded-xl mr-auto">
                <Link
                    to={"/episodes/" + pagemoins}
                    className="flex items-center"
                    relative="path"
                >
                    &larr; Page précédente</Link>
                </div>
                <div className="mr-2 bg-slate-800 mt-3 p-2 rounded-xl text-white ml-auto">
                <Link
                    to={"/episodes/" + pageplus}
                    className="flex items-center"
                    relative="path"
                >
                    Page suivante &rarr;</Link>
                
                </div>
            </div>
            <div>{loaded && listeEpisode}</div>
        </>
    );
}
