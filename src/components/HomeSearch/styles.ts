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
  margin: 4rem 0;
`;

export const SearchOption = styled.button`
  border-radius: 0.8rem;
  border: 1px solid #cccccc;
  font-size: 0.9rem;
  transition: color 0.3s;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.04);
    // color: #588157;
    border-color: #588157;
  }
  &:focus {
    outline: none;
  }
`;

export const SearchOptionContainer = styled.div`
  display: flex;
  gap: 0.4rem;
  margin-top: 1rem;
`;
