# 🚀 MotionDock — Interactive Proximity Dock

A fully animated, proximity-based dock component for React, powered by Framer Motion, TypeScript, and Tailwind CSS. Each item grows, lifts, and reacts to your mouse position with smooth cosine-based scaling — just like the iconic macOS dock, but fully customizable and reusable across your apps.

## ✨ Technologies

- `React`
- `TypeScript`
- `Framer Motion`
- `Tailwind CSS`
- `Vite`

## 🔮 Features

- Proximity-based scaling powered by cosine falloff
- Dynamic width & layout updates with ResizeObserver
- Fluid spring animations for natural movement
- Customizable sizing, lift, falloff, and spacing
- Works with any content — icons, images, cards, buttons, etc.
- Reusable component structure with TypeScript interfaces
- Zero re-renders during mouse movement (MotionValues)

## 🧩 Why I Built This

I always loved the way the macOS dock feels — smooth, interactive, alive.
But most versions online are either too rigid, too janky, or hard to reuse.

So I decided to make my own:

- Started with a simple layout
- Added MotionValues to track mouse position globally
- Calculated proximity using a cosine falloff curve
- Interpolated item size dynamically
- Used real width/height animations instead of scale() to avoid overlap
- Added ResizeObserver to update dock width in real time

The result is a snappy, responsive dock that feels good to play with — whether you drop in gradient cards, social media icons, or your own components.

## ⚙️ How It Works (high-level)

- The MouseProvider tracks global mouse X using Framer Motion.
- Dock measures its width to calculate relative distances.
- Each DockItem:
  - Computes its center X
  - Calculates how close the mouse is
  - Applies cosine(angle) ** falloff to create the Mac-style scaling curve
  - Animates width/height and vertical lift with springs

This ensures smooth, predictable interactions no matter the number of items.

## 🚦 Running the Project

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open your browser at: `http://localhost:5173`

## 🎥 Preview



https://github.com/user-attachments/assets/f557f35f-5c9f-440c-9a9d-7e99b21b49cf

