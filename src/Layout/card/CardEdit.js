import React, { useEffect, useState } from "react";
import Breadcrumb from "../home/Breadcrumb";
import { useParams, useHistory } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../../utils/api";
import CardForm from "./CardForm";

export default function EditCard() {
    const history = useHistory();
    const { deckId, cardId } = useParams();
    const [ deck, setDeck ] = useState([]);
    const [ card, setCard ] = useState({});

    useEffect (() => {
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

        async function getCard() {
            try {
                const apiCard = await readCard(cardId, ac.signal);
                setCard(apiCard);
            }
            catch (error) {
                throw error;
            }
        }

        getCard();
        getDeck();

        return () => ac.abort();
    }, [deckId, cardId]);

    const handleChange = ({ target }) => {
        setCard({
            ...card,
            [target.name]: target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateCard(card);
        history.push(`/decks/${deck.id}`);
    };

    return (
        <>
            <div>
                <Breadcrumb isEditingCard={true} deck={deck} cardId={cardId} />
            </div>
            <div>
                <h3>Edit Card</h3>
                <CardForm handleChange={handleChange} handleSubmit={handleSubmit} card={card} />
            </div>
        </>
    )
}

