import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FcComboChart } from 'react-icons/fc';

import { SidebarData } from './SidebarData';

const SidebarMenu = styled.div`
    /* width: 220px;
    height: 100vh;
    background-color: rgb(255 255 255 / 1);
    position: fixed;
    top: 0;
    left: 0; */

    box-sizing: border-box;
    border-style: solid;
    position: fixed;
    top: 0px;
    bottom: 0px;
    z-index: 50;
    display: flex;
    width: 17rem;
    flex-direction: column;
    overflow-y: auto;
    border-width: 0;
    border-right-width: 1px;
    border-color: rgb(229 231 235 / 1);
    background-color: rgb(255 255 255 / 1);
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-bottom: 1rem;
`;

const BILogo = styled.div`
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

const MenuItems = styled.ul`
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: start;
    width: 100%;
    height: 50px;
    /* padding: 1rem 0 1.25rem; */

    /* tab-size: 4; */
    /* font-variation-settings: normal; */
    /* line-height: inherit; */
    /* box-sizing: border-box; */
    /* border-width: 0; */
    /* border-style: solid; */
    /* border-color: #e5e7eb; */
    /* list-style: none; */
    margin: 0;
    padding: 0;
    /* margin-left: -0.5rem; */
    /* margin-right: -0.5rem; */
`;

const MenuItemLinks = styled(Link)`
    /* display: flex; */
    align-items: center;
    /* padding: 0 2rem; */
    /* font-size: 20px; */
    text-decoration: none;
    /* color: #ffffff; */

    /* tab-size: 4; */
    /* font-variation-settings: normal; */
    /* box-sizing: border-box; */
    border-width: 0;
    /* border-style: solid; */
    /* border-color: #e5e7eb; */
    /* list-style: none; */
    /* text-decoration: inherit; */
    display: flex;
    column-gap: 0.75rem;
    padding: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.5rem;
    color: rgb(55 65 81 / 1);

    &:hover {
        /* background-color: #ffffff; */
        /* color: #000080; */
        width: 100%;
        height: 25px;
        /* text-align: center; */
        border-radius: 5px;
        /* margin: 0 2rem; */
        color: rgb(79 70 229 / 1);
        background-color: rgb(240 240 241 / 1);
    }
`;

const MenuIcon = styled.div`
    font-size: 1.5rem;
    /* color: rgb(156 163 175 / 1); */
`;

const Sidebar = () => {
    return (
        <>
            <SidebarMenu>
                <BILogo>
                    <BIIcon>
                        <FcComboChart />
                    </BIIcon>
                    SH Discovery
                </BILogo>

                {SidebarData.map((item, index) => {
                    return (
                        <MenuItems key={item.title}>
                            <MenuItemLinks to={item.path}>
                                <MenuIcon>{item.icon}</MenuIcon>
                                {item.title}
                            </MenuItemLinks>
                        </MenuItems>
                    );
                })}
            </SidebarMenu>
        </>
    );
};

export default Sidebar;
