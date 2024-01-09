import styled from 'styled-components';

const AnalyticsContent = styled.div<{ isLoading: boolean }>`
    display: flex;
    flex-direction: row;
    width: 100%;
    ${({ isLoading }) =>
        isLoading &&
        `
        opacity: 0.3;
        pointer-events : none;
        `}
`;

export default AnalyticsContent;
