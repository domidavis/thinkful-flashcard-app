import React from "react";

export default function StudyCard ({ card, isFlipped, length, flipHandler, cardIndex, nextCardHandler }) {

    return (
        <div className="card" style={{ width: "500px" }}>
            <div className="card-body container">
                <h5>Card {cardIndex} of {length}</h5>
                <div className="row">
                    <div className="col">
                        <p className="card-text">
                            {isFlipped ? card.back : card.front}
                        </p>
                        <button className="btn btn-secondary m-1" onClick={flipHandler}>Flip</button>
                        {isFlipped && (<button className="btn btn-primary m-1" onClick={nextCardHandler}>Next</button>)}
                    </div>
                </div>
            </div>
        </div>
    );
}