import styled from "styled-components";

export const HomeInput = styled.input`
  background-color: #eeefef;
  color: #a2a4a4;
  border: 1px solid #d5d6d6;
  font-size: 1.6rem;
  padding: 1.2rem 1.5rem;
  padding-left: 3.6rem;
  border-radius: 1.4rem;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

export const SvgIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 1.2rem;
  transform: translateY(-50%);
  width: 1.4rem;
`;

export const InputContainer = styled.div`
  position: relative;
`;

export const Container = styled.div`
  margin-top: 4rem;
  padding: 0 3.4%;
`;
