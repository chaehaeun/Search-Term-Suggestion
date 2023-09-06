import styled from "styled-components";
import { SearchForm } from "@/components";
import { TITLE } from "@/constants";

function App() {
  return (
    <Wrapper>
      <Title dangerouslySetInnerHTML={{ __html: TITLE }} />
      <SearchForm />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background-color: #cae9ff;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

export default App;
