# Zeh-Zeh Developer Guide Roadmap

This guide details every step to create and deploy a single-page React JSX landing page with a responsive design system, inline styling, and framer-motion animations. The project will use Vite, and deployment will be via GitHub Pages with a custom GoDaddy domain.

---

## 1. Prerequisites

- **Node.js & npm** (latest LTS)
- **Git** (for repo management)
- **Vite** (for rapid development)
- **GitHub account** (for deployment via GitHub Pages)
- Assets: `background.png`, `lights.png`, `text.png`, `subject.png`

---

## 2. Initial Setup

You've cloned the empty `zeh-zeh` repo into your local folder, and cd into it:

```bash
cd zeh-zeh
```

### 2.1. Initialize Vite with React

Run the Vite setup command (using the latest React template):

```bash
npm init vite@latest . -- --template react
```

Then install the dependencies:

```bash
npm install
```

### 2.2. Install Additional Dependencies

Install framer-motion for animations and gh-pages for deployment:

```bash
npm install framer-motion
npm install --save-dev gh-pages
```

---

## 3. Project Structure & Files

Your directory should resemble:

```
zeh-zeh/
├── public/
│   ├── background.png
│   ├── lights.png
│   ├── text.png
│   └── subject.png
├── src/
│   ├── components/
│   │   ├── PlatformsContainer.jsx
│   │   └── Platform.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── MobileHome.jsx
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── ... (other Vite config files)
```

---

## 4. Development Details

### 4.1. Responsive Design System

- **Design Approach:**  
  - Use a base design system with pixel-based values.
  - Define a variable (e.g., `baseWidth`) that represents the reference width.
  - Scale all element sizes and positions proportionally based on the current window width (scaling as a joint "picture").
  - **Breakpoints:**  
    - Desktop: >480px  
    - Mobile: ≤480px (use a similar base design scaling system for mobile, zoom into the square `background.png` so it fills the height)

- **Inline Styling**
  - Use inline styles.

### 4.2. Pages Setup

- **Home.jsx (Desktop)**  
  - Renders the full desktop landing page.
  - Uses `background.png` as is.
  - Centers `text.png` and `subject.png` with:
    - `subject` having a higher `z-index` than `text`
    - `text` using blend mode `add` (via CSS filter or appropriate style)
  
- **MobileHome.jsx (Mobile)**  
  - Renders when window width is ≤480px.
  - For `background.png`, apply a zoom effect (scale/crop) so the image's height covers the viewport.
  - Similar to Home.jsx but with modifications:
    - Adjust the background style to “zoom in” by changing object-fit or applying a CSS transform.
    - mobile-specific scaling variables.
  
### 4.3. Platforms Components

- **PlatformsContainer.jsx**  
  - Imports the `platforms` array and maps over it to render a list of `Platform.jsx` components.
  - Display platforms in a single, stacked column.

  const platforms = [
    {
      icon: '/icons/spotify.svg',
      title: 'Spotify',
      link: 'https://spotify.com/yourprofile',
    },
    {
      icon: '/icons/apple-music.svg',
      title: 'Apple Music',
      link: 'https://apple.com/music/yourprofile',
    },
    {
      icon: '/icons/youtube.svg',
      title: 'YouTube',
      link: 'https://youtube.com/yourchannel',
    },
    // Future dynamic additions...
  ];


- **Platform.jsx**  
  - Renders a “pill” button with an icon on the left and the title text.
  - Use inline styles for layout.

---

## 5. Animations with Framer Motion

- Use Framer Motion’s `motion` components to animate scroll-based opacity on the lights.
- Extend animations as needed for additional elements.

---

## 6. Deployment with GitHub Pages

### 6.1. Configure package.json

Add a `homepage` field pointing to `https://Rafibarides.github.io/zeh-zeh`:

```json
{
  "homepage": "https://Rafibarides.github.io/zeh-zeh",
  ...
}
```

Add deployment scripts:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

### 6.2. Deployment Commands

- To run locally:

  ```bash
  npm run dev
  ```

- To build the project:

  ```bash
  npm run build
  ```

- To deploy:

  ```bash
  npm run deploy
  ```

### 6.3. Custom Domain Setup with GoDaddy

1. In your GitHub repository settings, go to the GitHub Pages section and add your custom domain.
2. In your GoDaddy DNS settings, add a CNAME record pointing your domain (or subdomain) to `rafibarides.github.io`.
3. Wait for DNS propagation.

---

## 7. Final Notes

- **Responsiveness:**  
  Ensure you test on both desktop (>480px) and mobile (≤480px) to verify scaling and the background adjustments.

- **Future Dynamic Links:**  
  The `platforms` array in `PlatformsContainer.jsx` is structured to allow easy additions.

The lights graphic sits flush at the top edge of the viewport with no margins, using a screen blend mode. Its opacity is continuously and smoothly linked to the scroll position—gradually ramping from completely transparent to fully opaque and back as the user scrolls up and down, creating a dynamic, responsivelight effect.


-**Summary**

# Zeh-Zeh Repository 

## Design Systems
- Two base design systems:
  - **Desktop**: Uses hard-coded pixels but scales as a collective picture via variables.
  - **Mobile**: Breakpoint ≤ 480px with its own scaling system.

## Component Structure
- **Home Components**:
  - `home.jsx` (desktop)
  - `mobileHome.jsx` (mobile)
  - Use inline styling.

- **Background Image**:
  - `Background.png` is square.
  - On mobile, zoom in to crop sides so its height covers the site.

- **Platform System**:
  - Create `PlatformsContainer.jsx` to map over a dynamic `platforms` array.
    - Initial platforms: `spotify`, `apple music`, `youtube`.
  - Each platform is rendered as a `Platform.jsx` component.
  - **Platform.jsx**:
    - Renders a "pill" button.
    - Includes an icon on the left and title text.

## Visual Effects
- **Lights Effect**:
  - Use `lights.png` at the very top of the screen.
  - No margin/padding.
  - Set blend mode to `screen`.
  - Opacity continuously changes from 0% to 100% based on scroll.

- **Centered Elements**:
  - `text.png` and `subject.png` should be centered.
  - `subject.png` should appear in front (higher `z-index`).
  - `text.png` should use `blend mode: add`.

## Tech Stack
- Use **Vite** with **React** (latest versions and syntax).
- Use **framer-motion** for animations.

## Deployment
- Commands:
  - `npm run dev`
  - `npm run build`
  - `npm run deploy`
- Deploy with **GitHub Pages**.
- Use a **custom domain** from **GoDaddy**.
