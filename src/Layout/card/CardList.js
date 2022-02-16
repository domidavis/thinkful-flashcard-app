import React from "react";
import CardView from "./CardView";

function CardList({ cards }) {

    const cardsInDeck = cards?.map((card) => <CardView card={card} key={card.id}/>)

    return (
        <main className="container">
            <h3>Cards</h3>
            <section className="row">{cardsInDeck}</section>
        </main>
    );
}

export default CardList;