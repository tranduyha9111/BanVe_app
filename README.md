# Marketplace Blueprint (banve_app)

Frontend marketplace bán bản vẽ kiến trúc, xây dựng với Next.js App Router.

## Yêu cầu

- Node.js 20+
- npm

## Cài đặt

```bash
npm install
cp .env.example .env.local
```

Cập nhật `NEXT_PUBLIC_API_URL` trong `.env.local` (ví dụ: `https://your-api-host.com/api`).

## Chạy development

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Scripts

| Lệnh | Mô tả |
|------|--------|
| `npm run dev` | Chạy dev server |
| `npm run build` | Build production |
| `npm run start` | Chạy production server |
| `npm run lint` | Kiểm tra ESLint |

## Cấu trúc thư mục

```
app/           # Routes, pages, context, services API
components/    # UI components dùng chung
hooks/         # Custom React hooks
lib/           # Axios, utils, constants, debug helpers
types/         # TypeScript types dùng chung
middleware.ts  # Bảo vệ route cần đăng nhập
```

## Auth & bảo vệ route

- Token lưu trong `localStorage` (access + refresh).
- Cookie `banve_session` được set khi đăng nhập để `middleware` redirect các route `/admin`, `/profile`, `/cart`, `/checkout`.
- Backend vẫn là lớp xác thực chính qua Bearer token.

## API proxy

`next.config.ts` rewrite `/api/*` tới backend cấu hình qua `NEXT_PUBLIC_API_URL`.
