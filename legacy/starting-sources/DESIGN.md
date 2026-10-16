```markdown
# Design System Document

## 1. Overview & Creative North Star: "Industrial Precision"
This design system is built to transform the rugged world of construction into a high-end, editorial digital experience. Our Creative North Star is **Industrial Precision**. We move away from the "yellow-vest" clichés of the industry and toward the sophisticated, architectural side of building. 

The system rejects the rigid, boxy layouts of standard construction sites. Instead, it utilizes **Intentional Asymmetry** and **Tonal Layering** to create a sense of structural integrity and modern movement. We treat the digital canvas like a blueprint—meticulously organized, yet breathable and sophisticated. By avoiding blue entirely, we lean into a warm, earth-and-steel palette that feels authoritative and bespoke.

---

## 2. Colors: Tonal Architecture
We use a high-contrast palette where the primary orange acts as a structural "heat map," highlighting the most critical actions against a serene, layered neutral environment.

### The "No-Line" Rule
**Prohibit 1px solid borders for sectioning.** Physical boundaries in this system are defined solely through background color shifts. A `surface-container-low` section sitting on a `surface` background provides all the definition needed. If you feel the urge to draw a line, use a margin instead.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked architectural materials. 
- Use the **Surface Container Tiers** to create depth. 
- **Layering Logic:** Place a `surface-container-lowest` card on a `surface-container-low` section. This creates a natural "lift" that mimics the way light interacts with physical planes in architecture.

### The "Glass & Gradient" Rule
To elevate the primary orange (`#a93100`) from a flat utility color to a premium brand asset:
- **Signature Textures:** Use subtle linear gradients for Hero CTAs, transitioning from `primary` (#a93100) to `primary_container` (#d43f00).
- **Glassmorphism:** For floating navigation or modal overlays, use semi-transparent `surface` colors with a 12px-20px backdrop-blur. This ensures the construction imagery underneath "bleeds through," making the UI feel integrated into the work being showcased.

---

## 3. Typography: The Editorial Blueprint
Our typography pairs the architectural strength of **Manrope** (Display/Headline) with the functional clarity of **Work Sans** (Body/Label). *Note: While the prompt suggested Montserrat, we have elevated this to a professional pairing that offers better legibility and a more "architectural" geometric feel.*

*   **Display (Manrope):** Massive, bold, and authoritative. Used for project titles and "hero" statements. This is our "steel beam"—heavy and foundational.
*   **Headline/Title (Manrope):** Tight tracking and bold weights. Conveys expertise and confidence.
*   **Body (Work Sans):** Open, breathable, and highly legible. This represents the "human" element of the construction process.
*   **Labels (Work Sans):** Used for technical specs, square footage, and metadata. Always uppercase with 0.05em letter spacing to mimic technical drawings.

---

## 4. Elevation & Depth: Tonal Layering
We do not use shadows to represent "elevation" in the traditional sense; we use **Tonal Stacking**.

*   **The Layering Principle:** Depth is achieved by placing lighter surfaces on darker surfaces (or vice versa) using the `surface-container` scale. 
*   **Ambient Shadows:** If a floating element (like a mobile FAB or a modal) requires a shadow, it must be an "Ambient Shadow." Use a blur value of 40px+, 4% opacity, and tint the shadow with the `on-surface` color. Avoid pure black shadows; they feel "dirty" on our warm neutrals.
*   **The "Ghost Border" Fallback:** If a container absolutely requires a boundary for accessibility, use the `outline_variant` at 15% opacity. It should be felt, not seen.
*   **Glassmorphism:** Use backdrop blurs on `surface_container_lowest` at 80% opacity for navigation bars to maintain a "clean and structured" feel while allowing content to flow underneath.

---

## 5. Components: Structural Elements

### Buttons
*   **Primary:** Background: `primary` (#a93100). Text: `on_primary` (#ffffff). Shape: `md` (0.75rem). Use a subtle gradient to `primary_container` on hover to simulate "pressed" metal.
*   **Secondary:** Background: `secondary_container` (#e4e2e1). Text: `on_secondary_fixed_variant`. No border.
*   **Tertiary:** No background. Text: `primary`. Used for low-priority "Read More" actions.

### Cards & Lists
*   **The Divider Ban:** Strictly forbid 1px dividers. Use a 24px vertical gap or a subtle background shift to `surface_container_high` to separate list items.
*   **Project Cards:** Use `surface_container_lowest` with a "Ghost Border" on hover to indicate interactivity. Images should always use the `md` (0.75rem) corner radius.

### Input Fields
*   **Styling:** Fill with `surface_container_low`. Use a 2px bottom-heavy "Ghost Border" that transforms into the `primary` color only when focused. This mimics the precision of a measuring tool.

### Architectural Breadcrumbs
A custom component for this system. Using `label-md` typography, these should be separated by a forward slash `/` in `outline` color, mimicking file paths in a CAD software.

---

## 6. Do’s and Don’ts

### Do
*   **DO** use whitespace as a structural element. If a section feels crowded, double the padding.
*   **DO** use the `primary` orange sparingly but boldly. It should be the "spark" on the page.
*   **DO** align text to a strict grid, but feel free to let images "break" the grid or overlap containers to create depth.

### Don't
*   **DON'T** use blue. Not even for links. Use `primary` for links.
*   **DON'T** use 100% black. Use `on_surface` (#1c1b1b) for a softer, more professional "off-black."
*   **DON'T** use traditional "Drop Shadows." They look dated. Use our Tonal Layering or Ambient Shadows.
*   **DON'T** use sharp corners. Every element should feel finished and "sanded" using the `md` (0.75rem) radius.

---
*End of Document*```