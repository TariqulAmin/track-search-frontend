import React from 'react'

function Track({ track, handleTrackLick }) {
    return (
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
                            alt=""
                        />
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
    )
}

export default Track