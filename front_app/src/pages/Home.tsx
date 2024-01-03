import styled from 'styled-components';
import RightPage from './RightPage';
import Header from '../components/Header';
import welcome from '../image/welcome1.png';

const Contents = styled.div`
    display: flex;
    flex-direction: column;
    height: 85vh;
`;

const Introduce = styled.div`
    padding: 2rem;
`;
const Image = styled.img`
    width: 99%;
    height: 86%;
`;

const Home = () => {
    return (
        <RightPage>
            <Header>
                <h2>Welcome to SH Discovery</h2>
            </Header>
            <Contents>
                <Introduce>
                    Our goal is to benefit the world with data.
                </Introduce>
                <Image src={welcome} alt="welcome"></Image>
            </Contents>
        </RightPage>
    );
};

export default Home;
