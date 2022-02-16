import DeckList from "../deck/DeckList";
import { Link } from "react-router-dom";


export default function Home() {
    return (
        <div className="Home">
            <div className="mb-3">
                <Link to="/decks/new"><button type="button" className="btn btn-primary" style={{marginLeft:"25px"}}>+ Create Deck</button></Link>
            </div>
            <div>
                <DeckList />
            </div>
        </div>
    );
}