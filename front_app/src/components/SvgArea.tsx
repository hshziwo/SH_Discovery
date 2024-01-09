import styled from 'styled-components';

const SvgArea = styled.div<{ isLoading: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    ${({ isLoading }) =>
        isLoading &&
        `
        display: none;
    `}
`;

export default SvgArea;
