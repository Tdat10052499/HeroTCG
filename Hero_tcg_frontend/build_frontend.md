Act as a Senior Frontend Developer. I need you to refactor and fix the frontend for a "Sui Hero AI Game" dApp.

### 1. Design System & Theme (Strictly Enforced)
- **Theme:** "Liquid Glass" & "Cyberpunk Future".
- **Color Palette:**
  - **Background:** Deep Dark Blue/Black (`#0a0e27` to `#0f1535`).
  - **Primary Accent:** Light Blue / Cyan (`#00d4ff` to `#0099cc`).
  - **Secondary Accent:** White (for text and high contrast elements).
  - **Surface:** Glassmorphism (Translucent dark blue with blur).
- **Styling Approach:**
  - **NO TAILWIND CSS.** You must use standard **CSS** (or CSS Modules).
  - Use `App.css` and `index.css` for styling.
  - Implement **Liquid Glass** effects: High blur (`backdrop-filter: blur(20px)`), glossy borders (`1px solid rgba(0, 212, 255, 0.3)`), and fluid animations.

### 2. Core Features to Fix & Implement
The current code is broken (layout issues, images too large, missing styles). You need to rewrite the following components to match the wireframe and design system:

**A. Global Styles (`index.css`)**
- Define CSS Variables for colors (`--primary`, `--bg-dark`, `--glass-bg`).
- Reset default browser styles.
- Create a `.liquid-card` utility class for the glass effect.
- Create a `.neon-button` class for glowing buttons.

**B. `App.tsx` (Layout)**
- Structure:
  1. **Navbar:** Sticky top, glass effect. Logo on left, Navigation links center, Wallet Connect on right.
  2. **Profile Banner:** A distinct section below navbar showing User Avatar (with animated ring), Name, and Rank.
  3. **Main Content (Grid):**
     - **Left Column (35%):** "Summon Hero" Form.
     - **Right Column (65%):** "Your Army" Grid (Responsive).

**C. `CreateHero.tsx` (Left Panel)**
- Style the input fields with a glowing blue border on focus.
- The "Generate Art" button must have a liquid fill animation.
- Image Preview: Must be a fixed square aspect ratio with a "scanning" animation overlay while loading.

**D. `HeroCard.tsx` (Right Grid Items)**
- **CRITICAL FIX:** Images must be contained (`object-fit: cover`) within a fixed height (e.g., 250px). No overflowing images.
- Card Style: Dark glass background, light blue border glow on hover.
- Rarity Badges: Small tags with different border colors based on rarity.

**E. `ProfileBanner.tsx`**
- Layout: Flexbox, centered.
- Avatar: Circular with a rotating border effect using CSS animations.

### 3. Deliverables
Please generate the full code for the following files. Ensure NO Tailwind classes are used.

1.  `src/index.css` (Global variables, resets, and utility classes).
2.  `src/App.css` (Layout specific styles).
3.  `src/App.tsx` (Refactored layout structure).
4.  `src/components/CreateHero.tsx` (Styled form).
5.  `src/components/HeroCard.tsx` (Styled card with fixed image size).
6.  `src/components/ProfileBanner.tsx` (Styled profile section).
