import styled from 'styled-components';
import RightPage from './RightPage';
import Header from '../components/Header';

const Contents = styled.div`
    display: flex;
    height: 80vh;
    padding: 2rem;
`;

const Description = () => {
    return (
        <RightPage>
            <Header>Description</Header>
            <Contents>Description</Contents>
        </RightPage>
    );
};

export default Description;
