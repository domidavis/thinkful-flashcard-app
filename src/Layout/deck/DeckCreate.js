import React, { useState } from "react";
import { createDeck } from "../../utils/api";
import { useHistory, Link } from "react-router-dom";
import Breadcrumb from "../home/Breadcrumb";

function DeckCreate(){
    const history = useHistory();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newDeck = await createDeck({name, description});
        setName("");
        setDescription("");
        history.push(`/decks/${newDeck.id}`);
    }

    const handleChange = ({ target }) => {
        if (target.name === "name") {
            setName(target.value);
        }
        if (target.name === "description") {
            setDescription(target.value);
        }
    }
    return (
        <div>
            <div>
                <Breadcrumb isCreating={true}/>
            </div>
            <h1>Create Deck</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name:
                    </label>
                <input
                    id="name"
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Deck Name"
                    onChange={handleChange}
                    value={name}
                    required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <textarea
                        id="description"
                        className="form-control"
                        type="text"
                        name="description"
                        placeholder="Brief description of the deck"
                        onChange={handleChange}
                        value={description}
                        rows={4}
                        required
                    />
                </div>
                <Link to={"/"}><button className="btn btn-secondary m-1">Cancel</button></Link>
                <button className="btn btn-primary m-1" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default DeckCreate;