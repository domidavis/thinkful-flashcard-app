import { useHistory, Link } from "react-router-dom";
import { deleteDeck } from "../../utils/api";

function Deck({ deck }) {

  const history = useHistory();

  const handleDelete = async (id) => {
    const result = window.confirm("Are you sure you want to delete this deck?");
    if (result) {
      deleteDeck(id);
      history.go(0);
    }
  };

    return (
    <div className="card mb-3" style={{width: "500px"}}>
      <div className="card-body" >
        <h5 className="card-title">{deck.name}</h5>
        <p className="card-subtitle mb-2 text-muted">{deck.cards.length} cards</p>
        <p className="card-text">
          {deck.description}
        </p>
        <Link to={{
          pathname: `/decks/${deck.id}`,
          state: { deck }
        }}>
          <button type="button" className="btn btn-secondary m-1">View</button>
        </Link>
        <Link to={`/decks/${deck.id}/study`}>
            <button type="button" className="btn btn-primary m-1">Study</button>
        </Link>
        <button type="button" className="btn btn-danger float-right" onClick={() => handleDelete(deck.id)}>Delete</button>
      </div>
    </div>
    );
}

export default Deck;