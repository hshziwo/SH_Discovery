import styled from 'styled-components';
import InputArea from './InputArea';
import Button from './Button';
import { IProps } from './InputArea';

const Wrapper = styled.div`
    margin-top: 2rem;
`;

const SearchArea = (props: IProps) => {
    return (
        <Wrapper>
            <InputArea word={props.word} getData={props.getData} />
            <Button onClick={props.getData}>검색</Button>
        </Wrapper>
    );
};

export default SearchArea;
