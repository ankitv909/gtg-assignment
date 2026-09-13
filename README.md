# GTG Perfume Landing Page

A pixel-focused, responsive **HTML/CSS/JavaScript** implementation of a perfume e-commerce landing page based on a provided design reference.

The project recreates a full marketing and product-purchase experience without a frontend framework, with an emphasis on responsive layout, reusable CSS structure, accessible controls, and interactive vanilla JavaScript behavior.

## Features

- Responsive desktop and mobile navigation
- Expandable mobile menu
- Header search interaction
- Hero section with promotional messaging and metrics
- Product image gallery with previous/next controls, dots, and thumbnails
- Product rating and marketing content
- Single-subscription product flow
- Fragrance selection controls
- Purchase-option UI and pricing presentation
- Semantic labels and ARIA attributes on interactive controls
- Responsive styling across common viewport sizes

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts

No frontend framework or build system is required.

## Project Structure

```text
.
├── index.html
├── css/
│   └── style.css
├── js/
├── assets/
│   └── img/
└── README.md
```

## Run Locally

Because the project is static, you can open `index.html` directly in a browser. For a local HTTP server, use any static server, for example:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Implementation Notes

The interface is built from the supplied visual design rather than a component library. Product-gallery state, navigation interactions, purchase-plan controls, and responsive behavior are implemented in plain JavaScript and CSS.

Accessibility considerations include descriptive labels, button semantics, navigation labels, `aria-expanded` state for the mobile menu, and alt text for meaningful product imagery.

## Purpose

This project demonstrates the ability to translate a detailed visual design into a responsive, interactive web page using core browser technologies, without relying on React or another UI framework.
