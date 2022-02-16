import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import StudyCard from "./StudyCard";
import Breadcrumb from "../home/Breadcrumb";

export default function Study() {
    const [ deck, setDeck ] = useState({});
    const [ card, setCard ] = useState([]);
    const [ isFlipped, setIsFlipped ] = useState(false);
    const [ cardIndex, setCardIndex ] = useState(1);
    const { deckId } = useParams();
    const history = useHistory();
  
    useEffect(() => {
         const ac = new AbortController();
        
         async function getDeck() {
            try {
                const apiDeck = await readDeck(deckId, ac.signal)
                setDeck(apiDeck);
                setCard(apiDeck.cards[0])
                setIsFlipped(false);
            }
            catch (error) {
                throw error;
            }

         }
         getDeck();

  
         return () => ac.abort();
    }, [deckId]);

    const flipHandler = () => {
        setIsFlipped(!isFlipped);
    }

    const nextCardHandler = () => {
        setCardIndex(cardIndex + 1)
        setIsFlipped(!isFlipped)
        if (cardIndex !== deck.cards?.length) {
            setCard(deck.cards[cardIndex])
        }
        else {
            const message = window.confirm("Restart cards? Click 'cancel' to return to the home page");
            if (!message) {
                history.push("/");
            }
            else {
                setCard(deck.cards[1])
                setCardIndex(1);
                setIsFlipped(false);
            }
        }
    }
    return (
        <div>
            <div>
                <Breadcrumb deck={deck} isStudying={true} />
            </div>
            <h1>Study: {deck.name}</h1>
            <div className="cards">
                {deck.cards?.length > 2 && (<StudyCard isFlipped={isFlipped} flipHandler={flipHandler} card={card} length={deck.cards?.length} cardIndex={cardIndex} nextCardHandler={nextCardHandler}/>)}
                {deck.cards?.length < 3 && (
                    <div>
                        <h2>Not enough cards.</h2>
                        <p>You need at least 3 cards to study. There are {deck.cards?.length} cards in this deck.</p>
                        <Link to={`/decks/${deckId}/cards/new`}><button className="btn btn-primary">Add Cards</button></Link>
                    </div>
                )}
            </div>
        </div>
    )
}