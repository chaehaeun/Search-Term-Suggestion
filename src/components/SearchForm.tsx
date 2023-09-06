import styled from "styled-components";
import { a11yHidden } from "@/globalStyles";
import { BiSearchAlt2 } from "react-icons/bi";
import { Recommend } from "@/components";
import { useCallback, useState } from "react";
import { useDebounce } from "@/hooks";

const SearchForm = () => {
  const { searchTerm, results, setSearchTerm } = useDebounce("");
  const [toggleRecommend, setToggleRecommend] = useState<boolean>(false);
  const isRecommendVisible = !!results.length;

  const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setToggleRecommend(value !== "");
  };

  const handleValue = useCallback(
    (value: string) => {
      setSearchTerm(value);
      setToggleRecommend(false);
    },
    [setSearchTerm]
  );

  return (
    <Wrapper>
      <form onSubmit={submitSearch}>
        <Label htmlFor="search">검색폼</Label>
        <Input
          value={searchTerm}
          type="search"
          id="search"
          placeholder="질환명을 입력해주세요."
          onChange={handleInputChange}
        />
        <SearchBtn aria-label="검색" type="submit">
          <BiSearchAlt2 />
        </SearchBtn>
      </form>
      <RecommendWrapper $isVisible={toggleRecommend}>
        <RecommendKeyword>추천 검색어</RecommendKeyword>
        {isRecommendVisible ? (
          <Recommend
            results={results}
            handleValue={handleValue}
            keyword={searchTerm}
          />
        ) : (
          <p>검색어 없음</p>
        )}
      </RecommendWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 10rem;
`;

const Label = styled.label`
  ${a11yHidden}
`;

const Input = styled.input`
  appearance: none;
  width: 30rem;
  padding: 1.5rem 4rem 1.5rem 1.5rem;
  font-size: 1rem;
  border-radius: 4rem;
  border: none;

  &::placeholder {
    color: #b3b3b3;
  }
`;

const SearchBtn = styled.button`
  background-color: #017be9;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  right: 0.8rem;
  transform: translateY(-50%);
  & > svg {
    color: #fff;
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const RecommendWrapper = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: 5rem;
  left: 0;
  width: 30rem;
  padding: 1.5rem;
  max-height: 20rem;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 2rem;
  display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
`;

const RecommendKeyword = styled.span`
  font-size: 0.8rem;
  display: block;
  margin-bottom: 1rem;
  color: #017be9;
`;

export default SearchForm;
