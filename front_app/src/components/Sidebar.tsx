import { Link } from 'react-router-dom';
import styled from 'styled-components';
import media from '../styles/media';

import { SidebarData } from './SidebarData';
import BILogo from './BILogo';

const SidebarMenu = styled.div`
    display: flex;
    width: 23rem;
    /* width: 30%; */
    flex-direction: column;
    overflow-y: auto;
    height: 100vh;
    box-sizing: border-box;
    border-style: solid;
    /* position: fixed;
    top: 0px;
    bottom: 0px; */
    z-index: 50;
    border-width: 0;
    border-right-width: 1px;
    border-color: rgb(229 231 235);
    background-color: rgb(255 255 255);
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-bottom: 1rem;

    /* ${media.tablet`
        width: 15rem;
        height: 15rem;
        font-size: 15rem;
    `}

    ${media.phone`
        width: 12rem;
    `} */
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
    color: rgb(55 65 81);

    &:hover {
        /* background-color: #ffffff; */
        /* color: #000080; */
        width: 100%;
        height: 25px;
        /* text-align: center; */
        border-radius: 5px;
        /* margin: 0 2rem; */
        color: rgb(79 70 229);
        background-color: rgb(240 240 241);
    }
`;

const MenuIcon = styled.div`
    font-size: 1.5rem;
    /* color: rgb(156 163 175); */
`;

const Sidebar = () => {
    return (
        <>
            <SidebarMenu>
                <BILogo />

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
