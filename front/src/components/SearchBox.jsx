import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import useToast from "../hooks/useToast";
import Toast from "./Toast";

const SearchBox = ({ ref, onSearch, text }) => {
  const [url, setUrl] = useState("");
  const { toastMessage, showToast, clearToast } = useToast();

  const handleClick = useCallback(() => {
    if (!url.trim()) {
      showToast("Please enter a URL");
      return;
    }
    onSearch(url);
  }, [onSearch, url, showToast]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <Container>
      <Toast message={toastMessage} onDone={clearToast} />
      <UrlInput
        ref={ref}
        type="text"
        placeholder="Put the url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        onClick={handleClick}
        style={{
          backgroundColor: "#fff",
          color: "black",
          border: "1px solid #ccc",
        }}
      >
        {text}
      </Button>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  gap: 20px;
`;

const UrlInput = styled.input`
  flex: 1;
  min-width: 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export default SearchBox;
