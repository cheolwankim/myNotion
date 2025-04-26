# MyNotion - 나만의 노션 프로젝트

> Next.js 기반으로 구현한 Google 로그인, 문서 작성/편집/공유 기능을 갖춘 **나만의 Notion 프로젝트**입니다.

<br />
<br />

## 배포 링크

- **Frontend (Vercel)** 👉 [https://your-vercel-url.vercel.app](https://my-notion2.vercel.app/)
- **Backend (Render)** 👉 [https://notion-backend-your.onrender.com](https://notion-backend-g796.onrender.com)

> GitHub Repository 👉 [cheolwankim/myNotion](https://github.com/cheolwankim/myNotion)
<br />

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | **Next.js (App Router)**, React |
| 언어 | **TypeScript** |
| 스타일 | **Tailwind CSS** |
| 인증 | **NextAuth.js** (Google OAuth 2.0) |
| 백엔드 | **Node.js (Express)** |
| 데이터베이스 | **MongoDB (Mongoose)** |
| 배포 | **Frontend: Vercel**  **Backend: Render** |

<br />

---

## 핵심 기능 요약

  Google 로그인 / 로그아웃 (NextAuth)  
-  문서 생성 / 수정 / 삭제 (CRUD)  
-  TipTap 기반 리치 텍스트 에디터  
-  URL 공유 기반 **읽기 전용 모드** (`?share=true`)  
-  작성자 외 문서 접근 시 편집 비활성화  
-  Sidebar에서 실시간 문서 목록 갱신

<br />

---
## 주요 화면

![Image](https://github.com/user-attachments/assets/b3168ee9-2c42-46c6-bb10-6efe73c1a4cd)

<br>

![Image](https://github.com/user-attachments/assets/3b5e61f8-cb67-4df2-95e5-4de934a399d0)

<br>

![Image](https://github.com/user-attachments/assets/5147ed2f-61b6-468e-9c49-3c62630917cf)

<br>

![Image](https://github.com/user-attachments/assets/4c9ae7fa-c328-4927-8a61-1a9589b50ae1)




<br />

---

## 핵심 구현 경험

**1. Google OAuth 로그인 (NextAuth)**  
 - Google 콘솔에서 Redirect URI 관리  
 - /api/auth/[...nextauth]/route.ts 구성  
 - 환경변수로 민감 정보 관리  

**2. 문서 공유 & 권한 관리**  
 - 쿼리 파라미터 ?share=true → 읽기 전용 모드 렌더링  
 - 작성자 외에는 수정/삭제 불가  

**3. Sidebar 동기화 문제 해결**  
 - router.refresh() 한계 → useSidebarRefreshKey() 커스텀 훅으로 해결  
 - 문서 저장/삭제 시 실시간 목록 갱신 구현  

**5. SSR 이슈 해결 (Tiptap)**  
 - ssr: false + immediatelyRender: false  
 - hydration mismatch 해결  

**6. Tailwind 적용 문제 디버깅**  
 - globals.css, postcss.config.js, tailwind.config.js를 최신 문법으로 전면 수정  
 - 반영 안 되는 문제 직접 해결  

<br />

---


## 실행 방법  
**프론트엔드 실행 (Next.js)**  
```bash
cd notion-frontend
npm install
cp .env.local.example .env.local  # 또는 직접 생성
npm run dev
```

**백엔드 실행 (Express + MongoDB)**  
 
```bash
cd notion-backend
npm install
npm run dev
```

<br />

---

## 트러블 슈팅 경험  


✅	Tailwind 4.x 문법 확인 후 설정 파일 전체 수정 
✅	SSR + useSearchParams	Suspense로 컴포넌트 감싸고 분리  
✅	Google OAuth redirect_uri_mismatch	정확한 Redirect URL 등록 & 환경변수 재배포  
✅	Sidebar 목록 반영 안됨	커스텀 Context 훅으로 동기화 해결  
✅	Vercel/Render 배포 이슈	.env, API URL 관리 명확히 분리  

<br />

---

## 향후 개선 가능점  

 - [x] 댓글 기능 및 협업 초대  
 - [x] 문서 버전 히스토리  
 - [x] 다크모드 & 반응형 개선  
 - [x] 유저 프로필 페이지  

<br />

---

## 개발자 한마디
이 프로젝트는 단순한 클론이 아니라, 실제 실무에서 발생할 수 있는 인증, 배포, 동기화, 에디터 이슈 등을
직접 겪고 해결해보는 과정이었습니다. 프론트엔드 실무 준비에 있어 큰 성장 경험이 되었습니다.




