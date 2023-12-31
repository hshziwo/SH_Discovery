import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { AnlayticsMenuListData } from './AnalyticsMenuListData';

const Wrapper = styled.ul`
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    padding-left: 0.5rem;
    list-style: none;
`;

const Inner = styled.li`
    /* flex: 20% 0 0; */
    box-sizing: border-box;
    padding: 1rem;
`;
// const AnalyticsMenuLink = styled(Link)`
//     display: block;
//     padding: 1rem;
//     font-weight: bold;
//     color: #fff;
//     text-align: center;
//     border-radius: 10px;
//     background-color: dodgerblue;
//     text-decoration: none;

//     &:hover {
//         color: rgb(79 70 229);
//         background-color: rgb(240 240 241);
//         border: 1px solid;
//     }
// `;

const AnalyticsMenuLink = styled(Link)`
    display: block;
    padding: 1rem;
    font-weight: bold;
    text-align: center;
    border-radius: 10px;
    text-decoration: none;

    color: #333;
    border: 1px solid #333;
    background-color: #efefef;

    &:hover {
        color: rgb(79 70 229);
        background-color: rgb(240 240 241);
        border: 1px solid;
    }
`;

const AnalyticsMenuList = () => {
    return (
        <Wrapper>
            {AnlayticsMenuListData.map((data) => {
                return (
                    <Inner key={data.path}>
                        <AnalyticsMenuLink to={data.path}>
                            {data.title}
                        </AnalyticsMenuLink>
                    </Inner>
                );
            })}
        </Wrapper>
    );
};
export default AnalyticsMenuList;
