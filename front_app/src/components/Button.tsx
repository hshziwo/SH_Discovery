import styled from 'styled-components';

const Button = styled.button`
    padding: 10px 20px;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    border: 0 none;
    border-radius: 6px;
    color: #fff;
    background-color: dodgerblue;

    &:hover {
        color: rgb(79 70 229);
        background-color: rgb(240 240 241);
        border: 1px solid;
    }
`;

export default Button;
