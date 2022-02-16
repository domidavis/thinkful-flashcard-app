import React from "react";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import { deleteCard } from "../../utils/api";

function CardView ({ card }) {
    const { url } = useRouteMatch();
    const history = useHistory();

    const handleDelete = async (id) => {
        const result = window.confirm("Are you sure you want to delete this card?");
        if (result) {
          deleteCard(id);
          history.go(0);
        }
      };

    return (
        <div className="card mb-3" style={{width:"500px"}}>
            <div className="card-body container">
                <div className="row">
                    <div className="col">
                        <p className="card-text">{card.front}
                        </p>
                    </div>
                    <div className="col">
                        <p className="card-text">{card.back}
                        </p>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-row-reverse">
                <button type="button" className="btn btn-danger m-1" onClick={() => handleDelete(card.id)}>Delete</button>
                <Link to={`${url}/cards/${card.id}/edit`}>
                    <button type="button" className="btn btn-secondary m-1">Edit</button>
                </Link>
            </div>
        </div>
    );
}

export default CardView;