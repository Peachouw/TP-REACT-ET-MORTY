import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CartePersonnage from "./CartePersonnage";

export default function CarteEpisode(props) {
    const [char, setChar] = useState([]);
    const [hidden, setHidden] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const listPerso = [];
    const page = useParams();

    useEffect(() => {
        props.data.characters.map((chara, i) => {
            fetch(chara)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    // console.log(data);
                    char.push(data);

                    for (let index = 0; index < char.length; index++) {
                        listPerso.push(
                            <div className="w-1/6 p-3" style={{ transform: "scale(0.7)" }}>
                                <CartePersonnage key={index} data={char[index]} />
                            </div>
                        );
                    }
                });
            setLoaded(true);
        });
    }, [page]);

    if (loaded) {
        for (let index = 0; index < char.length; index++) {
            listPerso.push(
                <div className=" p-3">
                    <CartePersonnage key={index} data={char[index]} />
                </div>
            );
        }
    }

    return (
        <div className="m-auto mt-10 w-11/12 bg-slate-200 border p-5 w-full text-center border rounded-lg shadow-xl sm:p-8 ">
            <h1 className="text-xl  font-normal leading-normal mt-0 mb-2 text-blue-800">
                {props.data.episode} - {props.data.name}
            </h1>
            <h3 className="text-l  font-normal leading-normal mt-0 mb-2">Date de sortie : {props.data.air_date} </h3>
            <button className="bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => setHidden(!hidden)}>
                {hidden ? "Afficher les personnages de l'épisode" : "Masquer les personnages de l'épisode"}
            </button>
            <div className={hidden ? "hidden" : "flex flex-rows flex-wrap justify-around"}>{loaded && listPerso}</div>
        </div>
    );
}
