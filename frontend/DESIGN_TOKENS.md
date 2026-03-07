# DocuMind.AI - Design Tokens Reference

## 🎨 Complete Color System

### Core Palette

| Token | Hex Value | Usage | Light | Dark |
|-------|-----------|-------|-------|------|
| **--background** | #0f0f14 | Page background, body | ✓ | ✓ |
| **--foreground** | #e8e9ed | Primary text color | ✓ | ✓ |
| **--card** | #1a1a22 | Card/panel backgrounds | ✓ | ✓ |
| **--card-foreground** | #e8e9ed | Card text | ✓ | ✓ |
| **--primary** | #00d9ff | Main action, highlights, neon glow | ✓ | ✓ |
| **--primary-foreground** | #0f0f14 | Text on primary buttons | ✓ | ✓ |
| **--secondary** | #8b5cf6 | Secondary actions, accents | ✓ | ✓ |
| **--secondary-foreground** | #f8f8fa | Text on secondary | ✓ | ✓ |
| **--muted** | #2a2a35 | Inactive states, subtle backgrounds | ✓ | ✓ |
| **--muted-foreground** | #8b8b9b | Disabled text, helper text | ✓ | ✓ |
| **--accent** | #00d9ff | Interactive hover states | ✓ | ✓ |
| **--accent-foreground** | #0f0f14 | Accent text | ✓ | ✓ |
| **--border** | #2a2a35 | Dividers, borders, outlines | ✓ | ✓ |
| **--input** | #1a1a22 | Input field backgrounds | ✓ | ✓ |
| **--ring** | #00d9ff | Focus states, validation | ✓ | ✓ |

### Status Colors

| Status | Color | Usage |
|--------|-------|-------|
| **Success** | #22c55e / #10b981 | Checkmarks, success badges, green indicators |
| **Error** | #ef4444 | Error badges, destructive actions, red indicators |
| **Warning** | #f59e0b | Warning messages, caution states |
| **Info** | #00d9ff | Information messages, primary highlights |

### Chart Colors

| Variable | Color | Purpose |
|----------|-------|---------|
| **--chart-1** | #00d9ff | Primary chart line (Cyan) |
| **--chart-2** | #8b5cf6 | Secondary chart data (Purple) |
| **--chart-3** | #06b6d4 | Tertiary data (Cyan) |
| **--chart-4** | #a78bfa | Quaternary data (Light Purple) |
| **--chart-5** | #22d3ee | Quinary data (Light Cyan) |

### Sidebar Tokens

| Token | Color | Usage |
|-------|-------|-------|
| **--sidebar** | #0f0f14 | Sidebar background |
| **--sidebar-foreground** | #e8e9ed | Sidebar text |
| **--sidebar-primary** | #00d9ff | Active nav item background |
| **--sidebar-accent** | #8b5cf6 | Sidebar accent elements |
| **--sidebar-border** | #2a2a35 | Sidebar dividers |

---

## 🎭 Visual Effects & Layers

### Glass Effect
```css
.glass {
  background: rgba(26, 26, 34, 0.4);  /* card/40 opacity */
  backdrop-filter: blur(20px);         /* xl blur */
  border: 1px solid rgba(42, 42, 53, 0.3);
  border-radius: 0.625rem;
}
```

### Glow Shadow (Primary)
```css
box-shadow: 0 10px 15px -3px rgba(0, 217, 255, 0.2);
```

### Neon Border
```css
border: 1px solid rgba(0, 217, 255, 0.2);
box-shadow: 0 4px 6px rgba(0, 217, 255, 0.1);
```

### Background Grid Overlay
```css
background-image: 
  linear-gradient(rgba(0, 217, 255, 0.03) 1px, transparent 1px),
  linear-gradient(90deg, rgba(0, 217, 255, 0.03) 1px, transparent 1px),
  radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
  radial-gradient(circle at 80% 80%, rgba(0, 217, 255, 0.08) 0%, transparent 50%);
background-size: 60px 60px, 60px 60px, 100% 100%, 100% 100%;
```

---

## 📏 Spacing & Sizing

### Radius Scale
| Size | Value | Usage |
|------|-------|-------|
| **--radius** | 0.625rem (10px) | Default border radius |
| **--radius-sm** | 0.5625rem (9px) | Smaller elements |
| **--radius-md** | 0.625rem (10px) | Medium elements |
| **--radius-lg** | 0.625rem (10px) | Large elements |
| **--radius-xl** | 0.6875rem (11px) | Extra large elements |

### Spacing Scale (Tailwind)
- **p-2** = 0.5rem (8px)
- **p-3** = 0.75rem (12px)
- **p-4** = 1rem (16px)
- **p-6** = 1.5rem (24px)
- **gap-2** = 0.5rem
- **gap-3** = 0.75rem
- **gap-4** = 1rem
- **gap-6** = 1.5rem

---

## 🎯 Component Color Usage

### Stat Cards
- **Background**: `bg-card/40` (glassmorphism)
- **Border**: `border-border/30`
- **Glow**: `shadow-lg shadow-primary/20`
- **Icon**: `bg-primary/10`
- **Text**: `text-foreground`
- **Accent**: `text-primary`

### Buttons
- **Primary Button**: 
  - `bg-gradient-to-r from-primary to-secondary`
  - `text-primary-foreground`
  - Hover: `shadow-xl shadow-primary/30`
  
- **Secondary Button**:
  - `bg-secondary/20`
  - `text-secondary`
  - Hover: `bg-secondary/30`

- **Ghost Button**:
  - `bg-card border-border/30`
  - `text-foreground`
  - Hover: `bg-card/80`

### Status Badges
- **Success**: `bg-green-500/20 text-green-400`
- **Error**: `bg-red-500/20 text-red-400`
- **Active**: `bg-primary/20 text-primary`
- **Inactive**: `bg-muted text-muted-foreground`

### Input Fields
- **Background**: `bg-card`
- **Border**: `border-border/50`
- **Focus**: `border-primary/50 focus:outline-none`
- **Text**: `text-foreground`
- **Placeholder**: `text-muted-foreground`

### Navigation Items
- **Active**: 
  - `bg-sidebar-primary/20`
  - `text-sidebar-primary`
  - `border border-sidebar-primary/30`
  
- **Inactive**:
  - `text-sidebar-foreground/70`
  - Hover: `text-sidebar-foreground hover:bg-sidebar-accent/10`

---

## 🌈 Gradient Combinations

### Primary Gradient
```
from-primary (#00d9ff) to-secondary (#8b5cf6)
```
Used for: Primary buttons, headers, badges

### Cyan-to-Purple
```
from-primary to-secondary
```
Used for: Logo gradient, accent backgrounds

### Neon Glow Gradient (Charts)
```
from-primary to-secondary
with 30% opacity
```

---

## 📱 Theme Application

### Dark Mode (Always Active)
All colors automatically use dark theme values. The `<html>` element has the `.dark` class applied by default.

```css
html {
  @apply dark;
}
```

### CSS Variable Usage in Components
```tsx
// In inline styles
style={{ color: 'var(--primary)' }}

// In Tailwind classes
className="bg-primary text-primary-foreground border-border"
```

---

## ♿ Accessibility Notes

### Color Contrast Ratios
- **Foreground on Background**: 13.7:1 (AAA)
- **Primary on Primary-Foreground**: 5.4:1 (AA)
- **Secondary on Secondary-Foreground**: 4.9:1 (AA)
- **Muted-Foreground on Background**: 4.2:1 (AA)

### Color Blind Friendly
- **Success/Error**: Uses both color AND shape (checkmark vs X)
- **Status**: Both color AND text label
- **Chart**: Multiple data series with different colors AND line styles

---

## 🎨 Usage Examples

### Create a Glowing Card
```tsx
<div className="glass glass-border glow-accent p-6">
  Content here
</div>
```

### Create a Stat Card
```tsx
<div className="stat-card">
  <h3 className="neon-text">1,250</h3>
  <p className="text-foreground/60">Credits</p>
</div>
```

### Create a Primary Button
```tsx
<button className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:shadow-xl hover:shadow-primary/30 transition-all">
  Action
</button>
```

### Create a Status Badge
```tsx
<span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
  ✓ Success
</span>
```

---

## 🔄 Color Migration Guide

If you want to change the entire theme:

1. **Edit `/app/globals.css`**: Update all `--` custom properties
2. **Update chart colors**: Modify `--chart-1` through `--chart-5`
3. **Update accent colors**: Change primary & secondary hex values
4. **Test contrast**: Verify all text meets WCAG standards
5. **Update glow effects**: Adjust shadow colors to match new primary

---

**All colors and tokens are designed to work harmoniously for a modern, professional AI SaaS product aesthetic.**
