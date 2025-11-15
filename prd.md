## 📄 LoopUp (루펍) MVP 제품 요구사항 명세서

* **문서 버전:** 1.0
* **작성일:** 2025년 11월 15일
* **프로젝트명:** LoopUp
* **핵심 목표:** 외국인 교환 학생을 대상으로 기부 기반 물품 렌탈 서비스의 핵심 기능(가입, 검색, 대여, 기부) 플로우를 검증하는 프론트엔드 MVP 웹/앱을 구축한다.

---

### 1. 🚀 개요

**LoopUp**은 교환 학생이 떠나면서 기부한 물건을 다른 교환 학생에게 저렴하게 대여해주는 순환 경제 플랫폼입니다. MVP 단계에서는 실제 백엔드(데이터베이스, 결제, 인증) 없이, **Next.js**와 **더미 데이터(JSON)**를 사용하여 사용자가 실제 서비스처럼 경험할 수 있는 UI/UX 프로토타입을 구축하는 데 집중합니다.

* **타겟 고객:** 국내 대학의 외국인 교환 학생
* **기본 언어:** 영어
* **디자인 컨셉:** 모던, **Green** 컬러 테마 (Tailwind CSS 기반)
* **플랫폼:** 웹/웹앱 (반응형 디자인)

### 2. 💻 기술 스택 (MVP)

* **프레임워크:** React, **Next.js (App Router)**
* **스타일링:** **Tailwind CSS** (전역 스타일 및 유틸리티), **CSS Modules** (페이지/컴포넌트별 스코프 스타일)
* **데이터:** 백엔드 없음. **JSON 파일** (`/lib/dummy-data.json` 등)을 활용한 더미 데이터 사용.
* **상태 관리:** React Context API 또는 Zustand (장바구니 등 클라이언트 측 상태 관리용)

### 3. 🌍 전역 컴포넌트 (Global Components)

#### 3.1. 헤더 (Header)
* **위치:** 모든 페이지 상단 (단, 로그인/회원가입/결제 등 일부 플로우 제외)
* **구성 요소 (왼쪽부터):**
    1.  **햄버거 메뉴 아이콘 (삼선 바):** 클릭 시 '사이드바 메뉴' 팝업 (왼쪽에서 슬라이드)
    2.  **로고 (이미지):** 제공될 로고 이미지
    3.  **앱 이름 (텍스트):** "LooPUP"
    4.  **검색 아이콘 (돋보기):** 클릭 시 검색 페이지(`/search`)로 이동 또는 헤더 내 검색창 활성화

#### 3.2. 하단 네비게이션 바 (Bottom Navigation Bar)
* **특징:** **모바일 환경에서만 노출**
* **위치:** 모바일 화면 하단 고정
* **구성 요소 (왼쪽부터, 모던한 아이콘 포함):**
    1.  **Home:** 홈 페이지 (`/`)
    2.  **Search:** 검색 페이지 (`/search`)
    3.  **Donate:** 기부 페이지 (`/donate`)
    4.  **Cart:** 장바구니 페이지 (`/cart`)
    5.  **Profile:** 프로필 페이지 (`/profile`)

#### 3.3. 사이드바 메뉴 (Sidebar Menu)
* **트리거:** 헤더의 햄버거 메뉴 아이콘 클릭
* **동작:** 화면 왼쪽에서 슬라이드되어 나타남
* **구성 요소:**
    1.  **카테고리 (토글 메뉴):**
        * Furniture (가구)
            * (하위) Living Room, Office, Bedroom 등
        * Kitchenware (주방용품)
            * (하위) Cooking, Dining 등
        * Appliances (가전제품)
            * (하위) Kitchen, Cleaning 등
        * *(각 카테고리 우측 '역삼각형' 버튼으로 하위 카테고리 토글)*
    2.  **기부하기 (메뉴):** 가장 하단에 위치, 클릭 시 `/donate`로 이동

---

### 4. 📑 페이지별 기능 명세 (User Flow & Pages)

#### 4.1. 인증 (Auth) - UI Only

> **MVP 가정:** 실제 인증 로직 없음. 버튼 클릭 시 지정된 페이지(홈)로 이동시킴.

* **경로:** `/login`
* **기능:**
    * '아이디', '비밀번호' 입력 필드
    * '로그인' 버튼 (클릭 시 `/` (홈)으로 이동)
    * '회원가입' 버튼 (클릭 시 `/signup`으로 이동)

* **경로:** `/signup`
* **기능:**
    * 입력 필드: 학교 선택(드롭다운), 학번, 아이디, 비밀번호, 이름(서명)
    * '가입하기' 버튼 (클릭 시 `/` (홈)으로 이동)

#### 4.2. 홈 (Home)

* **경로:** `/`
* **레이아웃:** 헤더 / 본문 / 하단 네비바 (모바일)
* **기능:**
    * **상품 그리드:** 더미 데이터에서 상품 목록을 불러와 격자 형태로 표시.
    * **상품 카드:** 각 상품의 '간단한 사진'과 '이름' 표시.
    * **이동:** 상품 카드 클릭 시 해당 상품의 상세 페이지 (`/product/[id]`)로 이동.

#### 4.3. 카테고리 및 검색 결과 (Category & Search)

* **경로:** `/category/[...slug]`, `/search`
* **기능:**
    * **Breadcrumbs (경로 표시):** 헤더 바 하단에 "Home > Furniture > Living Room" 등 필터링 경로 표시 (작은 글씨).
    * **필터링된 결과:** 홈 페이지와 동일한 '상품 그리드' 형식으로 표시.
    * **검색 (`/search`):** 검색 입력창 제공. MVP에서는 더미 데이터의 `name` 또는 `description` 필드를 client-side에서 필터링하여 결과 표시.

#### 4.4. 상품 상세 (Product Detail)

* **경로:** `/product/[id]`
* **기능:**
    * **뒤로가기 버튼:** 상단에 위치 (헤더와 별개 또는 헤더 좌측)
    * **상품 정보:**
        * 사진 (캐러셀 또는 단일 이미지)
        * 이름
        * 설명
        * 상태 (Condition): 'New', 'Good' (사용감), 'Old' 중 선택
        * 평가 (Rating): (별점 등)
        * 대여 가능 여부 (Availability): 'Available' / 'Rented'
        * 가격 (Price): '학기당 가격' (예: ₩5,000 / semester)
    * **CTA 버튼:** 페이지 하단에 'Add to Cart' 버튼.
        * *MVP 로직: 클릭 시 클라이언트 측 상태(Context/Zustand)에 상품 추가. (장바구니 아이콘에 뱃지 표시)*

#### 4.5. 기부하기 (Donate Flow)

* **경로:** `/donate` (하단 네비바 또는 사이드바 메뉴 통해 진입)
* **기능 (1단계: 정보 입력):**
    * 기부 물품 정보 입력 폼
        * 사진 업로드 (MVP에서는 Mock UI)
        * 설명
        * 상태 (Condition) 선택
    * **기부 방식 선택:**
        1.  **직접 방문 (Drop-off):** (기관 주소 표시)
        2.  **픽업 서비스 (Pickup Service - 유료):**
    * **버튼:**
        1.  (직접 방문 선택 시) **'Confirm' (확인) 버튼:** 클릭 시 "Thank you for your donation!" 팝업 표시 -> 팝업 닫으면 홈(`/`)으로 이동.
        2.  (픽업 서비스 선택 시) **'Next' (다음) 버튼:** 클릭 시 주소 입력 페이지 (`/donate/address`)로 이동.

* **경로:** `/donate/address` (픽업 서비스 선택 시)
* **기능 (2단계: 주소 입력):**
    * 주소, 우편번호 입력 폼
    * **'Schedule Pickup' (픽업 예약) 버튼:** 클릭 시 "Thank you..." 팝업 표시 -> 팝업 닫으면 홈(`/`)으로 이동.
    * *(MVP에서는 실제 결제나 예약 로직 없음)*

#### 4.6. 장바구니 및 결제 (Cart & Checkout Flow)

* **경로:** `/cart`
* **기능 (1단계: 장바구니):**
    * 클라이언트 상태에 저장된 상품 목록 리스트업.
    * 선택한 상품들의 '합계' 금액 표시.
    * **수령 방식 선택:**
        1.  **직접 픽업 (Pick-up):** (기관 주소 표시)
        2.  **배달 서비스 (Delivery Service - 유료):**
    * **버튼:**
        1.  (직접 픽업 선택 시) **'Confirm' (확인) 버튼:** 클릭 시 결제 페이지 (`/checkout/payment`)로 이동.
        2.  (배달 서비스 선택 시) **'Next' (다음) 버튼:** 클릭 시 주소 입력 페이지 (`/checkout/address`)로 이동.

* **경로:** `/checkout/address` (배달 서비스 선택 시)
* **기능 (2단계: 주소 입력):**
    * 주소, 우편번호 입력 폼
    * '배달비' (더미 값) 표시
    * **'Next' (다음) 버튼:** 클릭 시 결제 페이지 (`/checkout/payment`)로 이동.

* **경로:** `/checkout/payment`
* **기능 (3단계: 결제):**
    * 결제 수단 선택: '신용카드', '계좌이체' (Mock)
    * 신용카드 선택 시 옵션: Visa, PayPal, Apple Pay, American Express 등 (아이콘/버튼 형태)
    * 결제 정보 입력 폼 (Mock UI)
    * **'Pay' (결제하기) 버튼:** 클릭 시 "결제 정보가 이메일로 전송되었습니다." 팝업 표시 -> 팝업 닫으면 홈(`/`)으로 이동.

#### 4.7. 프로필 (Profile)

* **경로:** `/profile`
* **기능:** MVP에서는 간단한 플레이스홀더 페이지. (예: "My Rentals", "Settings", "Logout" 버튼(Mock) 등)

---

### 5. 💾 데이터 구조 (Dummy Data Schema)

`/lib/dummy-data.json` (또는 `.ts`)에 최소 **70개 이상의 상품** 데이터를 정의합니다.

**Product (상품):**
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "images": ["string (placeholder-url)", "..."],
  "condition": "string ('New', 'Good', 'Old')",
  "rating": "number (1-5)",
  "isAvailable": "boolean",
  "pricePerSemester": "number",
  "category": "string ('Furniture', 'Kitchenware', 'Appliances')",
  "subCategory": "string ('Living Room', 'Cooking', 'Office', ...)"
}
```

**카테고리**
```json
{
  "name": "string ('Furniture')",
  "subCategories": ["string ('Living Room')", "..."]
}
```

## 파일 구조

```
/
├── /app/
│   ├── /_components/                 # 1. 전역 또는 여러 페이지에서 사용되는 컴포넌트
│   │   ├── /global/
│   │   │   ├── Header/Header.tsx
│   │   │   ├── Header/Header.module.css
│   │   │   ├── BottomNav/BottomNav.tsx
│   │   │   ├── BottomNav/BottomNav.module.css
│   │   │   └── Sidebar/Sidebar.tsx
│   │   └── /ui/                      # 2. 재사용 가능한 UI 요소 (버튼, 카드 등)
│   │       ├── Button.tsx
│   │       ├── ProductCard.tsx
│   │       └── Popup.tsx
│   │
│   ├── /_lib/                        # 3. 데이터 및 헬퍼
│   │   ├── dummy-data.ts           # (상품 70개+ 데이터 정의)
│   │   └── definitions.ts          # (TypeScript 타입: Product, CartItem)
│   │
│   ├── /_context/                    # 4. (선택) 장바구니/인증 상태 관리
│   │   └── CartContext.tsx
│   │
│   ├── globals.css                   # (Tailwind import 및 전역 스타일)
│   │
│   ├── /login/                       # 5. 로그인 페이지
│   │   ├── page.tsx
│   │   └── page.module.css
│   ├── /signup/                      # 6. 회원가입 페이지
│   │   └── page.tsx
│   │
│   ├── /(main)/                      # 7. 메인 앱 레이아웃 그룹 (헤더/하단바 포함)
│   │   ├── layout.tsx                # (헤더, 하단바 포함하는 레이아웃)
│   │   ├── page.tsx                  # (홈페이지: '/')
│   │   ├── page.module.css
│   │   │
│   │   ├── /category/[...slug]/      # 카테고리별 상품
│   │   │   └── page.tsx
│   │   ├── /product/[id]/            # 상품 상세
│   │   │   └── page.tsx
│   │   ├── /donate/                  # 기부
│   │   │   └── page.tsx
│   │   ├── /cart/                    # 장바구니
│   │   │   └── page.tsx
│   │   ├── /profile/                 # 프로필
│   │   │   └── page.tsx
│   │   └── /search/                  # 검색
│   │       └── page.tsx
│   │
│   └── /(checkout)/                  # 8. 결제/주소 레이아웃 그룹 (헤더/하단바 없음)
│       ├── layout.tsx                # (단순한 헤더만 있는 레이아웃)
│       ├── /checkout/address/        # 배달 주소
│       │   └── page.tsx
│       ├── /checkout/payment/        # 결제
│       │   └── page.tsx
│       └── /donate/address/          # 기부 픽업 주소
│           └── page.tsx
│
└── /public/
    └── logo.png                      # 로고 이미지

```ㄴ