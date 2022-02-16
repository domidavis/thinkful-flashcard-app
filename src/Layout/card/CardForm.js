import React from "react";
import { Link } from "react-router-dom";


export default function CardForm({ handleChange, handleSubmit, card }) {
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="front" className="form-label">Front</label>
                <textarea
                    className="form-control"
                    id="front"
                    name="front"
                    rows={3}
                    placeholder="Front side of card"
                    value={card.front}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="back"
                className="form-label">Back</label>
                <textarea
                    className="form-control"
                    id="back"
                    name="back"
                    rows={3}
                    placeholder="Back side of card"
                    value={card.back}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <Link to={"/"}>
                    <button className="btn btn-secondary m-1">Cancel</button>
                </Link>
                <button className="btn btn-primary m-1" type="submit" onSubmit={handleSubmit}>
                    Submit
                </button>
            </div>
        </form>
    );
}