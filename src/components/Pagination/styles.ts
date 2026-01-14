import styled from "styled-components";
import colors from "src/utils/colors";

export const PaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin: 3rem 0;
  padding: 1.5rem;
  width: 100%;
  padding-top: 0;
  margin-top: 0;

  @media (max-width: 860px) {
    padding: 1rem;
    margin: 2rem 0;
  }
`;

export const PageInfo = styled.div`
  color: var(--color-text);
  font-size: 1.1rem;
  font-weight: 500;

  @media (max-width: 860px) {
    font-size: 0.9rem;
  }
`;

interface PageButtonProps {
  active?: boolean;
  disabled?: boolean;
}

export const PageButton = styled.button<PageButtonProps>`
  background: ${props => 
    props.active 
      ? colors.mainColor 
      : "transparent"
  };
  color: ${props => 
    props.active 
      ? "#ffffff" 
      : props.disabled 
        ? "#999999" 
        : "var(--color-text)"
  };
  border: 2px solid ${props => 
    props.active 
      ? colors.mainColor 
      : props.disabled 
        ? "#cccccc" 
        : colors.mainColor
  };
  border-radius: 0.5rem;
  padding: 0.75rem 1.1rem;
  min-width: 3.5rem;
  cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.2s ease;
  opacity: ${props => props.disabled ? 0.5 : 1};

  &:hover {
    background: ${props => 
      props.disabled 
        ? "transparent" 
        : props.active 
          ? colors.mainColor 
          : `${colors.mainColor}22`
    };
  }

  &:active {
    transform: ${props => props.disabled ? "none" : "scale(0.95)"};
  }

  @media (max-width: 860px) {
    padding: 0.6rem 0.9rem;
    min-width: 2.8rem;
    font-size: 0.95rem;
  }
`;
