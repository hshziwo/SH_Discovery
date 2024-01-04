import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-bottom: 10px;
`;
const Label = styled.label`
    display: block;
    margin-bottom: 10px;
`;
const Input = styled.input`
    width: 80%;
    height: 40px;
    font-size: 1rem;
    padding: 0 10px;
`;

export type IProps = {
    word: React.ForwardedRef<HTMLInputElement>;
    getData: () => void;
};

const InputArea = (props: IProps) => {
    const handleOnKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            props.getData(); // Enter 입력이 되면 클릭 이벤트 실행
        }
    };

    return (
        <Wrapper>
            <Label>검색어 입력</Label>
            <Input
                type="text"
                placeholder="Please enter your search word."
                ref={props.word}
                onKeyDown={handleOnKeyPress}
            ></Input>
        </Wrapper>
    );
};

export default InputArea;
