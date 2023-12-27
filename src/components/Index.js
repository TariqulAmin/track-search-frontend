import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AudioPlayer from "./AudioPlayer";
import Track from "./Track";

const Index = () => {
    const [tracks, setTracks] = useState([])
    const [loading, setLoading] = useState(false)
    const [userInput, setUserInput] = useState("")
    const [url, setUrl] = useState("")

    const API_URL = "https://track-search-backend.onrender.com/api"
    const errorMessage = "Please input something"

    const getData = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${API_URL}/tracks/search?searchText=${userInput}`);
            if (data.status === "ok") {
                setTracks(data.payload);
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const findTrack = e => {
        e.preventDefault();
        if (userInput === "") {
            toast.error(errorMessage, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
                hideProgressBar: true
            });
            return
        }
        getData()
    };

    const onChange = e => {
        setUserInput(e.target.value);
    };

    const handleTrackLick = (url) => {
        setUrl(url)
    }
    return (
        <>
            <div className="card card-body mb-4 p-4">
                <h1 className="display-4 text-center">
                    <i className="fas fa-music" /> Search For A Song
                </h1>
                <form onSubmit={findTrack}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Song title..."
                            name="userInput"
                            value={userInput}
                            onChange={onChange}
                        />
                    </div>
                    <button className="w-100 btn btn-primary btn-lg mt-3 mb-5" type="submit">
                        Search
                    </button>
                </form>
            </div>
            <div className="row">
                <h3 className="text-center mb-4">Search Result</h3>
                {loading ? <Spinner /> : tracks === undefined || tracks.length === 0 ? <h4 className="text-center mb-4 mt-5">No song found</h4> :
                    (tracks.map(track => (
                        <Track
                            track={track}
                            handleTrackLick={handleTrackLick}
                        />
                    )))}
            </div>
            <AudioPlayer url={url} />
            <ToastContainer />
        </>
    );
};

export default Index;
