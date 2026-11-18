# iNestSys Consulting — Web Platform

Modern, high-performance web platform for **iNestSys Consulting**, showcasing enterprise infrastructure, zero-trust network modernization, and curated industry intelligence.

---

## 🌐 Live Cloud Deployment

To view the live web platform online 24/7 without needing to run a local server:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Foeudiredoli-dev%2Finestsys-consulting)

> **Note on `localhost:3000` vs Live Cloud**:
> `http://localhost:3000` is a local development address that only runs on your physical machine while `npm run dev` is actively running in your terminal. For 24/7 public access from anywhere (or to share with recruiters/clients), deploy directly to **Vercel** with the button above.

---

## ⚡ Key Features

- **Actual Live Tech News**: Curated, verified technology news from leading sources (TechCrunch, The Verge, Wired, Ars Technica, MIT Tech Review) with working external article links and direct RSS feed integration.
- **Company News & Insights**: Comprehensive iNestSys case studies, infrastructure whitepapers, and company announcements with an interactive full-screen reader modal and client takeaways.
- **Interactive Visuals**: Three.js quantum mesh backgrounds, arc-aura effects, smooth Framer Motion page reveals, and responsive typography.
- **Enterprise Contact & Consultation**: Built-in consultation request workflows.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js

---

## 💻 Local Development Setup

To run and preview the project locally on your machine:

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Local Server
```bash
npm run dev
```

### 3. Open in Browser
Once the terminal displays `Ready in ...ms`, navigate to:
[http://localhost:3000](http://localhost:3000)

*(Remember: `localhost:3000` is only available while the local terminal server is running).*

### 4. Production Build
```bash
npm run build
npm run start
```
