import styled from "styled-components";
import {Deal} from "../interfaces/Deal.ts";

const AllDeals = styled.div`
    display: flex;
    flex-flow: row wrap;
`;

const SingleDeal = styled.div`
    width: 48%;
    margin: 1%;
    padding: 15px;
    border: 1px solid gray;
    background-color: #f5f5f5;
    line-height: 1.5;

    h3 {
        margin-bottom: 10px;
        font-size: calc(16px + 0.25vw);
    }

    img {
        width: 100%;
        max-width: 250px;
    }

    p {
        margin: 8px 0;
    }

    a {
        color: blue;
        text-decoration: underline;
    }

    @media screen and (max-width: 520px) {
        width: 98%;
        margin: 8px 1%;
    }
`;

const SalePrice = styled.p`
    color: darkgreen;
    font-size: calc(16px + 0.2vw);
    font-weight: bold;
`;

const OriginalPrice = styled.span`
    text-decoration: line-through;
`;

const EmptyMessage = styled.p`
    padding: 15px;
`;

export default function GameDeals(gameProps: {offers: Deal[]}) {
    if (gameProps.offers.length === 0) {
        return <EmptyMessage>No deals were found. Please check back later.</EmptyMessage>;
    }

    return (
        <AllDeals>
            {gameProps.offers.map((game: Deal) => (
                <SingleDeal key={game.dealID}>
                    <h3>{game.title}</h3>
                    <img src={game.thumb} alt={game.title}/>
                    <SalePrice>Sale: ${game.salePrice}</SalePrice>
                    <p>Regular: <OriginalPrice>${game.normalPrice}</OriginalPrice></p>
                    <p>Steam reviews: {game.steamRatingText ? game.steamRatingText : "Not rated"}</p>
                    <a href={`https://www.cheapshark.com/redirect?dealID=${game.dealID}`}>View Deal</a>
                </SingleDeal>
            ))}
        </AllDeals>
    );
}
