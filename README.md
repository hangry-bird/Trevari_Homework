## node -v
- v18.17.0
## use
- npm i
- npm run dev
## 사용 기술 스택
- typescript
- next.js
- tailwindcss
- axios
- react-intersection-observer
## 폴더구조
```bash
├── app/
│     ├── list/
│     │     ├── BookList.tsx
│     │     └── page.tsx
│     ├── detail/
│     │     └── page.tsx
├── api/
│     ├── getBookDetail.ts
│     ├── getBookList.ts
│     ├── instance.ts
└── styles/
      └── globals.css
```
## 참고사항
- infinite scroll 구현을 위한 `react-intersection-observer` 라이브러리 사용
- `도서 검색 사이트 구현 과제` - `4. 세부 구현 내용` - `or(|) operator`기능의 경우 API 자체 지원으로 코드상에서 구현하지 않았습니다.
