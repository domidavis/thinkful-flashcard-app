import React, { useState, useEffect } from "react";
import Deck from "./Deck";
import { listDecks } from "../../utils/api";

function DeckList() {
    const [ decks, setDecks ] = useState([]);
    
    useEffect(() => {
        const ac = new AbortController();

        listDecks(ac.signal).then(setDecks).catch((error) => {throw error})

        return () => ac.abort();
    }, []);

    const allDecks = decks.map((deck) => <Deck key={deck.id} deck={deck}/>);
    return (
        <main className="container">
            <section className="row">{allDecks}</section>
        </main>
    );
}

export default DeckList;