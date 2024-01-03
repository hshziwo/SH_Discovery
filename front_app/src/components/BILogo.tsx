import styled from 'styled-components';
import { FcComboChart } from 'react-icons/fc';

const Wrapper = styled.div`
    /* display: flex;
    justify-content: start;
    align-items: center;
    height: 3.5rem;
    font-size: 1.5rem;
    margin-left: 2rem; */

    display: flex;
    height: 4rem;
    align-items: center;
    padding: 0.5rem;
    padding-bottom: 1.5rem;

    column-gap: 0.75rem;
    font-size: 1.5rem;
    /* font-weight: 600; */
    line-height: 1.5rem;
    text-decoration: none;
    user-select: none;
`;
const BIIcon = styled.div`
    font-size: 3rem;
`;

const BILogo = () => {
    return (
        <Wrapper>
            <BIIcon>
                <FcComboChart />
            </BIIcon>
            SH Discovery
        </Wrapper>
    );
};

export default BILogo;
