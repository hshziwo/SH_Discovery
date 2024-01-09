import styled from 'styled-components';

const Loading = styled.div<{ isLoading: boolean }>`
    display: none;

    ${({ isLoading }) =>
        isLoading &&
        `
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
    `}
`;

export default Loading;
