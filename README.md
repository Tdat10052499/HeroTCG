# HeroTCG - Trò Chơi Thẻ Bài Nhân Vật

> Một trò chơi thẻ bài phân tán được xây dựng trên blockchain Sui

[![Sui Network](https://img.shields.io/badge/Sui-Network-4DA2FF?style=flat&logo=sui&logoColor=white)](https://sui.io/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Move](https://img.shields.io/badge/Move-Smart%20Contracts-00D4FF?style=flat)](https://move-language.github.io/)

**HeroTCG** là ứng dụng game thẻ bài phân tán được xây dựng trên blockchain Sui, cho phép người dùng tạo, sở hữu và giao dịch các chiếc thẻ nhân vật (Hero) NFT duy nhất.

---

## Mục Lục

- [Tính Năng](#tính-năng)
- [Công Nghệ](#công-nghệ)
- [Yêu Cầu Hệ Thống](#yêu-cầu-hệ-thống)
- [Cài Đặt](#cài-đặt)
- [Chạy Dự Án](#chạy-dự-án)
- [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
- [Wireframe Trang Web](#wireframe-trang-web)
- [Hướng Dẫn Sử Dụng](#hướng-dẫn-sử-dụng)
- [API & Smart Contract](#api--smart-contract)
- [Đóng Góp](#đóng-góp)
- [Giấy Phép](#giấy-phép)
- [Team](#team)
- [Liên Hệ](#liên-hệ)

---

## Tính Năng

### Smart Contract
- Tạo nhân vật (Hero) với các thuộc tính tùy chỉnh
- Quản lý NFT thẻ bài trên blockchain Sui
- Hệ thống xác thực quyền sở hữu
- Lưu trữ lịch sử giao dịch

### Frontend
- Kết nối ví (Wallet Connect) hỗ trợ các ví Sui
- Giao diện tạo nhân vật trực quan
- Xem chi tiết nhân vật và thẻ bài
- Quản lý hồ sơ người dùng
- Chia sẻ QR Code nhân vật
- Kết nối Discord

---

## Công Nghệ

### Frontend Stack
- **React 18** - UI framework hiện đại
  - Component-based architecture
  - React Hooks cho state management
  - Fast rendering với Concurrent features
  - Virtual DOM optimization
  
- **TypeScript** - Lập trình an toàn với kiểu dữ liệu
  - Static type checking giảm bugs
  - Tốt hơn IDE autocompletion
  - Better code documentation
  - Type-safe blockchain interactions
  
- **Vite** - Build tool hiệu suất cao
  - Lightning-fast HMR (Hot Module Replacement)
  - Fast cold server start
  - Optimized production build
  - ESM support
  
- **Sui dApp Kit** - Công cụ phát triển ứng dụng Sui
  - useCurrentAccount hook cho wallet state
  - useSignAndExecuteTransaction cho blockchain transactions
  - useSuiClient cho RPC interactions
  - Built-in wallet adapter support
  
- **CSS3** - Styling responsive
  - Flexbox layout system
  - CSS Grid để tạo layouts phức tạp
  - CSS Variables cho theme management
  - Media queries cho responsive design
  - Animations và transitions

### Blockchain Stack
- **Move** - Ngôn ngữ lập trình smart contract trên Sui
  - Resource-oriented architecture
  - Linear type system đảm bảo an toàn
  - Thích hợp cho các ứng dụng NFT và token
  
- **Sui Framework** - Blockchain Sui standard library
  - Object model cho quản lý trạng thái
  - Built-in support cho NFTs và digital assets
  - High-performance transaction processing
  
- **Bridge** - Kết nối giữa các blockchain
  - Cross-chain message passing
  - Token bridging capabilities
  - Multi-chain compatibility

### Công Nghệ Phụ Trợ
- **Node.js** - JavaScript runtime environment
- **JSON RPC** - Giao tiếp với blockchain
- **QR Code** - Chia sẻ và truy cập
- **npm/yarn** - Package management

---

## Yêu Cầu Hệ Thống

### Để phát triển Smart Contract
- Node.js >= 18.0
- Sui CLI >= 1.0
- Move CLI
- Git

### Để phát triển Frontend
- Node.js >= 18.0
- npm >= 9.0 hoặc yarn >= 3.0
- Git

---

## Cài Đặt

### 1. Clone repository
```bash
git clone <repository-url>
cd HeroTCG
```

### 2. Cài đặt dependencies cho smart contract
```bash
cd hero_tcg
# Cài đặt dependencies Move
sui move build
```

### 3. Cài đặt dependencies cho frontend
```bash
cd Hero_tcg_frontend
npm install
# hoặc
yarn install
```

---

## Chạy Dự Án

### Chạy Smart Contract
```bash
cd hero_tcg

# Build smart contract
sui move build

# Chạy các bài test
sui move test

# Deploy lên testnet
sui client publish --gas-budget 100000000
```

### Chạy Frontend
```bash
cd Hero_tcg_frontend

# Chạy development server
npm run dev
# hoặc
yarn dev

# Build cho production
npm run build
# hoặc
yarn build

# Preview build
npm run preview
# hoặc
yarn preview
```

Frontend sẽ chạy tại `http://localhost:5173`

---

## Cấu Trúc Dự Án

```
HeroTCG/
├── hero_tcg/                      # Smart Contract Move
│   ├── Move.toml                  # Cấu hình Move package
│   ├── sources/
│   │   ├── hero_tcg.move         # Mô-đun chính Smart Contract
│   │   └── ...
│   ├── tests/
│   │   └── hero_tcg_tests.move   # Unit tests
│   └── build/                    # Compiled artifacts
│
├── Hero_tcg_frontend/             # React Frontend
│   ├── src/
│   │   ├── App.tsx               # Thành phần chính
│   │   ├── main.tsx              # Entry point
│   │   ├── components/           # React components
│   │   │   ├── CreateHero.tsx
│   │   │   ├── Creator.tsx
│   │   │   ├── HeroCard.tsx
│   │   │   ├── HeroDetailModal.tsx
│   │   │   ├── WalletConnect.tsx
│   │   │   ├── ProfileBanner.tsx
│   │   │   ├── DiscordModal.tsx
│   │   │   ├── QRCodeModal.tsx
│   │   │   └── Footer.tsx
│   │   ├── hooks/
│   │   │   └── useWallet.ts      # Custom hook quản lý ví
│   │   ├── utils/
│   │   │   └── suiContract.ts    # Utility tương tác smart contract
│   │   └── assets/               # Hình ảnh và tài nguyên
│   ├── public/
│   ├── package.json              # Dependencies
│   ├── vite.config.ts            # Cấu hình Vite
│   └── tsconfig.json             # Cấu hình TypeScript
│
└── README.md                      # File này
```

---

## Wireframe Trang Web

### Giao Diện Chính (Main Layout)

**Khi chưa kết nối ví:**
```
┌────────────────────────────────────────────────────────────┐
│  HERO TCG                              [Connect Wallet]    │
├────────────────────────────────────────────────────────────┤
│  ⚠️ Please connect your Sui wallet to start creating heroes │
├────────────────────────────────────────────────────────────┤
│                                                             │
│          HERO TCG - CREATING LEGENDARY HEROES              │
│                                                             │
│  The ultimate decentralized trading card game on Sui       │
│  Create, collect, and trade unique hero NFTs               │
│                                                             │
│  [Connect Your Wallet to Begin]                            │
│                                                             │
│  FEATURES:                                                  │
│  - Create unique heroes with custom attributes            │
│  - Store heroes securely on Sui blockchain                │
│  - Trade with other collectors                            │
│  - Share hero QR codes                                     │
│                                                             │
├────────────────────────────────────────────────────────────┤
│                         Footer                              │
└────────────────────────────────────────────────────────────┘
```

**Khi đã kết nối ví:**
```
┌────────────────────────────────────────────────────────────┐
│  HERO TCG                              [Disconnect Wallet] │
├────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Profile: Hero Collector    Total Heroes: 5          │  │
│  │ Rank: Novice                                         │  │
│  └──────────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  LEFT PANEL                 │   RIGHT PANEL                │
│  ─────────────────────────  │   ──────────────────────────│
│                             │                              │
│  CREATE HERO FORM:          │   YOUR ARMY (Heroes Grid)   │
│  ─────────────────────      │   ──────────────────────    │
│  Name: [__________]         │   ◀  ┌─────────┐  ┌─────┐  │
│  Level: [__________]        │      │ Hero 1  │  │Hero2│  │
│  Image URL:                 │      │[Image]  │  │[Img]│  │
│  [______________]           │      │LV: 1    │  │LV:2 │  │
│  [Generate Art]             │      └─────────┘  └─────┘  │
│                             │   ▶ Refresh [Loading...]    │
│  Preview:                   │                              │
│  ┌────────────────┐         │   Pagination:               │
│  │                │         │   [< Previous] | [Next >]   │
│  │   [Preview]    │         │                              │
│  │                │         │   [Click Hero for Details]  │
│  └────────────────┘         │                              │
│                             │                              │
│  [Create Hero Button]       │                              │
│  [Minting Status...]        │                              │
│                             │                              │
├────────────────────────────────────────────────────────────┤
│                         Footer                              │
└────────────────────────────────────────────────────────────┘
```

### Chi Tiết Tạo Hero (Left Panel)
```
┌──────────────────────────────┐
│  CREATE HERO                 │
├──────────────────────────────┤
│                              │
│  Hero Name                   │
│  [_____________________]     │
│                              │
│  Hero Level                  │
│  [1] ← [Slider] → [99]      │
│                              │
│  Image URL                   │
│  [_____________________]     │
│  [Generate AI Art]           │
│                              │
│  Preview                     │
│  ┌───────────────────────┐   │
│  │      [Image]          │   │
│  │    800 x 600px        │   │
│  └───────────────────────┘   │
│                              │
│  [Create Hero on Blockchain] │
│  Status: Ready...            │
│                              │
└──────────────────────────────┘
```

### Chi Tiết Grid Heroes (Right Panel)
```
┌──────────────────────────────────────────────────┐
│  YOUR ARMY                   Total: 5            │
│  [Refresh] [Loading...]                          │
├──────────────────────────────────────────────────┤
│                                                  │
│  ◀ Prev    ┌────────┐  ┌────────┐  ┌────────┐  │
│            │ Hero 1 │  │ Hero 2 │  │ Hero 3 │  │
│            │ [Img]  │  │ [Img]  │  │ [Img]  │  │
│            │ LV: 1  │  │ LV: 5  │  │ LV: 10 │  │
│            └────────┘  └────────┘  └────────┘  │
│     Next ▶                                       │
│                                                  │
│  Page: 1 / 2  [< Prev] | [Next >]               │
│                                                  │
└──────────────────────────────────────────────────┘
```

### Modal Chi Tiết Hero
```
┌──────────────────────────────────┐
│                              [X] │
├──────────────────────────────────┤
│                                  │
│  ┌──────────────┐  Info:         │
│  │              │  Name: Hero 1   │
│  │  [Hero Img]  │  Level: 1       │
│  │              │  Object ID:     │
│  │ 400 x 500px  │  0x1234567...  │
│  │              │  Owner: 0x5678..│
│  │              │  Created: 26/12 │
│  │              │  TX Hash:       │
│  └──────────────┘  0xabcd...      │
│                                  │
│  Description:                    │
│  A legendary hero with powers    │
│  of ancient heroes...            │
│                                  │
│  Actions:                        │
│  [Share QR Code] [Discord Link]  │
│  [Copy Address]  [View on Sui]   │
│                                  │
└──────────────────────────────────┘
```

### QR Code Share Modal
```
┌──────────────────────────────┐
│  Share Hero                  │
├──────────────────────────────┤
│                              │
│  Hero: Hero 1                │
│                              │
│      ┌──────────────┐        │
│      │              │        │
│      │   [QR Code]  │        │
│      │              │        │
│      │  250 x 250   │        │
│      └──────────────┘        │
│                              │
│  [Copy Link]  [Download QR]  │
│                              │
└──────────────────────────────┘
```

---

## Hướng Dẫn Sử Dụng

### Tạo Tài Khoản và Kết Nối Ví
1. Mở ứng dụng tại `http://localhost:5173`
2. Nhấp nút "Connect Wallet" (Kết nối Ví)
3. Chọn ví Sui của bạn (Sui Wallet, OmniBTC, etc.)
4. Phê duyệt kết nối

### Tạo Nhân Vật (Hero)
1. Nhấp nút "Create Hero"
2. Nhập tên và chọn thuộc tính cho nhân vật
3. Xác nhân và xác thực giao dịch trên blockchain
4. Nhân vật sẽ xuất hiện trong danh sách của bạn

### Xem Chi Tiết Nhân Vật
1. Nhấp vào một thẻ nhân vật
2. Xem thông tin chi tiết và lịch sử giao dịch
3. Chia sẻ QR Code hoặc kết nối Discord

---

## API & Smart Contract

### Smart Contract Functions

#### Tạo Hero
```move
public fun create_hero(
    name: String,
    rank: String,
    avatar: String,
    ctx: &mut TxContext
)
```

#### Lấy thông tin Hero
```move
public fun get_hero(hero: &Hero): HeroInfo
```

### Frontend API

#### Kết nối Ví
```typescript
const { account, connected } = useCurrentAccount()
```

#### Lấy danh sách Heroes
```typescript
const heroes = await getHeroList(walletAddress)
```

#### Tạo Hero
```typescript
const result = await createHero(heroData, suiClient, wallet)
```

---

## Đóng Góp

Chúng tôi hoan nghênh các đóng góp từ cộng đồng!

### Quy trình đóng góp
1. Fork repository
2. Tạo branch cho feature (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`)
4. Push tới branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

### Hướng dẫn code
- Tuân theo quy tắc linting của Move và TypeScript
- Viết unit tests cho code mới
- Cập nhật README nếu thêm tính năng mới
- Sử dụng commit messages rõ ràng

---

## Giấy Phép

Dự án này được cấp phép dưới giấy phép MIT. Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

---

## Team

**HeroTCG Development Team**
- **Project Lead**: Tuấn Đạt
- **Frontend Developer**: Tuấn Đạt
- **Smart Contract Developer**: Tuấn Đạt
- **UI/UX Designer**: Tuấn Đạt

---

## Cảm Ơn

- Cảm ơn Sui Foundation vì blockchain tuyệt vời
- Cảm ơn cộng đồng Move vì những công cụ và tài liệu
- Cảm ơn React team vì framework tuyệt vời
- Cảm ơn tất cả những người đóng góp

---

## Liên Hệ

Nếu bạn có câu hỏi hoặc đề xuất, vui lòng:
- Repository GitHub: https://github.com/Tdat10052499/HeroTCG.git
- Mở một Issue trên GitHub
- Liên hệ qua Discord
- Gửi email tới team phát triển

---

<div align="center">

**Xây dựng với tình yêu trên Blockchain Sui**

[![GitHub](https://img.shields.io/badge/GitHub-Tdat10052499/HeroTCG-181717?style=flat&logo=github)](https://github.com/Tdat10052499/HeroTCG.git)

[⬆ Quay lại đầu trang](#herotcg---trò-chơi-thẻ-bài-nhân-vật)

</div>

---

## Deploy

### Deploy Frontend lên Vercel

#### Option 1: Vercel CLI (Được Khuyến Nghị)

**Bước 1: Cài đặt Vercel CLI**
```bash
npm i -g vercel
```

**Bước 2: Đăng nhập vào Vercel**
```bash
vercel login
```

**Bước 3: Build dự án**
```bash
cd Hero_tcg_frontend
npm run build
```

**Bước 4: Deploy**
```bash
# Deploy lần đầu (interactive)
vercel

# Deploy to production
vercel --prod
```

#### Option 2: GitHub Integration (Tự động Deploy)

**Bước 1: Push code lên GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/HeroTCG.git
git push -u origin main
```

**Bước 2: Kết nối Vercel với GitHub**
1. Truy cập https://vercel.com/new
2. Chọn "Import Git Repository"
3. Kết nối tài khoản GitHub
4. Chọn repository `HeroTCG`

**Bước 3: Cấu hình Project**
- Framework Preset: **Vite**
- Root Directory: **Hero_tcg_frontend**
- Build Command: **npm run build**
- Output Directory: **dist**

**Bước 4: Thêm Environment Variables**

Trong Vercel Dashboard, đi tới **Settings > Environment Variables** và thêm:

```
VITE_SUI_PACKAGE_ID=0xff71d817d1d5adeb8d4d8471a9fe477db82aa6eda9d1df45f3b758bd5c5fb8d4
VITE_SUI_NETWORK=testnet
```

**Bước 5: Deploy**

Click "Deploy" - Vercel sẽ tự động build và deploy.

### Cấu hình Vercel.json

Tạo file `Hero_tcg_frontend/vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm ci",
  "framework": "vite",
  "outputDirectory": "dist",
  "redirects": [
    {
      "source": "/(.*)",
      "destination": "/index.html",
      "statusCode": 200
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, s-maxage=3600"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

### Post-Deployment Checklist

- [ ] Kiểm tra URL deployed (ví dụ: https://herotcg.vercel.app)
- [ ] Test Wallet Connection trên deployed version
- [ ] Kiểm tra console không có lỗi
- [ ] Kiểm tra performance (Lighthouse)
- [ ] Test tất cả features:
  - [ ] Connect Wallet
  - [ ] Create Hero
  - [ ] View Heroes Grid
  - [ ] Hero Details Modal
  - [ ] QR Code Share
- [ ] Cấu hình custom domain (nếu cần)

### Troubleshooting

#### Build Error
```bash
# Clear node_modules và reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Environment Variables không hoạt động
1. Đảm bảo variables bắt đầu với `VITE_`
2. Restart deployment sau khi thêm variables
3. Kiểm tra trong browser: `console.log(import.meta.env.VITE_SUI_PACKAGE_ID)`

#### Wallet Connection không hoạt động
1. Kiểm tra Contract IDs có đúng không
2. Kiểm tra Network (testnet/mainnet)
3. Xóa localStorage: `localStorage.clear()`
4. Refresh page và thử lại

#### 404 Error
Đảm bảo file `vercel.json` được cấu hình đúng với redirect rules.

### Domain Setup (Optional)

**Cấu hình Custom Domain:**
1. Truy cập Vercel Dashboard → Project Settings → Domains
2. Thêm domain của bạn
3. Update DNS records theo hướng dẫn Vercel
4. Chờ DNS propagation (5-48 giờ)

---

**Status**: Đang phát triển
**Version**: 0.0.0
**Last Updated**: December 26, 2025

