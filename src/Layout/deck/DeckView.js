import React, { useState, useEffect } from "react";
import { readDeck, deleteDeck } from "../../utils/api";
import { useHistory, useParams, useRouteMatch, Link } from "react-router-dom";
import CardList from "../card/CardList";
import Breadcrumb from "../home/Breadcrumb";

function DeckView() {
    const [ deck, setDeck ] = useState({});
    const { deckId } = useParams();
    const { url } = useRouteMatch();
    const history = useHistory();

    const handleDelete = async (id) => {
        const result = window.confirm("Are you sure you want to delete this deck?");
        if (result) {
          deleteDeck(id);
          history.go(0);
        }
      };

     useEffect(() => {
         const abortController = new AbortController();
  
         readDeck(deckId, abortController.signal).then(setDeck).catch((error) => {throw error})
  
         return () => abortController.abort();
    }, [deckId]);

    return (
        <>
            <div>
                <Breadcrumb deck={deck} isViewing={true} />
            </div>
            <div className="mt-3 mb-5" style={{width:"600px"}}>
                <h2>{deck.name}</h2>
                <p>{deck.description}</p>
                <Link to={`${url}/edit`}>
                    <button type="button" className="btn btn-secondary m-1">Edit</button>
                </Link>
                <Link to={`${url}/study`}>
                    <button type="button" className="btn btn-primary m-1">Study</button>
                </Link>
                <Link to={`${url}/cards/new`}>
                    <button type="button" className="btn btn-primary m-1">+ Add Cards</button>
                </Link>
                <button type="button" className="btn btn-danger float-right" onClick={() => handleDelete(deck.id)}>Delete</button>
            </div>
            <div>
                <CardList cards={deck.cards}/>
            </div>
        </>
    );
}

export default DeckView;