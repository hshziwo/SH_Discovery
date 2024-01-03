import styled from 'styled-components';
import RightPage from './RightPage';
import Header from '../components/Header';
import AnalyticsMenuList from '../components/AnalyticsMenuList';
import { Outlet } from 'react-router-dom';

const Contents = styled.div`
    display: flex;
    height: 64vh;
    padding: 1rem;
`;

const Analytics = () => {
    return (
        <RightPage>
            <Header>Analytics</Header>
            <AnalyticsMenuList />
            <Contents>
                <Outlet />
            </Contents>
        </RightPage>
    );
};

export default Analytics;
