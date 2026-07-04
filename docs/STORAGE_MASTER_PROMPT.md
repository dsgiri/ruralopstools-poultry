# Storage Reusable Calculator Page Master Prompt

## 1. Purpose of this template
This template is the official standard for generating new calculator pages on the **Storage** utility site (part of the Rural Utility Cost network). It ensures that every new calculator matches the established page architecture, UI/UX language, branding, and trust mechanics of the existing tools (like the Grain Bin Capacity Estimator).

Use this template to generate robust, ready-to-launch calculators without reinventing the wheel or introducing inconsistent design patterns.

## 2. Design and product principles
Every Storage calculator page must strictly follow these principles:
- **Practical Tone:** Straightforward, agricultural utility copy. No SaaS-isms, marketing fluff, or "AI slop" ("Leverage powerful metrics"). 
- **Tool-First:** The calculator interface must be the star. The user should be able to start interacting immediately above the fold.
- **Transparent Assumptions:** Clearly list all constants, formulas, and baseline assumptions used to compute results.
- **Clear Primary Result:** The output must have a prominent visual hierarchy using bold fonts and brand contrast colors.
- **No Fake Precision:** If an output is a rough estimate, round it logically and state it clearly.
- **Strict Brand Constraints:** Use the existing CSS tokens. Do not introduce new colors, gradients, or glassmorphism.

## 3. Shared page structure
Every calculator page must be structured from top to bottom as follows:
1. **Header/Nav:** Standard global nav (assumed provided by layout).
2. **Hero/Introduction:** Brief H1 title and a one-sentence descriptive subtitle.
3. **The Calculator Module:** A responsive, two-column (or stacked on mobile) card containing inputs and results.
4. **How It Works & Assumptions:** A clean text block explaining the math, variables, and caveats.
5. **FAQ Section:** Accordions or simple Q&A for common questions related specifically to this tool's domain.
6. **Related Tools:** Links to 2-3 other relevant calculators in the ecosystem.
7. **Legal/Disclaimer Text:** Required boilerplate stating this is an estimate, not engineering or financial advice.
8. **Footer:** Standard global footer.

## 4. Shared UI/UX rules
- **Hero Style:** Minimalist. Kraft paper background (`--kraft`), dark ink (`--ink`), sans-serif or slab headings.
- **Form Layout:** Clean inputs with clear `<label>` tags. Use visual controls (sliders, toggles, native dropdowns) where appropriate instead of plain text boxes.
- **Results Layout:** Right side on desktop, bottom on mobile. Real-time updates. The primary result uses `--rust` (orange) or `--board` (brown) as an accent. 
- **Supporting Content Style:** Prose format with clear `H2` and `H3` hierarchy. Unordered lists for bullet points.
- **FAQ Behavior:** Clean HTML `<details>` and `<summary>` elements or simple stacked text.
- **Disclaimer Placement:** Small print (`text-sm text-ink-soft`) placed below the results and at the bottom of the content.

## 5. Shared accessibility rules
- All inputs must have associated, descriptive `<label>` elements.
- Ensure sufficient contrast (e.g., `--ink` text on `--kraft` background).
- Results must be accessible to screen readers (e.g., using `aria-live="polite"`).
- Keyboard navigation must work for all sliders, inputs, and toggles.

## 6. Shared mobile rules
- **Mobile-First Layout:** The two-column desktop calculator layout must break down into a single stacked column (inputs on top, results sticking below them) for screens under `md` (768px).
- **Touch Targets:** Minimum 44px height for inputs and buttons.
- **Input Types:** Use appropriate HTML5 input types (`type="number"`) to trigger numeric keypads on mobile.

## 7. Shared repository safety rules
When a coding agent uses this template, they **MUST NOT**:
- Modify global CSS (`index.css`), layout wrappers, or routing without explicit permission.
- Introduce new npm dependencies (like charting libraries or UI component frameworks) unless the prompt explicitly requests it.
- Hallucinate mock API calls or "loading" spinners. Computations should be immediate and client-side.
- Remove or overwrite unrelated pages.

## 8. Parameter list
To use the template, the following parameters must be provided:
- `{{CALCULATOR_NAME}}`: The exact H1 title of the tool.
- `{{PAGE_SLUG}}`: The URL path (e.g., `/feed-storage-capacity`).
- `{{PRIMARY_USER_GOAL}}`: The one-sentence summary of what the user achieves.
- `{{INTRO_SUMMARY}}`: The descriptive text below the H1.
- `{{INPUT_FIELDS}}`: A detailed list of inputs, including their units, type (slider/dropdown/number), and default values.
- `{{OUTPUT_FIELDS}}`: A detailed list of computed results, identifying which is the "Primary Result".
- `{{FORMULA_LOGIC}}`: The exact mathematical formulas to compute the outputs.
- `{{ASSUMPTIONS}}`: The constants and caveats to display to the user.
- `{{FAQ_TOPICS}}`: 2-3 specific questions and answers to include.
- `{{RELATED_TOOLS}}`: Which other tools to link to.
- `{{DISCLAIMER_NOTES}}`: Any specific warnings (e.g., "Always consult a structural engineer before filling a bin past rated capacity").

---

## 9. Reusable master prompt template
*Copy and paste the text below, replacing the bracketed variables, to generate a new calculator page.*

```text
You are building a new calculator page for the "Storage" utility site in the Rural Utility Cost network.

Build a React component for the following calculator:
Name: {{CALCULATOR_NAME}}
Path: {{PAGE_SLUG}}

This page must perfectly match the established design system, using our custom CSS variables (e.g., var(--kraft), var(--ink), var(--rust), var(--board)) and Tailwind utility classes. Do not introduce new CSS, external UI libraries, or mock API calls. All calculations must happen in real-time on the client side.

### 1. Header & Intro
- H1: {{CALCULATOR_NAME}}
- Subtitle: {{INTRO_SUMMARY}}
- Goal context: {{PRIMARY_USER_GOAL}}

### 2. Calculator Interface
Implement a responsive 2-column layout (stacks to 1 column on mobile).
Left Column (Inputs):
{{INPUT_FIELDS}}
(Ensure all inputs have proper labels, touch targets, and use HTML5 input types).

Right Column (Outputs):
{{OUTPUT_FIELDS}}
(The primary output must be visually anchored with bold typography and an accent color. Wrap the results region with `aria-live="polite"`).

### 3. Business Logic
Use the following formulas to compute the results in real-time as inputs change:
{{FORMULA_LOGIC}}

### 4. Supporting Content
Below the fold, implement a clean prose section detailing the math and constraints:
- **Assumptions & Caveats:** {{ASSUMPTIONS}}
- **FAQ:** Build simple, accessible dropdowns/accordions for:
  {{FAQ_TOPICS}}
- **Related Tools:** Add simple links to:
  {{RELATED_TOOLS}}

### 5. Disclaimer
At the bottom of the page, render this disclaimer in small, muted text:
{{DISCLAIMER_NOTES}}
Standard boilerplate: "This tool provides estimates for general planning purposes only. It does not replace professional engineering, agronomic, or financial advice."

Ensure the code is self-contained, typed securely, and ready to drop into the existing routing structure.
```

---

## 10. Usage instructions
1. Copy the block inside the "Reusable master prompt template" section.
2. Fill out every `{{VARIABLE}}` bracket with specific data for the target calculator. 
3. Feed the filled-out prompt to your AI coding agent.
4. Review the generated component against the Consistency Checklist (Section 12).

## 11. Example filled-in variants

### Variant 1: Feed Storage Capacity Calculator
- **{{CALCULATOR_NAME}}**: Feed Storage Capacity Calculator
- **{{INPUT_FIELDS}}**: 
  - Bunker Width (ft) [Number input, default: 40]
  - Bunker Length (ft) [Number input, default: 100]
  - Average Silage Depth (ft) [Slider: 5 to 20, default: 10]
  - Silage Density (lbs/cu ft) [Dropdown: Corn Silage (40), Haylage (35), default: Corn]
- **{{OUTPUT_FIELDS}}**:
  - Primary: Total Tons of Feed (bold, rust color)
  - Secondary: Total Cubic Feet
- **{{FORMULA_LOGIC}}**: Volume = W * L * D. Total Tons = (Volume * Density) / 2000.

### Variant 2: Equipment Storage Planner
- **{{CALCULATOR_NAME}}**: Equipment Storage Planner
- **{{INPUT_FIELDS}}**: 
  - Tractor Count [Number, default 2]
  - Implement Count [Number, default 4]
  - Allow for Maintenance Bay? [Toggle, default Yes]
- **{{OUTPUT_FIELDS}}**:
  - Primary: Recommended Shed Size (sq ft)
  - Secondary: Estimated Pole Barn Cost Range
- **{{FORMULA_LOGIC}}**: (Tractor * 300sqft) + (Implement * 150sqft). If Maintenance == true, add 600sqft. Cost = Sqft * $15 to $25.

### Variant 3: Spoilage Risk Assessor
- **{{CALCULATOR_NAME}}**: Spoilage Risk Assessor
- **{{INPUT_FIELDS}}**:
  - Grain Moisture Content (%) [Slider: 10% to 25%, default 15%]
  - Ambient Storage Temp (°F) [Slider: 30°F to 90°F, default 60°F]
- **{{OUTPUT_FIELDS}}**:
  - Primary: Estimated Safe Storage Time (Days)
  - Secondary: Risk Level (Low/Medium/High)
- **{{FORMULA_LOGIC}}**: Provide lookup table matrix for moisture vs temp to days. E.g., 15% moisture at 60F = 200 days.

### Variant 4: Storage Cost Analysis Matrix
- **{{CALCULATOR_NAME}}**: Storage Cost Analysis Matrix
- **{{INPUT_FIELDS}}**:
  - Total Bushels Stored [Number]
  - Commercial Storage Rate ($/bu/month) [Number]
  - Months Stored [Slider 1 to 12]
  - On-Farm Bin Cost ($/bu built) [Number]
- **{{OUTPUT_FIELDS}}**:
  - Primary: Commercial Cost vs On-Farm Amortized Cost
  - Secondary: Break-even Year
- **{{FORMULA_LOGIC}}**: Comm Cost = Bushels * Rate * Months. On-Farm Cost = (Bin Cost * Bushels) / 15 years. Break-even = Total Bin Cost / (Comm Cost per year).

## 12. Consistency checklist
Before merging any new calculator generated by this prompt, verify:
- [ ] Does it use `--kraft`, `--ink`, and `--rust` correctly?
- [ ] Are all calculations purely client-side (no fake `fetch()` calls)?
- [ ] Is the primary output visually distinct and above the fold?
- [ ] Do mobile layouts stack correctly (inputs above outputs)?
- [ ] Are assumptions and disclaimers clearly visible?
- [ ] Did the agent avoid adding random npm packages (like charts or heavy UI kits)?
