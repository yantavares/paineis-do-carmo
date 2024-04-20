import styled from "styled-components";
import colors from "src/utils/colors";

export const HomeInput = styled.input`
  background-color: #eeefef;
  color: #a2a4a4;
  border: 1px solid #d5d6d6;
  font-size: 2.6rem;
  padding: 1.8rem 2.5rem;
  padding-left: 5.6rem;
  border-radius: 2.4rem;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

export const SvgIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 2.2rem;
  transform: translateY(-50%);
  width: 2.2rem;
`;

export const InputContainer = styled.div`
  display: flex;
  position: relative;
`;

export const Container = styled.div`
  margin-top: 3rem;
`;

export const SearchOption = styled.button`
  border-radius: 1.2rem;
  border: 1px solid #cccccc;
  font-size: 1.4rem;
  transition: color 0.3s;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.04);
    // color: colors.green;
    border-color: ${colors.green};
  }
  &:focus {
    outline: none;
  }
`;

export const SearchOptionContainer = styled.div`
  display: flex;
  gap: 0.76rem;
  margin-top: 1rem;
  margin-bottom: 4rem;
`;
