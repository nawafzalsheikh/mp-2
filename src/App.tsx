import {useEffect, useState} from "react";
import styled from "styled-components";
import GameDeals from "./components/GameDeals.tsx";
import {Deal} from "./interfaces/Deal.ts";

const PageWrapper = styled.div`
    width: 90vw;
    max-width: 1000px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid gray;
    background-color: white;

    @media screen and (max-width: 520px) {
        width: 95vw;
        padding: 12px;
    }
`;

const Header = styled.header`
    padding-bottom: 15px;
    border-bottom: 1px solid gray;

    h1 {
        color: navy;
        margin-bottom: 10px;
        font-size: calc(22px + 1vw);
    }

    p {
        line-height: 1.5;
    }
`;

const Main = styled.main`
    padding: 20px 0;

    h2 {
        margin: 0 1% 10px;
        font-size: calc(18px + 0.5vw);
    }
`;

const Message = styled.p`
    padding: 15px;
`;

const Footer = styled.footer`
    padding-top: 10px;
    border-top: 1px solid gray;
    line-height: 1.6;
`;

export default function App() {
    const [gameOffers, setGameOffers] = useState<Deal[]>([]);
    const [isFetching, setIsFetching] = useState(true);
    const [failedToLoad, setFailedToLoad] = useState(false);

    //get deals
    useEffect(() => {
        async function loadGameOffers(): Promise<void> {
            const apiReply = await fetch("https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15&pageSize=12&onSale=1");

            if (apiReply.status !== 200) {
                throw new Error("The deals could not be loaded.");
            }

            const offerList: Deal[] = await apiReply.json();
            setGameOffers(offerList);
        }

        loadGameOffers()
            .then(() => setIsFetching(false))
            .catch((requestError: Error) => {
                console.log("Could not get Steam deals: " + requestError);
                setFailedToLoad(true);
                setIsFetching(false);
            });
    }, []);

    return (
        <PageWrapper>
            <Header>
                <h1>Steam Game Deals</h1>
                <p>Here are some Steam games that cost $15 or less.</p>
            </Header>
            <Main>
                <h2>Current Deals</h2>
                {isFetching ? (
                    <Message>Loading game deals...</Message>
                ) : failedToLoad ? (
                    <Message>Could not load the deals. Please try refreshing the page.</Message>
                ) : (
                    <GameDeals offers={gameOffers}/>
                )}
            </Main>
            <Footer>
                <p>Game data from <a href="https://www.cheapshark.com/">CheapShark</a>.</p>
                <p>Prices are in US dollars and may change.</p>
            </Footer>
        </PageWrapper>
    );
}
