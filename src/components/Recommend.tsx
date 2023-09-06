import styled from "styled-components";
import { BiSearchAlt2 } from "react-icons/bi";
import { useState, useRef, useEffect } from "react";

interface RecommendProps {
  results: string[];
  keyword: string;
  handleValue: (value: string) => void;
}

const Recommend = ({ results, handleValue, keyword }: RecommendProps) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const listRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    listRefs.current = listRefs.current.slice(0, results.length);
  }, [results]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    switch (event.key) {
      case "Enter": {
        const keyword = event.currentTarget.textContent;
        handleValue(keyword!);
        break;
      }
      case "ArrowDown":
        setFocusedIndex((prev) =>
          prev !== null && prev < results.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        setFocusedIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : results.length - 1
        );
        break;
    }
  };

  const handleResultClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const keyword = event.currentTarget.textContent;
    handleValue(keyword!);
  };

  useEffect(() => {
    if (focusedIndex !== null && listRefs.current[focusedIndex]) {
      listRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  return (
    <Ul>
      {results.map((result, index) => (
        <List
          tabIndex={0}
          key={index}
          ref={(el) => (listRefs.current[index] = el)}
          onClick={handleResultClick}
          onKeyDown={(e) => handleKeyDown(e)}
        >
          <BiSearchAlt2 />
          <span>{highlightKeywords(result, keyword)}</span>
        </List>
      ))}
    </Ul>
  );
};

const Ul = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  gap: 0.5rem;
`;

const List = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  > svg {
    margin-right: 0.5rem;
  }

  &:focus,
  &:hover {
    background-color: #eee;
    outline: none;
  }

  > span > strong {
    color: #017be9;
  }
`;

export default Recommend;

const highlightKeywords = (result: string, keyword: string) => {
  if (!result || !keyword) return result;

  const index = result.toLowerCase().indexOf(keyword.toLowerCase());
  if (index === -1) return result;

  const beforeKeyword = result.slice(0, index);
  const keywordPart = result.slice(index, index + keyword.length);
  const afterKeyword = result.slice(index + keyword.length);

  return (
    <>
      {beforeKeyword}
      <strong>{keywordPart}</strong>
      {afterKeyword}
    </>
  );
};
