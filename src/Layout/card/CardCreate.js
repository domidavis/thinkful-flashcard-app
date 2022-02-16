import React, { useState, useEffect } from "react";
import Breadcrumb from "../home/Breadcrumb";
import { useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import CardForm from "./CardForm";


export default function CardCreate() {
    const history = useHistory();
    const { deckId } = useParams();
    const [ deck, setDeck ] = useState([]);
    const [ card, setCard ] = useState({front:"", back: ""});

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

    const handleChange = ({ target }) => {
        setCard({
            ...card,
            [target.name]: target.value,
            deckId,
        });
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        await createCard(deckId, card);
        history.push(`/decks/${deck.id}`);
    };

    return (
        <>
        <div>
            <Breadcrumb deck={deck} isNewCard={true}/>
        </div>
        <div>
            <h3>{deck.name}: Add Card</h3>
            <CardForm handleSubmit={handleSubmit} handleChange={handleChange} card={card}/>
        </div>

        </>
    );
}