---
Language: [Tiếng Việt](#vietnamese) | [English](#english)

---

<h1 id="vietnamese">HeroTCG - Trò Chơi Thẻ Bài Nhân Vật</h1>

Một ứng dụng game thẻ bài phân tán được xây dựng trên blockchain Sui, cho phép người dùng tạo, sở hữu và giao dịch các chiếc thẻ nhân vật (Hero) duy nhất.

## Mục Lục

- [Tính Năng](#tính-năng-vietnamese)
- [Công Nghệ](#công-nghệ-vietnamese)
- [Yêu Cầu Hệ Thống](#yêu-cầu-hệ-thống-vietnamese)
- [Cài Đặt](#cài-đặt-vietnamese)
- [Chạy Dự Án](#chạy-dự-án-vietnamese)
- [Cấu Trúc Dự Án](#cấu-trúc-dự-án-vietnamese)
- [Wireframe Trang Web](#wireframe-trang-web-vietnamese)
- [Hướng Dẫn Sử Dụng](#hướng-dẫn-sử-dụng-vietnamese)
- [API & Smart Contract](#api--smart-contract-vietnamese)
- [Đóng Góp](#đóng-góp-vietnamese)
- [Giấy Phép](#giấy-phép-vietnamese)

<h2 id="tính-năng-vietnamese">Tính Năng</h2>

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

<h2 id="công-nghệ-vietnamese">Công Nghệ</h2>

### Backend (Smart Contract)
- **Move**: Ngôn ngữ lập trình smart contract trên Sui được thiết kế để tối ưu hóa bảo mật và hiệu quả
  - Resource-oriented architecture
  - Linear type system đảm bảo an toàn
  - Thích hợp cho các ứng dụng NFT và token
  
- **Sui Framework**: Blockchain Sui standard library cung cấp:
  - Object model cho quản lý trạng thái
  - Built-in support cho NFTs và digital assets
  - High-performance transaction processing
  
- **Bridge**: Kết nối giữa các blockchain
  - Cross-chain message passing
  - Token bridging capabilities
  - Multi-chain compatibility

### Frontend
- **React 18**: Thư viện UI hiện đại
  - Component-based architecture
  - React Hooks cho state management
  - Fast rendering với Concurrent features
  - Virtual DOM optimization
  
- **TypeScript**: Lập trình an toàn với kiểu dữ liệu
  - Static type checking giảm bugs
  - Tốt hơn IDE autocompletion
  - Better code documentation
  - Type-safe blockchain interactions
  
- **Vite**: Build tool hiệu suất cao
  - Lightning-fast HMR (Hot Module Replacement)
  - Fast cold server start
  - Optimized production build
  - ESM support
  
- **Sui dApp Kit**: Công cụ phát triển ứng dụng Sui
  - useCurrentAccount hook cho wallet state
  - useSignAndExecuteTransaction cho blockchain transactions
  - useSuiClient cho RPC interactions
  - Built-in wallet adapter support
  
- **CSS3**: Styling responsive
  - Flexbox layout system
  - CSS Grid để tạo layouts phức tạp
  - CSS Variables cho theme management
  - Media queries cho responsive design
  - Animations và transitions

### Công Nghệ Phụ Trợ
- **Node.js**: JavaScript runtime environment
  - npm/yarn package management
  - Development server
  
- **JSON RPC**: Giao tiếp với blockchain
  - Sui JSON-RPC API
  - Async/await pattern
  - Error handling
  
- **QR Code**: Chia sẻ và truy cập
  - QR code generation
  - Deep linking
  - Share functionality

<h2 id="yêu-cầu-hệ-thống-vietnamese">Yêu Cầu Hệ Thống</h2>

### Để phát triển Smart Contract
- Node.js >= 18.0
- Sui CLI >= 1.0
- Move CLI
- Git

### Để phát triển Frontend
- Node.js >= 18.0
- npm >= 9.0 hoặc yarn >= 3.0
- Git

<h2 id="cài-đặt-vietnamese">Cài Đặt</h2>

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

<h2 id="chạy-dự-án-vietnamese">Chạy Dự Án</h2>

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

<h2 id="cấu-trúc-dự-án-vietnamese">Cấu Trúc Dự Án</h2>

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

<h2 id="wireframe-trang-web-vietnamese">Wireframe Trang Web</h2>

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

<h2 id="hướng-dẫn-sử-dụng-vietnamese">Hướng Dẫn Sử Dụng</h2>

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

<h2 id="api--smart-contract-vietnamese">API & Smart Contract</h2>

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

<h2 id="đóng-góp-vietnamese">Đóng Góp</h2>

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

<h2 id="giấy-phép-vietnamese">Giấy Phép</h2>

Dự án này được cấp phép dưới giấy phép MIT. Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

---

**Status**: Đang phát triển
**Version**: 0.0.0
**Last Updated**: December 26, 2025
