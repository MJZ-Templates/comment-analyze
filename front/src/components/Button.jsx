import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Button = ({ children, onClick, variant, ...props }) => {
  return (
    <StyledButton onClick={onClick} $variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  ${({ $variant }) => {
    switch ($variant) {
      case "all":
        return `
          background-color: white;
          color: black;
          border: 1px solid #ccc;
        `;
      case "positive":
        return `
          background-color: #007bff;
          color: white;
        `;
      case "neutral":
        return `
          background-color: #adb5bd;
          color: white;
        `;
      case "negative":
        return `
          background-color: #ee5858;
          color: white;
        `;
      default:
        return `
          background-color: #666;
          color: white;
        `;
    }
  }}
`;

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["all", "positive", "neutral", "negative"]),
};

Button.defaultProps = {
  onClick: () => {},
  variant: "default",
};

export default Button;
