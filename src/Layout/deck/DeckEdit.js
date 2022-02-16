import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { updateDeck, readDeck } from "../../utils/api";
import Breadcrumb from "../home/Breadcrumb";

export default function DeckEdit() {
    const initialFormState = {
        name: "",
        description: "",
    };

    const [ deck, setDeck ] = useState(initialFormState);
    const history = useHistory();
    const { deckId } = useParams();

    const handleChange = ({ target }) => {
        setDeck({
            ...deck,
            [target.name]: target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateDeck(deck);
        history.push(`/decks/${deck.id}`);
    };

    useEffect(() => {
        const ac = new AbortController();

        async function getDeck() {
            try {
                const apiDeck = await readDeck(deckId, ac.signal);
                setDeck(apiDeck);
            }
            catch (error) {
                throw error;
            }
        }

        getDeck();
        return () => ac.abort();
    }, [deckId]);

    return (
        <div>
            <Breadcrumb deck={deck} isEditingDeck={true} />
            <h1>Edit Deck</h1>
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
                    onChange={handleChange}
                    value={deck.name}
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
                        onChange={handleChange}
                        value={deck.description}
                        rows={4}
                        required
                    />
                </div>

                <Link to={"/"}><button className="btn btn-secondary m-1">Cancel</button></Link>
                <button className="btn btn-primary m-1" type="submit">Submit</button>
            </form>
        </div>
    )
}