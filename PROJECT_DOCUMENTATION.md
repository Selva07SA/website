# Problem Info Tech - Codebase Documentation

This document is for your personal reference to understand the structure of this project, where different parts of the website are located, and how to make changes.

## 📁 Project Structure Overview

The project is built using:
- **React**: For building the user interface.
- **Vite**: For fast development and building.
- **Tailwind CSS**: For styling all the elements.
- **TypeScript**: For writing more secure and robust code.

All the actual code you care about is inside the `src/` folder.

```
src/
├── components/   # The individual "building blocks" of the website
├── pages/        # The main pages that combine the building blocks
├── lib/          # Helper tools and utilities
├── App.tsx       # Setups up all your routes/pages (like /home, /about)
├── index.css     # The main styling file for colors, fonts, and generic styles
└── main.tsx      # The very entry point of the app (starts the React app)
```

---

## 🛠️ How to Find and Change Things

Here is a detailed breakdown of where to go when you want to change a specific part of your website.

### 1. The Navigation Bar (Menu)
- **What it is:** The top bar with your logo, menu links ("Home", "Products", etc.), and the "Get Demo" button.
- **File Location:** `src/components/Navbar.tsx`
- **Where it is used:** It's placed on the main page inside `src/pages/Index.tsx`.
- **How to change:**
  - If you want to change the text color, layout, or button inside the Navbar, edit `src/components/Navbar.tsx`.
  - The links (Home, Products, etc.) are defined at the very top of `Navbar.tsx` in a list (`const navLinks = [...]`). Change them there to add/remove links.

### 2. The Hero Section (First impression section)
- **What it is:** The large section right under the Navbar that introduces your company. It has the typing effect ("Problem. Powerful Software Solutions...").
- **File Location:** `src/components/Hero.tsx`
- **Where it is used:** Inside `src/pages/Index.tsx`.
- **How to change text/typing effect:** 
  - Open `src/components/Hero.tsx`. Look at the top for `PROBLEM_TEXT` and `FINAL_TEXT`. Change these variables to change the animated text.
- **How to change spacing:** The padding/margins are controlled via Tailwind classes (like `pt-20`, `pb-12`).

### 3. The Services Section
- **What it is:** The section describing what your company offers.
- **File Location:** `src/components/Services.tsx`
- **Where it is used:** Included in `src/pages/Index.tsx`.

### 4. The Products Section
- **What it is:** The section listing the SaaS products or solutions you offer.
- **File Location:** `src/components/Products.tsx`

### 5. Why Choose Us / Process / Portfolio / Testimonials
- **Locations for these sections:**
  - `src/components/WhyChooseUs.tsx`
  - `src/components/Process.tsx`
  - `src/components/Portfolio.tsx`
  - `src/components/Testimonials.tsx`
- **How they are organized:** 
  - Simply open the respective file. You will usually find an array/list (like `const testimonials = [...]` or `const steps = [...]`) at the top where you can edit the content easily without touching the complex layout code.

### 6. The Contact / Footer Sections
- **Contact Form Location:** `src/components/Contact.tsx`
- **Footer Location:** `src/components/Footer.tsx` (Bottom of the page with copyrights and links).

---

## 🔗 The Main Page (`Index.tsx`)

If you want to reorder sections, completely remove a section, or add a new one you created, you need to go to the **Master Page**:

**File:** `src/pages/Index.tsx`

When you open `Index.tsx`, you will see something like this:
```tsx
const Index = () => (
  <>
    <Navbar />
    <Hero />
    <Products />
    <Services />
    ...
  </>
);
```
To re-arrange the page, simply swap the order of these tags. If you want to hide the `<Products />` section, just delete that line!

---

## 🎨 Styling and Colors

The website uses **Tailwind CSS**, but it has a specific file for your color theme.

**File:** `src/index.css`

At the top of this file, inside the `:root` block, you will see CSS variables:
```css
--background: 0 0% 100%;
--foreground: 0 0% 0%;
--primary: 0 0% 0%;
```
If you ever want to change the primary brand color globally across the whole website, this is the place to do it. It uses HSL (Hue, Saturation, Lightness) format.

---

## 🌐 Adding New Pages (Routing)

If you want to add a completely new page (for example, `yourwebsite.com/about`):

1. **Create the file:** Create `About.tsx` inside `src/pages/`.
2. **Link it up:** Open `src/App.tsx`.
3. **Add the Route:** Add `<Route path="/about" element={<About />} />` inside the `<Routes>` list.

---

### Best Practices & Tips For You:
1. **Never edit `node_modules`:** That folder contains downloaded packages and any changes there will be wiped out automatically.
2. **Keep the server running:** When making changes, keep `npm run dev` running in your terminal so you can immediately see the changes on `localhost:8080`.
3. **Tailwind Cheat Sheet:** If you need to change margins/paddings, search for "Tailwind CSS margins" online. (e.g., `mt-4` = margin top, `pb-8` = padding bottom).
