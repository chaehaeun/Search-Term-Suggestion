import styled from "styled-components";
import { BiSearchAlt2 } from "react-icons/bi";

interface RecommendProps {
  results: string[];
  keyword: string;
  handleValue: (value: string) => void;
}

const Recommend = ({ results, handleValue, keyword }: RecommendProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (event.key === "Enter") {
      const keyword = event.currentTarget.textContent;
      handleValue(keyword!);
    }
  };

  return (
    <Ul>
      {results.map((result, index) => (
        <List tabIndex={0} key={index} onKeyDown={handleKeyDown}>
          <BiSearchAlt2 />
          {highlightKeywords(result, keyword)}
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
  > svg {
    margin-right: 0.5rem;
  }

  &:focus {
    background-color: #eee;
    outline: none;
  }

  > strong {
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
