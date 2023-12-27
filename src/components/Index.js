import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import ReactAudioPlayer from 'react-audio-player';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
    const [tracks, setTracks] = useState([])
    const [loading, setLoading] = useState(false)
    const [userInput, setUserInput] = useState("")
    const [url, setUrl] = useState("")

    const getData = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`https://track-search-backend.onrender.com/api/tracks/search?searchText=${userInput}`);
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
            toast.error("Please input something", {
                position: toast.POSITION.TOP_RIGHT,
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
                        <div
                            style={{ cursor: "pointer" }}
                            onClick={() => handleTrackLick(track.url)}
                            key={track._id}
                            className="col-md-6">
                            <div className="card mb-4 shadow-sm">
                                <div className="card-body">
                                    <div className="row">
                                        <img
                                            className="col-4 img-responsive"
                                            src={track.artwork}
                                            alt="" />
                                        <div className="card-text col-8">
                                            <div>
                                                <span className="fw-bold">Title:</span>  {track.title}
                                            </div>
                                            <div className="mb-3">
                                                <span className="fw-bold">Artist:</span> {track.artist}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )))}
            </div>
            <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
                <ReactAudioPlayer
                    src={url}
                    autoPlay
                    controls
                />
            </div>
            <ToastContainer />

        </>
    );
};

export default Index;
