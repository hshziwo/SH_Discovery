import { MdOutlineDescription } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';
import { IoBarChartOutline } from 'react-icons/io5';

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiOutlineHome />,
    },
    {
        title: 'Description',
        path: '/description',
        icon: <MdOutlineDescription />,
    },
    {
        title: 'Analytics',
        path: '/analytics',
        icon: <IoBarChartOutline />,
    },
];
