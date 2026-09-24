You are working on the GardaAI Academy website.

I have an existing website implementation in this repository.

I have also provided THREE REFERENCE SCREENSHOTS:

REFERENCE 01 = ABOUT PAGE
REFERENCE 02 = LEARN PAGE
REFERENCE 03 = IMPACT PAGE

These screenshots are NOT inspiration.

They are the VISUAL SOURCE OF TRUTH.

Your task is to MODIFY THE EXISTING WEBSITE so that the rendered webpages reproduce these reference designs as accurately as possible.

Do NOT create a new generic design.

Do NOT simplify the design.

Do NOT reinterpret the design.

Do NOT turn it into a modern SaaS website.

The goal is:

EXISTING CODE
        ↓
VISUAL RECONSTRUCTION
        ↓
REFERENCE SCREENSHOT

The final rendered website should look like the reference screenshots were implemented directly as HTML/CSS/React.

============================================================
PHASE 0 — UNDERSTAND THE EXISTING PROJECT
============================================================

Before changing anything:

1. Inspect the complete repository.
2. Identify:
   - framework
   - entry points
   - routing
   - page components
   - CSS architecture
   - existing design tokens
   - image assets
   - fonts
   - icons
   - animation libraries
   - existing paper/torn-paper implementation
3. Run the application locally.
4. Visit:
   - About
   - Learn
   - Impact
5. Take screenshots of the current implementation.

Do NOT immediately rewrite the project.

First understand how it currently works.

Preserve the existing architecture wherever practical.

============================================================
PHASE 1 — REFERENCE ANALYSIS
============================================================

Study all three reference screenshots carefully.

Create a short internal design specification before editing.

For each page determine:

- viewport ratio
- content max-width
- header height
- horizontal margins
- section heights
- typography hierarchy
- font families
- font weights
- line heights
- image dimensions
- image aspect ratios
- section background colors
- paper texture
- torn-edge geometry
- spacing
- alignment
- annotation positions
- CTA dimensions
- footer dimensions

Do not guess randomly.

Use the screenshots to estimate proportions.

The screenshots take priority over the existing implementation.

============================================================
REFERENCE MAPPING
============================================================

REFERENCE 01:
ABOUT PAGE

REFERENCE 02:
LEARN PAGE

REFERENCE 03:
IMPACT PAGE

The three pages belong to the same design system.

Shared:

- header
- navigation
- logo
- CTA
- typography
- paper texture
- handwritten annotation language
- orange marker language
- documentary photography
- footer
- animation language

But each page has its own composition.

============================================================
CORE VISUAL IDENTITY
============================================================

The design is:

DOCUMENTARY
+
EDITORIAL
+
HANDMADE
+
FIELD REPORT
+
INDIAN GRASSROOTS EDUCATION

It should feel like a physical printed magazine / field report transformed into a webpage.

It must NOT feel like:

- SaaS
- startup landing page
- dashboard
- Web3 website
- generic AI website
- glassmorphism
- neumorphism
- generic card UI

============================================================
COLOR SYSTEM
============================================================

Use the reference screenshots to determine exact colors.

Approximate palette:

PAPER:
#F3EEE2

DARK NAVY:
#071C24

TEAL:
#087F8C

ORANGE:
#FF6500

INK:
#101820

Do not introduce unnecessary colors.

Orange is used as a strong editorial accent.

Teal is used for GardaAI identity and selected emphasis.

============================================================
TYPOGRAPHY
============================================================

Typography is critical.

Do not substitute a generic sans-serif for the major headlines.

Use a high-quality editorial serif for large headlines.

Candidates:

- DM Serif Display
- Fraunces
- Playfair Display
- another visually equivalent editorial serif

Use a clean sans-serif for:

- navigation
- body
- metadata
- buttons
- labels

Candidates:

- DM Sans
- Inter
- Manrope

Use a handwritten font for:

- annotations
- arrows
- notes
- marker text

Candidates:

- Caveat
- Kalam
- Patrick Hand

However:

Do NOT blindly choose fonts.

Compare their actual rendered appearance against the reference.

Typography must reproduce:

- large editorial headlines
- tight line height
- strong contrast
- large display scale
- orange emphasis
- handwritten marginalia

============================================================
PAPER SYSTEM
============================================================

This is a PRIMARY feature.

Do not implement paper as:

background: #F3EEE2;

alone.

Create a reusable physical paper system.

Use:

SVG feTurbulence
SVG feDisplacementMap
SVG masks
SVG filters
CSS pseudo-elements

Every major paper section should have:

1. paper base
2. subtle grain
3. fiber texture
4. slight tonal variation
5. torn edge
6. subtle underside/shadow

The paper texture should cover the ENTIRE PAPER SHEET, including empty whitespace.

It should not only exist inside cards.

It should feel like scanned/recycled paper.

Keep the texture subtle but clearly visible.

============================================================
TORN PAPER SYSTEM
============================================================

This is another PRIMARY feature.

Do NOT implement the torn edges with:

- border-radius
- simple wave
- box-shadow
- straight border
- simple CSS clip-path polygon

Use SVG.

Create a reusable:

TornPaperEdge

component.

Create multiple tear profiles.

At least:

tear01
tear02
tear03
tear04
tear05
tear06

Each profile should have:

- irregular peaks
- irregular valleys
- different amplitudes
- occasional deep tears
- non-repeating geometry

The torn edge should be approximately:

desktop:
45–75px

mobile:
25–45px

It must visibly overlap the section boundary.

The effect should look like:

PHYSICAL PAPER

not:

~~~~~~~~~~~~~~~~~~~~

Do not use the same tear profile for every section.

============================================================
PAPER LAYERING
============================================================

Major sections should behave like physical sheets.

Conceptually:

PAPER SHEET
     ↓
TORN EDGE
     ↓
UNDERSIDE
     ↓
NEXT PAPER SHEET

Use z-index correctly.

Important:

Do NOT put overflow:hidden on the outer paper section.

The torn edge must be allowed to extend beyond it.

Use:

outer section:
overflow: visible

inner content wrapper:
overflow: hidden only when necessary.

============================================================
ROUGH.JS
============================================================

Install/use Rough.js if it is not already present.

Use it ONLY for hand-drawn graphic elements:

- orange underlines
- arrows
- circles
- rough boxes
- map arrows
- marker strokes
- annotation lines

Do not use Rough.js as the primary paper texture system.

SVG filters/masks are responsible for paper.

Rough.js is responsible for hand-drawn ink.

============================================================
GSAP
============================================================

Use GSAP only where it improves the editorial experience.

Animations should be subtle.

Use for:

- image reveal
- text entrance
- marker stroke drawing
- handwritten annotation reveal
- statistics count-up
- photo movement
- section entrance

Avoid:

- excessive parallax
- bouncing
- excessive 3D
- flashy transitions

The website should feel like a documentary, not an animation demo.

============================================================
ABOUT PAGE
============================================================

Reconstruct REFERENCE 01.

The first viewport should closely match the screenshot.

HEADER:

Left:
GardaAI Academy logo

Center:
About
Learn
Impact

Right:
Download GardaAI App

Active About state.

------------------------------------------------------------
HERO
------------------------------------------------------------

Left vertical rail:

WHY
WE
EXIST

01
Origin

02
The Barrier

03
The Mission

Main headline:

Problem talent ki nahi thi.
Language ki thi.

"Language ki thi." must be orange.

Supporting text:

Bihar ke ek chhote se gaon se nikli ek simple baat:
AI tabhi sabka hoga, jab sabki language mein aayegi.

Right:

documentary video / video placeholder.

Metadata:

THE GARDAAI STORY • 06:24

Timeline below.

Story link.

Quote.

Handwritten annotations.

Large supporting Bihar photograph.

Do NOT convert these into generic cards.

They should look like pieces of a printed editorial spread.

------------------------------------------------------------
ORIGIN
------------------------------------------------------------

CHAPTER 01 • WHERE IT STARTED

Headline:

Ek problem jo
khud feel hui.

Body:

Hindi-medium background se nikal kar samajh aaya—
problem ability ki nahi, access aur language ki hai.

Large documentary photograph.

Handwritten:

Start where people are.

Same soil.
Bigger dreams.

------------------------------------------------------------
LEARNING METHOD
------------------------------------------------------------

CHAPTER 02 • HOW LEARNING STICKS

Headline:

Samjho. Dekho. Karke dekho.
Apne kaam mein lagao.

Exactly four visual blocks:

01
Simple concept

02
Live demonstration

03
Hands-on practice

04
Real-life application

Add hand-drawn orange arrows.

These are editorial photo blocks.

Not generic cards.

------------------------------------------------------------
PEOPLE + PROOF
------------------------------------------------------------

CHAPTER 03 • PEOPLE + PROOF

Headline:

Small team.
Growing community.

People:

Punit Gupta
Prince Singh
Khushi Gupta
Vivek Kumar
Prabuddha Verma

Documentary collage.

Stats:

5,000+
Learners

100+
Workshops

35+
Partner Schools

------------------------------------------------------------
FINAL CTA
------------------------------------------------------------

Dark navy photographic section.

Headline:

AI seekho.
Apni language mein.

Orange marker underline.

Supporting text.

Start Learning

See GardaAI in Action

Large documentary photograph.

Then footer.

============================================================
LEARN PAGE
============================================================

Reconstruct REFERENCE 02.

Exact visual rhythm:

DARK TEAL HERO
↓
PAPER VIDEO SECTION
↓
DARK TEAL GOAL SECTION
↓
PAPER LEARNING LOOP
↓
DARK TEAL CTA
↓
PAPER FOOTER

------------------------------------------------------------
HERO
------------------------------------------------------------

Dark teal background.

Subtle technical grid.

FREE HINGLISH VIDEOS

Headline:

Dekho kam.
Banao zyada.

"Banao zyada." orange.

Supporting copy.

Feature video.

Right:

Choose your next skill

Start Here
Prompting
AI Tools
Content Creation
Productivity

------------------------------------------------------------
VIDEO GRID
------------------------------------------------------------

Paper.

All Videos — Play Here

YouTube synced.

Search.

Newest.

Six video cards.

Titles:

ChatGPT Se Better Answers
AI Image Kaise Banaye
10 Minute Productivity Setup
Prompting: RCCF Method
AI Se Presentation Banao
Students Ke Liye AI Basics

Use the exact visual card proportions from the reference.

------------------------------------------------------------
CHOOSE BY GOAL
------------------------------------------------------------

Dark teal.

Aaj kya
banana hai?

Four:

Better Prompts
Images & Videos
Study & Research
Work Faster

------------------------------------------------------------
LEARNING LOOP
------------------------------------------------------------

Paper.

Sirf dekho mat.
Karke dekho.

01 Watch
02 Try
03 Build
04 Share

Use icons and hand-drawn arrows.

------------------------------------------------------------
KEEP LEARNING
------------------------------------------------------------

Dark teal.

Agla skill,
ek play button door.

Play Latest Video

Visit YouTube Channel

Phone mockup.

============================================================
IMPACT PAGE
============================================================

Reconstruct REFERENCE 03.

This page should look like a physical Bihar field report.

------------------------------------------------------------
FIELD REPORT HERO
------------------------------------------------------------

ORANGE BACKGROUND.

FIELD REPORT • BIHAR

Headline:

Numbers nahi.
Badlav dekho.

Huge:

5,000+
Learners

Right:

100+
Workshops

35+
Partner Schools

Three documentary image panels:

01 First build
02 Everyday business
03 New confidence

Quote.

Bihar map.

Handwritten annotations.

The entire orange area must feel like one large printed sheet.

------------------------------------------------------------
FIELD NOTES
------------------------------------------------------------

PAPER.

FIELD NOTES • REAL LIFE

Headline:

Badlav chhota dikhta hai.
Asar bada hota hai.

Three before/after stories:

STUDENT

Confused by AI
→
Built a first idea

TEACHER

Hours on planning
→
Faster lesson prep

SHOP OWNER

Generic messages
→
Clear local communication

Use photographic before/after pairs.

------------------------------------------------------------
OUR REACH
------------------------------------------------------------

ORANGE.

OUR REACH • BIHAR

Headline:

Har pin ke peeche
ek story.

Large hand-drawn Bihar map.

Locations:

Patna
Gaya
Muzaffarpur
Purnia
Bhagalpur

Documentary mini stories.

------------------------------------------------------------
REAL PEOPLE
------------------------------------------------------------

DARK NAVY.

REAL PEOPLE • REAL WORDS

Headline:

Unki awaaz mein.

Testimonials.

Large orange quotation marks.

Documentary photography.

------------------------------------------------------------
FINAL CTA
------------------------------------------------------------

PAPER.

Headline:

Agli story aapke school
se ho sakti hai.

Bring GardaAI to Your School

Explore Free Videos

============================================================
IMAGES
============================================================

Use existing project assets wherever possible.

Do NOT replace supplied real assets unnecessarily.

If an exact image is missing:

1. Preserve the exact layout and aspect ratio.
2. Use a clearly marked placeholder during development.
3. If image generation is available, generate documentary-style placeholder imagery.

Image style:

Indian documentary photography
Bihar
classrooms
students
teachers
local businesses
AI workshops
natural light
authentic environments

Avoid generic corporate stock imagery.

============================================================
MAP
============================================================

For the Bihar map:

Prefer a real SVG map asset if available.

Otherwise create a clean SVG silhouette.

Use Rough.js for the hand-drawn annotation layer.

Do not use a generic Google Maps embed.

============================================================
RESPONSIVE DESIGN
============================================================

Do NOT simply scale the desktop screenshot down.

Desktop:
reproduce the editorial composition.

Tablet:
preserve hierarchy while reducing spacing.

Mobile:
recompose intelligently.

Maintain:

- paper texture
- torn edges
- typography hierarchy
- annotations
- documentary photography
- orange/teal rhythm

============================================================
VISUAL VALIDATION
============================================================

THIS IS MANDATORY.

Do not stop after writing code.

Install/use Playwright if necessary.

For each page:

1. Start the application.
2. Open the page.
3. Set a deterministic viewport.
4. Capture full-page screenshot.
5. Compare against the corresponding reference.
6. Identify the largest visual mismatches.
7. Modify the implementation.
8. Capture again.
9. Repeat.

Use Playwright screenshot tooling for this workflow.

If useful, use pixelmatch to generate a diff image.

Do not rely solely on textual reasoning such as:

"this looks close."

Actually inspect screenshots.

============================================================
VISUAL PRIORITY ORDER
============================================================

When comparing the implementation with the reference, fix mismatches in this order:

1. Overall page composition
2. Section heights
3. Header dimensions
4. Major typography scale
5. Major image positions
6. Paper/torn boundaries
7. Background colors
8. Paper texture
9. Image proportions
10. Spacing
11. Handwritten annotations
12. Buttons
13. Small details

Do NOT waste time perfecting icons while the section proportions are wrong.

============================================================
REFERENCE SCREENSHOT DIMENSIONS
============================================================

Use the actual dimensions of the supplied reference screenshots as the baseline whenever possible.

Do not arbitrarily choose a viewport and then claim visual fidelity.

If the reference is a long full-page screenshot:

- match its width
- render the full page
- compare normalized screenshots

============================================================
VISUAL DIFF
============================================================

Create a development utility if necessary:

scripts/visual-diff.*

It should:

- capture About
- capture Learn
- capture Impact
- compare screenshots
- generate diff images

Use Playwright and pixelmatch where appropriate.

The goal is iterative visual convergence.

============================================================
CODE QUALITY
============================================================

Do not produce a giant monolithic component.

Keep reusable components such as:

Header
Footer
PaperSection
TornPaperEdge
PaperTexture
ChapterLabel
EditorialHeadline
PhotoScrap
HandwrittenAnnotation
HandDrawnArrow
StatBlock
VideoCard
Testimonial
BiharMap

Keep page-specific composition inside:

AboutPage
LearnPage
ImpactPage

Use CSS variables/design tokens for:

colors
spacing
type scale
paper colors
tear depth

============================================================
DO NOT BREAK EXISTING FUNCTIONALITY
============================================================

Preserve:

routing
links
buttons
existing functionality
assets
existing dependencies where useful

Do not remove functionality merely to simplify the visual implementation.

============================================================
IMPORTANT DEVELOPMENT RULE
============================================================

Do not make speculative changes across the entire project.

Work incrementally.

After each major change:

- run the app
- inspect the result
- capture screenshot
- compare to reference

If something is already visually correct, leave it alone.

============================================================
FINAL ACCEPTANCE CRITERIA
============================================================

Do not consider the task finished merely because the website builds.

It is finished only when:

ABOUT visually matches REFERENCE 01.

LEARN visually matches REFERENCE 02.

IMPACT visually matches REFERENCE 03.

The pages must share the same visual language.

The website must clearly communicate:

physical paper
documentary photography
handmade annotations
editorial typography
Bihar field-report aesthetic
GardaAI branding

The torn paper must be clearly visible.

The paper texture must be clearly visible.

The major compositions must match the references.

The result must NOT look like a generic AI/SaaS website.

At the end:

1. Run the production build.
2. Run the visual screenshot checks.
3. Fix any build/runtime errors.
4. Report exactly what files were changed.
5. Report any remaining visual mismatches honestly.
6. Do not claim pixel-perfect fidelity unless you actually validated it.