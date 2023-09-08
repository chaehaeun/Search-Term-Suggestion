# 💊 Search-Term-Suggestion

원티드 프리온보딩 인턴십 3주차 개인 과제 레포지토리입니다.

## 🎯 프로젝트 소개

- 주제 : 질환명 검색시 검색어 추천 기능을 지원하는 웹 개발
- 작업 기간 : 2023.09.05 ~2023.09.08
- 팀 작업 레포지토리 :

## 📝 과제 요구사항

- 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현
- API 호출별로 로컬 캐싱 구현
- 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
- API를 호출할 때 마다 console.info("calling api") 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정
- 키보드만으로 추천 검색어들로 이동 가능하도록 구현

## 🛠 사용한 기술 스택 및 라이브러리

- `Vite`
- `React`
- `Typescript`
- `React-Router-Dom`
- `Styled-Components`
- `Axios`

## 🎬 프로젝트 로컬 실행 방법

1. 본 repository를 clone합니다.

```bash
git clone https://github.com/chaehaeun/Search-Term-Suggestion.git
```

2. 의존성 패키지를 설치합니다.

```bash
npm install
```

3. 로컬호스트를 실행합니다.

```bash
npm run dev
```

## 🚀 배포 링크

[👉 배포 링크로 이동](https://search-term-suggestion.vercel.app/)

## 🗂️ 폴더 구조

```zsh
.
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── public
│   └── vite.svg
├── src
│   ├── App.tsx
│   ├── api
│   │   ├── httpClient.ts
│   │   └── index.ts
│   ├── components
│   │   ├── Recommend.tsx
│   │   ├── SearchForm.tsx
│   │   └── index.ts
│   ├── constants
│   │   └── index.ts
│   ├── globalStyles.ts
│   ├── hooks
│   │   ├── index.ts
│   │   └── useDebounceSearch.tsx
│   ├── main.tsx
│   ├── pages
│   │   ├── NotFound.tsx
│   │   └── index.ts
│   ├── router
│   │   └── index.tsx
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

```

## ✏️ 구현 내용

| 검색어 추천                       |
| --------------------------------- |
| ![검색어 추천](./docs/search.gif) |

#### 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현

- `#httpClient`
  - 프라이빗 필드로 설정하여 외부에서 접근 또는 수정하지 못하게 했습니다. 이로 인해 HttpService 사용자가 httpClient에 직접 접근하여 변경하는 것을 방지하였습니다.

#### API 호출별로 로컬 캐싱 구현

| 로컬 캐싱 기능            |
| ------------------------- |
| ![캐싱](./docs/cache.gif) |

[👉 httpClient 소스코드로 이동](./src/api/httpClient.ts)

- `search`:
  - 인자로 들어온 키워드로 API를 호출하고, 결과를 세션 스토리지에 캐시한 후 반환합니다.
  - 키워드가 유효하지 않은 경우, API 호출 없이 빈 배열을 반환합니다.
  - 세션 스토리지에 해당 키워드의 유효한 캐시 데이터가 있는 경우, API 호출 없이 캐시된 데이터를 반환합니다.
- `#getCacheData`:
  - 세션 스토리지에서 캐시 데이터를 가져옵니다.
  - 만료된 캐시 데이터가 있는지 확인하고 만료된 데이터는 삭제합니다.
  - 최신화된 캐시 데이터를 세션 스토리지에 다시 저장합니다.
- `#setCacheData`:

  - 주어진 키워드와 데이터를 세션 스토리지에 캐시로 저장합니다.
  - 현재 시간의 타임스탬프와 함께 저장하여 만료를 확인할 수 있습니다.

- `#getCacheData` 와 `#setCacheData` 는 search에서 사용되는 내부 함수이기 때문에 프라이빗 함수로 구현했습니다.

#### 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행

- `useDebounceSearch` 커스텀 훅을 통해 0.3초 이내에 입력이 들어오면 API를 호출하지 않도록 구현했습니다.

#### 키보드만으로 추천 검색어들로 이동 가능하도록 구현

- `li` 태그에 `tabIndex` 속성을 추가하여 탭으로 목록에 접근할 수 있도록 구현했습니다.
- `onKeyDown` 이벤트 헨들러를 통해 키보드 화살표로 추천 검색어들을 이동할 수 있도록 구현했습니다.
