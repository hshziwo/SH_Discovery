import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const Visualazation = styled.div`
    width: 70%;
    padding: 1rem;
`;

const Shoutcut = styled.div`
    width: 30%;
    padding: 1rem;
`;

const RelatedWordNetwork = () => {
    return (
        <Wrapper>
            <Visualazation>Related Word Network 시각화</Visualazation>
            <Shoutcut>숏컷</Shoutcut>
        </Wrapper>
    );
};

export default RelatedWordNetwork;
