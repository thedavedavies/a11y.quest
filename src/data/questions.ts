export interface DocRef {
  label: string;
  url: string;
}

export interface Question {
  id: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  refs: DocRef[];
}

export const questions: Question[] = [
  {
    id: "name-role-value-001",
    topic: "semantic-html",
    difficulty: "easy",
    question:
      "You need a custom control that toggles a panel open and closed. Which is the most robust way to build it?",
    options: [
      "A native `<button>` with an `aria-expanded` attribute",
      'A `<div>` with a click handler and `role="button"`',
      'An `<a href="#">` styled to look like a button',
      'A `<span>` with `tabindex="0"` and a keydown handler',
    ],
    correctIndex: 0,
    explanation:
      "A native `<button>` is announced as a button, is focusable and keyboard operable for free, fires on both Enter and Space, and pairing it with `aria-expanded` gives a state every screen reader reports consistently. The other three can be forced to work, but each makes you reimplement role, focus, and keyboard handling by hand, which is exactly where bugs creep in. Worth knowing: `<details>`/`<summary>` is a real native disclosure and is well supported in browsers and modern screen readers now, so it is a good choice when the panel can live inside it. You just need to bear in mind that its announced role varies by screen reader and the expand or collapse change is announced unevenly, while a button with `aria-expanded` is uniform everywhere.",
    refs: [
      {
        label: "WCAG 4.1.2 Name, Role, Value",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
      {
        label: "MDN: the button element",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button",
      },
    ],
  },
  {
    id: "non-text-content-001",
    topic: "images",
    difficulty: "easy",
    question:
      "An image is purely decorative and adds no information. What is the correct text alternative?",
    options: [
      'An empty `alt` attribute (`alt=""`)',
      "A short description of what the image shows",
      "No `alt` attribute at all",
      '`alt="decorative image"`',
    ],
    correctIndex: 0,
    explanation:
      "An empty `alt` lets assistive tech skip the image entirely, which is what you want for decoration. Omitting `alt` altogether can make a screen reader announce the file name, and describing it or labelling it as decorative just adds noise.",
    refs: [
      {
        label: "WCAG 1.1.1 Non-text Content",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
      },
    ],
  },
  {
    id: "contrast-minimum-001",
    topic: "contrast",
    difficulty: "medium",
    question:
      "Under WCAG 2.2 AA, what is the minimum contrast ratio for normal-size body text against its background?",
    options: ["4.5:1", "3:1", "7:1", "2:1"],
    correctIndex: 0,
    explanation:
      "AA requires 4.5:1 for normal text. Large text (about 24px, or 18.66px bold) only needs 3:1, and 7:1 is the stricter AAA threshold. 2:1 is not a WCAG level.",
    refs: [
      {
        label: "WCAG 1.4.3 Contrast (Minimum)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html",
      },
    ],
  },
  {
    id: "struct-001",
    topic: "headings",
    difficulty: "medium",
    question:
      "A page uses an `<h1>` for the site title, then an `<h3>` for the first content section because the design wanted that text smaller. No `<h2>` appears, and every heading is correctly marked up as a heading element. Which statement best describes this markup?",
    options: [
      "It fails 1.3.1 Info and Relationships (Level A), because skipping a level removes structure that assistive tech needs to convey relationships.",
      "Skipping the level is discouraged but not in itself a WCAG failure, because the heading structure is still programmatically determinable.",
      "It fails only at Level AAA, because 2.4.10 Section Headings requires every heading level to appear in order with no gaps.",
      "It is fully fine and even recommended, because assistive technology ignores heading levels and reads out only the visible text.",
    ],
    correctIndex: 1,
    explanation:
      'Skipping a heading level is not a WCAG failure: no success criterion requires heading levels to be consecutive. Because each heading is marked up as a real heading element, the structure is exposed to assistive technology and is programmatically determinable, so 1.3.1 Info and Relationships (Level A) is satisfied. Going from `<h1>` straight to `<h3>` is widely discouraged as a usability and best-practice issue, but discouraged is not the same as non-conforming. When the Working Group discussed exactly this case (WCAG issue 655), members treated skipping levels as a best-practice concern, not a WCAG failure, and resolved it only by adding the word "appropriate" to the non-normative technique H42 (its test now asks whether the markup "indicates the appropriate heading level for the content"), without ever declaring skipped levels a violation. This markup would only fail 1.3.1 if the chosen levels actively misrepresented the real relationships between sections, for example marking a genuine top-level section as a deep sub-heading so its true place in the hierarchy is hidden.',
    refs: [
      {
        label: "WCAG 2.2 Technique H42: Using h1-h6 to identify headings",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/html/H42",
      },
      {
        label: "WCAG 2.2 Understanding: 1.3.1 Info and Relationships",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
      },
      {
        label: "W3C WCAG issue 655: H42 missing hierarchical level condition",
        url: "https://github.com/w3c/wcag/issues/655",
      },
    ],
  },
  {
    id: "struct-002",
    topic: "landmarks",
    difficulty: "medium",
    question:
      "A page has two navigation regions: the primary site menu and a secondary 'In this section' menu. Which markup lets assistive technology tell the two navigation landmarks apart?",
    options: [
      '`<div role="navigation">`...`</div>` twice, because `role="navigation"` is required and `<nav>` does not create a landmark.',
      "`<nav>`...`</nav>` and `<nav>`...`</nav>` with no other attributes, since each `<nav>` is automatically numbered for users.",
      '`<nav aria-label="Primary">`...`</nav>` and `<nav aria-label="In this section">`...`</nav>`',
      '`<nav title="Primary">`...`</nav>` and `<nav title="In this section">`...`</nav>`',
    ],
    correctIndex: 2,
    explanation:
      'When the same landmark role appears more than once, each instance needs a unique accessible name so users can distinguish them; `aria-label` provides that name and is the accname-supported method here. The `title` attribute is only an unreliable fallback for the accessible name, and a bare `<nav>` already exposes the navigation role, so `role="navigation"` is not required.',
    refs: [
      {
        label: "ARIA APG: Landmark Regions",
        url: "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/",
      },
      {
        label: "WCAG 2.2 Understanding: 1.3.1 Info and Relationships",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
      },
    ],
  },
  {
    id: "struct-003",
    topic: "bypass-blocks",
    difficulty: "medium",
    question:
      "A template repeats a large header and navigation block at the top of every page. The team wants to satisfy 2.4.1 Bypass Blocks at Level A. Which approach does NOT, on its own, meet that success criterion?",
    options: [
      "Providing a 'Skip to main content' link as the first focusable element that moves focus to the main region.",
      "Marking up the page with banner, navigation, and main landmarks so users can jump between regions.",
      "Using properly nested headings so users can navigate from one section to the next.",
      "Styling the navigation links to look visually distinct from body text so sighted users can scan past them.",
    ],
    correctIndex: 3,
    explanation:
      "2.4.1 Bypass Blocks, Level A, requires a programmatic mechanism (a skip link, landmarks, or a heading structure) to skip repeated blocks; purely visual styling provides no such mechanism for keyboard or screen reader users. The skip link, landmarks, and headings options are each recognised techniques that do satisfy the criterion.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 2.4.1 Bypass Blocks",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html",
      },
    ],
  },
  {
    id: "struct-004",
    topic: "semantic-html",
    difficulty: "hard",
    question:
      "A developer builds a list of related items using a stack of `<div>` elements styled with bullets, instead of a `<ul>` with `<li>` children. Why does this most directly create a WCAG problem?",
    options: [
      "Using `<div>` instead of `<ul>` fails 4.1.1 Parsing, Level A, because the markup is no longer valid.",
      "It fails 2.4.6 Headings and Labels, Level AA, since list items act as labels that must be descriptive.",
      "The grouping and item count conveyed visually as a list are not programmatically determinable, which fails 1.3.1 Info and Relationships, Level A.",
      "Generic `<div>` elements fail 2.4.10 Section Headings, Level AAA, because every group of content must be introduced by a heading.",
    ],
    correctIndex: 2,
    explanation:
      "A real `<ul>`/`<li>` exposes the list role and item count so the relationship perceived visually is programmatically determinable, which is exactly what 1.3.1 Info and Relationships, Level A, requires; styled divs convey it by presentation only. The 4.1.1 Parsing distractor is wrong because that criterion was removed in WCAG 2.2, and 2.4.6 Headings and Labels (Level AA) concerns headings and form labels, not list semantics.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 1.3.1 Info and Relationships",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
      },
      { label: "WAI-ARIA 1.2: list role", url: "https://www.w3.org/TR/wai-aria-1.2/#list" },
    ],
  },
  {
    id: "formlabel-001",
    topic: "forms",
    difficulty: "easy",
    question:
      'A form field uses only a grey placeholder ("Enter your email") and has no visible `<label>`. Why is a placeholder not an acceptable substitute for a label?',
    options: [
      "Screen readers cannot expose placeholder text, so the field has no accessible name and is announced to AT as blank.",
      "The only real problem is the low-contrast grey, which users with colour blindness cannot perceive.",
      "It disappears as soon as the user types, leaving no persistent visible label, which fails 3.3.2 Labels or Instructions.",
      "It works as a label as long as its contrast ratio is at least 4.5:1 and the text describes the field.",
    ],
    correctIndex: 2,
    explanation:
      "A placeholder is a hint, not a label: it is typically rendered low-contrast and disappears the moment the user types, so no label stays visible. That is why a placeholder-only field fails 3.3.2 Labels or Instructions (Level A). The field is not strictly nameless (HTML-AAM uses the placeholder as a low-priority fallback for the accessible name), but a name that vanishes on input is no substitute for a persistent, visible label, and meeting 1.4.3 contrast does not turn a placeholder into a label.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 3.3.2 Labels or Instructions",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html",
      },
      {
        label:
          "HTML-AAM: accessible name computation for text inputs (placeholder is a low-priority fallback)",
        url: "https://www.w3.org/TR/html-aam-1.0/#input-type-text-input-type-password-input-type-number-input-type-search-input-type-tel-input-type-email-input-type-url-and-textarea-elements-accessible-name-computation",
      },
      {
        label: "MDN: placeholder attribute (Accessibility concerns)",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/placeholder",
      },
    ],
  },
  {
    id: "formlabel-002",
    topic: "forms",
    difficulty: "medium",
    question:
      'Which markup correctly creates an explicit, programmatic association between the visible text "Email address" and the input?',
    options: [
      '`<label>Email address</label>` `<input type="email" id="email">`',
      '`<span id="emailLbl">Email address</span>` `<input type="email" aria-label="emailLbl">`',
      '`<label for="email">Email address</label>` `<input type="email" id="email">`',
      '`<input type="email" id="email" title="Email address">` Email address',
    ],
    correctIndex: 2,
    explanation:
      "An explicit label associates a `<label for>` with the input's matching `id`, exposing the visible text as the accessible name (1.3.1 Info and Relationships, Level A). The `<label>` without `for` and without wrapping the input is not associated; `aria-label` takes a literal string (not an `id`, that would be `aria-labelledby`); and `title` is only a fallback name, not an explicit label association.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 1.3.1 Info and Relationships",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
      },
      {
        label: "accname 1.2 (Accessible Name Computation)",
        url: "https://www.w3.org/TR/accname-1.2/",
      },
    ],
  },
  {
    id: "formlabel-003",
    topic: "forms",
    difficulty: "medium",
    question:
      'A checkout form has several radio buttons under the heading "Shipping method" and several more under "Billing address same as shipping?". Each group needs an associated group name announced to screen reader users. What is the correct native technique?',
    options: [
      "Give each radio button an `aria-describedby` pointing to the group heading.",
      'Add `role="group"` with `aria-current` to the container around each set of radio buttons.',
      "Place a visually styled `<h3>` directly before each set; proximity alone conveys the grouping programmatically.",
      "Wrap each set of related controls in a `<fieldset>` and give it a `<legend>` describing the group.",
    ],
    correctIndex: 3,
    explanation:
      "Grouping related form controls with `<fieldset>` and naming the group with `<legend>` programmatically conveys the relationship required by 1.3.1 Info and Relationships (Level A). A nearby heading conveys grouping only visually; `aria-describedby` supplies a description, not a group name; and `aria-current` is a state for indicating the current item in a set, not a grouping mechanism.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 1.3.1 Info and Relationships",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
      },
    ],
  },
  {
    id: "formlabel-004",
    topic: "forms",
    difficulty: "hard",
    question:
      'A button shows the visible text "Search" but is coded as `<button aria-label="Submit query">Search</button>`. A speech-input user says "Click Search" and nothing happens. Which statement best identifies the conformance problem?',
    options: [
      "This fails Name, Role, Value because a button is not allowed to have both visible text and an `aria-label`.",
      'This fails Label in Name because the accessible name ("Submit query") does not contain the visible label text "Search".',
      "This passes Label in Name because the accessible name is more descriptive than the visible text, which is preferred.",
      "This fails Identify Input Purpose because the button lacks an `autocomplete` token matching its function.",
    ],
    correctIndex: 1,
    explanation:
      '2.5.3 Label in Name (Level A) requires that the visible label text be contained within the accessible name; here `aria-label` replaces "Search" entirely, so speech commands matching the visible text fail. It is not a Name, Role, Value problem (a button may have an `aria-label`), and Identify Input Purpose (1.3.5) concerns `autocomplete` on user-data inputs, not button names.',
    refs: [
      {
        label: "WCAG 2.2 Understanding: 2.5.3 Label in Name",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html",
      },
      {
        label: "accname 1.2 (Accessible Name Computation)",
        url: "https://www.w3.org/TR/accname-1.2/",
      },
    ],
  },
  {
    id: "formerr-001",
    topic: "forms",
    difficulty: "medium",
    question:
      "A registration form automatically detects that a user typed an email address without an at-sign and the system can determine a likely correction. Which WCAG 2.2 success criterion, and at what level, requires that the suggested correction be offered to the user when it is known?",
    options: [
      "3.3.1 Error Identification, Level A",
      "3.3.3 Error Suggestion, Level AA",
      "3.3.2 Labels or Instructions, Level A",
      "3.3.6 Error Prevention (All), Level AAA",
    ],
    correctIndex: 1,
    explanation:
      "3.3.3 Error Suggestion, Level AA, requires that when an input error is automatically detected and suggestions for correction are known, those suggestions are provided to the user (unless doing so would jeopardize security or purpose). The tempting distractor 3.3.1 Error Identification (Level A) only requires that the error be identified and described in text; it does not require offering a fix.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 3.3.3 Error Suggestion",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html",
      },
    ],
  },
  {
    id: "formerr-002",
    topic: "aria",
    difficulty: "medium",
    question:
      "A developer wires up an inline validation message so a screen reader announces what is wrong with a text field when it is invalid. Which combination correctly conveys the error programmatically?",
    options: [
      'Set `aria-required="true"` on the input and reference the message with `aria-labelledby`',
      'Set `aria-invalid="true"` on the input and reference the error message text with `aria-describedby`',
      'Set `role="alert"` on the input itself and add `aria-checked="false"`',
      "Set `aria-errormessage` as the only attribute and omit `aria-invalid` entirely",
    ],
    correctIndex: 1,
    explanation:
      "`aria-invalid` is a state (set to true when the field is in error) and `aria-describedby` is a property that points to the element holding the error message, so assistive technology announces the description with the field. Using `aria-labelledby` for the error would replace the field's accessible name instead of supplementing it, and `aria-required` only marks the field as mandatory, not as currently in error.",
    refs: [
      {
        label: "WAI-ARIA 1.2: aria-invalid and aria-describedby",
        url: "https://www.w3.org/TR/wai-aria-1.2/",
      },
      {
        label: "WCAG 2.2 Understanding: 3.3.1 Error Identification",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html",
      },
    ],
  },
  {
    id: "formerr-003",
    topic: "authentication",
    difficulty: "medium",
    question:
      "A login screen requires users to remember and type a password, and it disables paste in the password field. Under WCAG 2.2, which approach best satisfies 3.3.8 Accessible Authentication (Minimum)?",
    options: [
      "Keep the password requirement but raise the minimum password length so it is more secure",
      "Allow password managers to fill the field and permit copy and paste, so users are not forced to recall and transcribe the password",
      "Replace the password with a CAPTCHA that asks the user to retype distorted text",
      "Add a security question that asks the user to recall a previously chosen secret word",
    ],
    correctIndex: 1,
    explanation:
      "3.3.8 Accessible Authentication (Minimum), Level AA, prohibits a cognitive function test (like recalling and transcribing a password) unless a mechanism is available to assist; supporting password managers and copy/paste is exactly such a mechanism. Distorted-text CAPTCHAs and recalled security questions are themselves cognitive function tests, so they do not meet the criterion.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 3.3.8 Accessible Authentication (Minimum)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html",
      },
    ],
  },
  {
    id: "formerr-004",
    topic: "forms",
    difficulty: "hard",
    question:
      "During a multi-step checkout, a user enters a shipping address on step 1. On step 3 the same address is needed again as the billing address. Which statement most accurately reflects what 3.3.7 Redundant Entry requires here?",
    options: [
      "The address must be auto-populated or available for the user to select, because it was already entered in the same process",
      "Redundant Entry is Level AA, so it applies only when the site claims AA conformance",
      "The user must re-enter the address from scratch to confirm accuracy, which is what the criterion mandates",
      "Because checkout is a financial transaction, 3.3.7 does not apply and only 3.3.4 governs the form",
    ],
    correctIndex: 0,
    explanation:
      "3.3.7 Redundant Entry, Level A, requires that information previously entered by the user in the same process be auto-populated or available to select, rather than re-entered (the essential, security, and no-longer-valid exceptions aside). It is Level A, not AA, and it applies alongside (not instead of) 3.3.4, so the claim that financial pages are exempt from 3.3.7 is wrong.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 3.3.7 Redundant Entry",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html",
      },
    ],
  },
  {
    id: "formerr-005",
    topic: "forms",
    difficulty: "hard",
    question:
      "A page lets users delete records from a stored database, a legal contract submission, and a tax filing. To satisfy 3.3.4 Error Prevention (Legal, Financial, Data) at Level AA, which design is sufficient?",
    options: [
      "Mark every required field with an asterisk and provide visible instructions on the format expected",
      "Identify each input error in text and move focus to the first field that failed validation",
      "Detect input errors automatically and provide suggestions for how to correct each one",
      "Provide a review step where the user can confirm and correct all entered information before finalizing the submission",
    ],
    correctIndex: 3,
    explanation:
      "3.3.4 Error Prevention (Legal, Financial, Data), Level AA, is met when at least one of reversible, checked, or confirmed applies; a review-and-confirm step that lets the user verify and correct before finalizing is the confirmed option. Marking required fields, identifying errors, or suggesting corrections address 3.3.2, 3.3.1, and 3.3.3 respectively but do not satisfy 3.3.4 on consequential submissions.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 3.3.4 Error Prevention (Legal, Financial, Data)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data.html",
      },
    ],
  },
  {
    id: "img-001",
    topic: "images",
    difficulty: "easy",
    question:
      "A page has a magnifying-glass icon that is the only content of a button that submits a search form. The icon is an `<img>` with no visible text label. What is the correct alternative text for this functional image?",
    options: [
      '`alt=""` because the icon is decorative and the button conveys the meaning',
      '`alt="magnifying glass icon"` describing the visual appearance of the graphic',
      '`alt="Search"` describing the action the button performs',
      "No `alt` attribute, relying on the button's `title` attribute to supply the name",
    ],
    correctIndex: 2,
    explanation:
      'Under 1.1.1 Non-text Content (Level A), a functional image\'s text alternative must convey the function it performs, not its visual appearance, so `alt="Search"` is correct. Describing the picture ("magnifying glass icon") fails because it tells the user nothing about what activating the control does, and an empty `alt` would leave the only control in the form with no accessible name.',
    refs: [
      {
        label: "WCAG 2.2 Understanding: 1.1.1 Non-text Content",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
      },
    ],
  },
  {
    id: "img-002",
    topic: "images",
    difficulty: "medium",
    question:
      "An inline SVG conveys meaningful information (a warning triangle next to an error message). Which markup gives it an accessible name and the correct role so assistive technology announces it as an image?",
    options: [
      '`<svg aria-hidden="true"><title>Warning</title> ... </svg>`',
      '`<svg role="img" aria-label="Warning"> ... </svg>`',
      '`<svg role="presentation" aria-label="Warning"> ... </svg>`',
      '`<svg alt="Warning"> ... </svg>`',
    ],
    correctIndex: 1,
    explanation:
      'An informative inline SVG needs `role="img"` so it is exposed as a single graphic, plus an accessible name via `aria-label` (or `aria-labelledby` pointing at a `<title>`), satisfying 1.1.1 Non-text Content (Level A) and 4.1.2 Name, Role, Value (Level A). `aria-hidden="true"` would remove the meaningful graphic from the accessibility tree, `role="presentation"` strips its semantics (and is contradicted by the name), and SVG does not support the HTML `alt` attribute.',
    refs: [
      {
        label: "WCAG 2.2 Understanding: 1.1.1 Non-text Content",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
      },
      { label: "ARIA 1.2: img role", url: "https://www.w3.org/TR/wai-aria-1.2/#img" },
    ],
  },
  {
    id: "img-003",
    topic: "contrast",
    difficulty: "medium",
    question:
      "A line chart distinguishes three data series only by line colour, and the lines sit on a white plot area. Which success criterion governs the contrast of those lines against the background, and what minimum ratio applies?",
    options: [
      "1.4.3 Contrast (Minimum), Level AA, requiring 4.5:1 because the lines carry information",
      "1.4.1 Use of Color, Level A, which sets a 3:1 minimum contrast for graphical objects",
      "1.4.6 Contrast (Enhanced), Level AAA, requiring 7:1 for any data visualisation",
      "1.4.11 Non-text Contrast, Level AA, requiring 3:1 for the parts of the graphic needed to understand the content",
    ],
    correctIndex: 3,
    explanation:
      "Lines in a chart are graphical objects required to understand the content, so they fall under 1.4.11 Non-text Contrast (Level AA), which requires at least 3:1 against adjacent colours. 1.4.3 Contrast (Minimum) and its 4.5:1 ratio apply to text, not to graphical objects, and 1.4.1 Use of Color (Level A) addresses not relying on colour alone but specifies no contrast ratio.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 1.4.11 Non-text Contrast",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html",
      },
    ],
  },
  {
    id: "img-004",
    topic: "images",
    difficulty: "hard",
    question:
      "A marketing team wants to render a promotional tagline as a JPEG so it matches a specific brand font. They argue this is permitted under the 1.4.5 Images of Text (Level AA) essential exception. Which statement is correct?",
    options: [
      "It is permitted, because using a specific brand font means the particular presentation of the text is essential",
      "It is not permitted under the essential exception; wanting a particular font for visual styling is not an essential presentation, so real text styled with CSS should be used",
      "It is permitted, because images of text are exempt from 1.4.5 as long as accurate alt text is provided",
      "It is not permitted because 1.4.5 Images of Text is a Level A criterion that prohibits all images of text",
    ],
    correctIndex: 1,
    explanation:
      "Under 1.4.5 Images of Text (Level AA), the essential exception covers cases where a particular presentation is essential to the information (for example a logotype or a font sample), not a mere preference for brand styling, so the tagline should be real text styled with web fonts and CSS. Providing alt text does not satisfy 1.4.5 (that addresses 1.1.1, a different criterion), and 1.4.5 is Level AA, not Level A, and does not ban all images of text.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 1.4.5 Images of Text",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/images-of-text.html",
      },
    ],
  },
  {
    id: "media-001",
    topic: "captions",
    difficulty: "easy",
    question:
      "A prerecorded video has spoken dialogue and important sound effects. To meet WCAG 2.2 at the minimum conformance level for this content, what must be provided, and at what level is it required?",
    options: [
      "Captions, required at Level A under 1.2.2 Captions (Prerecorded)",
      "An audio description, required at Level A under 1.2.5 Audio Description (Prerecorded)",
      "A text transcript only, required at Level A under 1.2.1 Audio-only and Video-only (Prerecorded)",
      "Captions, required at Level AA under 1.2.4 Captions (Live)",
    ],
    correctIndex: 0,
    explanation:
      "Synchronized captions for prerecorded video with audio are required by 1.2.2 Captions (Prerecorded), Level A, and must include speech plus important non-speech sounds like sound effects. The tempting distractor citing 1.2.4 is wrong because that criterion is Level AA and applies only to live synchronized media, not prerecorded.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 1.2.2 Captions (Prerecorded)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html",
      },
    ],
  },
  {
    id: "media-002",
    topic: "media-alternatives",
    difficulty: "medium",
    question:
      "A team argues that adding accurate captions to a prerecorded talking-head video that also shows on-screen charts is enough for full WCAG 2.2 AA conformance on time-based media. Why is that reasoning incomplete?",
    options: [
      "Captions cover the spoken audio, but visual information shown only on screen (such as the charts) still needs audio description or a media alternative to satisfy 1.2.3 (A) and 1.2.5 (AA)",
      "Captions are sufficient because 1.2.2 Captions (Prerecorded) is the only time-based media criterion that applies at AA",
      "Captions must be replaced by a full transcript, since 1.2.1 requires a transcript for all prerecorded video",
      "Nothing more is needed, because captions and audio description are interchangeable ways to meet the same success criterion",
    ],
    correctIndex: 0,
    explanation:
      "Captions convey the audio track but not visual-only information; meaningful visuals like on-screen charts require audio description (1.2.5 Audio Description (Prerecorded), Level AA, with 1.2.3 covering it or a media alternative at Level A). The interchangeable claim is wrong because captions and audio description address different sensory channels and satisfy different criteria.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 1.2.5 Audio Description (Prerecorded)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/audio-description-prerecorded.html",
      },
      {
        label: "WCAG 2.2 Understanding: 1.2.3 Audio Description or Media Alternative (Prerecorded)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/audio-description-or-media-alternative-prerecorded.html",
      },
    ],
  },
  {
    id: "media-003",
    topic: "audio-control",
    difficulty: "medium",
    question:
      "A homepage automatically plays a background audio clip that lasts about 12 seconds when the page loads. There is no visible control to stop it. Which WCAG 2.2 criterion does this most directly violate?",
    options: [
      "1.4.2 Audio Control (Level A), because audio that plays automatically for more than 3 seconds must offer a mechanism to pause, stop, or control volume independently of the system volume",
      "2.2.2 Pause, Stop, Hide (Level A), because all auto-starting content must be pausable",
      "1.2.1 Audio-only and Video-only (Prerecorded) (Level A), because the audio lacks a transcript",
      "1.4.2 Audio Control (Level AA), because autoplay audio is only a concern at the AA conformance level",
    ],
    correctIndex: 0,
    explanation:
      "1.4.2 Audio Control, Level A, applies when audio plays automatically for more than 3 seconds and requires a way to pause or stop it, or to control its volume separately from the system. The distractor labeling 1.4.2 as AA is wrong (it is Level A), and 2.2.2 targets moving, blinking, scrolling, or auto-updating visual content rather than autoplaying audio.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 1.4.2 Audio Control",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html",
      },
    ],
  },
  {
    id: "media-004",
    topic: "captions",
    difficulty: "hard",
    question:
      "A university streams a live keynote with a human stenographer producing real-time captions, and afterwards publishes a plain text transcript of everything that was said. A reviewer claims this satisfies WCAG 2.2 AA for live captioning because the transcript was provided. Which statement is correct?",
    options: [
      "The transcript does not satisfy live captioning; 1.2.4 Captions (Live), Level AA, requires synchronized captions during the live broadcast, and a separate after-the-fact transcript is not a substitute",
      "The transcript satisfies 1.2.4 Captions (Live) because a complete transcript is always an acceptable alternative to live captions",
      "Live captions are not required at all, because 1.2.4 Captions (Live) is a Level AAA criterion outside AA scope",
      "Providing the real-time captions alone fails AA, because 1.2.4 also mandates a sign language interpreter for live media",
    ],
    correctIndex: 0,
    explanation:
      "1.2.4 Captions (Live), Level AA, requires synchronized captions for live synchronized media; a transcript published afterward is not a substitute because it does not give real-time access during the broadcast. The sign language claim is wrong: sign language interpretation is 1.2.6, a separate Level AAA criterion, not part of 1.2.4.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 1.2.4 Captions (Live)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/captions-live.html",
      },
    ],
  },
  {
    id: "kbd-001",
    topic: "focus-visible",
    difficulty: "easy",
    question:
      "A design system removes the default browser focus outline on buttons and replaces it with nothing visible when the button receives keyboard focus. Which success criterion does this fail, and at what conformance level?",
    options: [
      "2.4.7 Focus Visible, Level AA",
      "2.4.7 Focus Visible, Level A",
      "2.4.3 Focus Order, Level A",
      "2.4.13 Focus Appearance, Level AA",
    ],
    correctIndex: 0,
    explanation:
      "2.4.7 Focus Visible is Level AA and requires a visible indication of the keyboard focus location, so removing the outline with no replacement fails it. Pegging Focus Visible at Level A is a common misclassification, and 2.4.13 Focus Appearance (which sets minimum size and contrast for the indicator) is Level AAA, not AA.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 2.4.7 Focus Visible",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html",
      },
    ],
  },
  {
    id: "kbd-003",
    topic: "keyboard",
    difficulty: "medium",
    question:
      "A modal dialog opens and moves focus inside it. A keyboard-only user tabs through the dialog controls but cannot move focus back out to the page or close the dialog with the keyboard, leaving them stuck. Which success criterion is most directly violated?",
    options: [
      "2.1.1 Keyboard, Level A",
      "2.1.2 No Keyboard Trap, Level A",
      "2.4.3 Focus Order, Level A",
      "2.4.11 Focus Not Obscured (Minimum), Level AA",
    ],
    correctIndex: 1,
    explanation:
      "2.1.2 No Keyboard Trap (Level A) requires that if focus can move to a component by keyboard, it can also move away by keyboard, so being unable to leave the dialog is the defining failure. 2.1.1 Keyboard is about whether functionality is operable by keyboard at all, not about being able to escape a component once focus is trapped there.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 2.1.2 No Keyboard Trap",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html",
      },
    ],
  },
  {
    id: "kbd-005",
    topic: "focus-visible",
    difficulty: "hard",
    question:
      "A page has a sticky footer cookie banner that stays fixed at the bottom of the viewport. When a keyboard user tabs to a link near the bottom of the content, the focused link is about half covered by the sticky banner, but part of it (including its visible focus ring) is still showing. A reviewer flags this as a failure of 2.4.11 Focus Not Obscured (Minimum). Which statement is correct?",
    options: [
      "It fails 2.4.11, because at Level AA the focused component must not be obscured by author-created content at all, not even partially.",
      "It fails 2.4.11, because any sticky or fixed-position element that overlaps focusable content is prohibited at Level AA.",
      "It fails 2.4.7 Focus Visible instead, because a partially covered focus indicator is never considered visible.",
      "It does not fail 2.4.11, because that criterion is only violated when the focused component is entirely hidden by author-created content, and partial obscuring is allowed at Level AA.",
    ],
    correctIndex: 3,
    explanation:
      "2.4.11 Focus Not Obscured (Minimum), Level AA, is satisfied as long as the focused component is not entirely hidden by author-created content, so a link that is half covered but still partly visible passes. The option claiming no obscuring is allowed at all actually describes the stricter 2.4.12 Focus Not Obscured (Enhanced), which is Level AAA, not the AA minimum.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 2.4.11 Focus Not Obscured (Minimum)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html",
      },
      {
        label: "WCAG 2.2 Understanding: 2.4.12 Focus Not Obscured (Enhanced)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-enhanced.html",
      },
    ],
  },
  {
    id: "kbd-006",
    topic: "keyboard",
    difficulty: "medium",
    question:
      "A developer is building a custom tabs widget. The active tab needs to be reachable with the Tab key, the inactive tabs should be removed from the Tab sequence but still focusable programmatically with JavaScript (roving `tabindex`), and the developer wants to avoid disrupting the document's natural focus order. Which use of the `tabindex` attribute meets these needs?",
    options: [
      'Give the active tab `tabindex="-1"` and the inactive tabs `tabindex="0"`, since -1 marks the currently selected item.',
      'Give the active tab `tabindex="1"` and the inactive tabs `tabindex="2"`, numbering them in the order they should receive focus.',
      'Give the active tab `tabindex="0"` and the inactive tabs `tabindex="-1"`, then move focus to a tab with JavaScript when the user presses an arrow key.',
      'Give every tab `tabindex="0"` so they are all in the Tab sequence, and rely on arrow keys for the rest.',
    ],
    correctIndex: 2,
    explanation:
      '`tabindex="0"` puts an element in the natural Tab order at its DOM position, while `tabindex="-1"` removes it from the Tab sequence but keeps it focusable via `element.focus()`, which is exactly the roving `tabindex` pattern the APG specifies for tabs. Positive `tabindex` values (such as 1 or 2) are discouraged because they override the natural focus order and create maintenance and 2.4.3 Focus Order (Level A) problems, and the option using -1 on the active tab inverts the roles, leaving no tab reachable by Tab.',
    refs: [
      { label: "ARIA APG: Tabs Pattern", url: "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/" },
      {
        label: "WCAG 2.2 Understanding: 2.4.3 Focus Order",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html",
      },
    ],
  },
  {
    id: "focus-001",
    topic: "focus",
    difficulty: "medium",
    question:
      "A modal dialog is opened by a 'Filter results' button. The developer correctly moves focus into the dialog on open. When the user closes the dialog with the Escape key, where should keyboard focus be sent to give a predictable, accessible experience?",
    options: [
      "To the document body, so the next Tab starts from the top of the page",
      'To the page\'s `<h1>`, after adding `tabindex="-1"` to it',
      "To the 'Filter results' button that opened the dialog",
      "To the first focusable element in the page's main landmark",
    ],
    correctIndex: 2,
    explanation:
      "Following the ARIA APG Dialog (Modal) pattern, focus must return to the element that invoked the dialog (the triggering button) so keyboard users are not dropped at an arbitrary location, supporting predictable focus order under 2.4.3 Focus Order (Level A). Sending focus to the body or top of the page loses the user's place and breaks the expected flow even though it is not technically a keyboard trap.",
    refs: [
      {
        label: "ARIA APG: Dialog (Modal) Pattern",
        url: "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/",
      },
      {
        label: "WCAG 2.2 Understanding: 2.4.3 Focus Order",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html",
      },
    ],
  },
  {
    id: "focus-002",
    topic: "focus",
    difficulty: "medium",
    question:
      "In a single-page application, activating a navigation link swaps the main content via client-side routing without a full page load. Screen reader users report they are not told the view changed and remain at the old scroll/focus position. Which approach best addresses this on route change?",
    options: [
      'Set `aria-current="page"` on the activated link, which causes assistive tech to read out the new content',
      'Add `aria-live="assertive"` to every link so each click is announced before navigation',
      'Move focus to a logical target in the new view, such as the new view\'s heading made focusable with `tabindex="-1"`',
      "Rely on the browser's built-in behaviour, since changing the URL with the History API announces the new page automatically",
    ],
    correctIndex: 2,
    explanation:
      'Because no full page load occurs, the developer must programmatically move focus to a sensible target in the inserted content (commonly the new view\'s heading with `tabindex="-1"`), which both announces the change and keeps focus order logical per 2.4.3 Focus Order (Level A). Setting `aria-current="page"` only marks the active link as the current item; it does not move focus or announce the new view, and History API URL changes alone do not notify assistive technology.',
    refs: [
      {
        label: "WCAG 2.2 Understanding: 2.4.3 Focus Order",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html",
      },
      {
        label: "WAI-ARIA 1.2: aria-current",
        url: "https://www.w3.org/TR/wai-aria-1.2/#aria-current",
      },
    ],
  },
  {
    id: "focus-003",
    topic: "focus",
    difficulty: "hard",
    question:
      "A developer is implementing keyboard navigation inside a custom listbox where arrow keys move between options. They are deciding between the roving `tabindex` technique and `aria-activedescendant`. Which statement accurately describes how these two techniques differ?",
    options: [
      "With `aria-activedescendant`, real DOM focus moves to each option in turn, while roving `tabindex` only updates an ARIA reference and never changes the `tabindex` values",
      'Both techniques require every option to have `tabindex="0"` simultaneously so they all remain in the tab sequence',
      'With roving `tabindex`, only the active option has `tabindex="0"` (others get `tabindex="-1"`) and real DOM focus moves to it, whereas `aria-activedescendant` keeps DOM focus on the container and points to the active option',
      "`aria-activedescendant` is a state that toggles true or false as each option becomes active, so it must be removed from inactive options",
    ],
    correctIndex: 2,
    explanation:
      'Per the ARIA APG guidance on managing focus, roving `tabindex` gives the single active child `tabindex="0"` (the rest `tabindex="-1"`) and moves real DOM focus to it, while `aria-activedescendant` keeps DOM focus on the container and uses the property to reference the active option. `aria-activedescendant` is an ARIA property that holds an element ID reference, not a true/false state, so describing it as a toggled state is incorrect.',
    refs: [
      {
        label: "ARIA APG: Developing a Keyboard Interface",
        url: "https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/",
      },
      { label: "ARIA 1.2 spec", url: "https://www.w3.org/TR/wai-aria-1.2/" },
    ],
  },
  {
    id: "focus-004",
    topic: "focus",
    difficulty: "medium",
    question:
      "On a checkout form, tabbing into the country `<select>` immediately submits the form and loads a new page as soon as the control receives focus. Which success criterion does this behaviour most directly violate, and at what level?",
    options: [
      "3.2.2 On Input, Level A",
      "2.4.3 Focus Order, Level A",
      "3.2.5 Change on Request, Level AAA",
      "3.2.1 On Focus, Level A",
    ],
    correctIndex: 3,
    explanation:
      "3.2.1 On Focus (Level A) requires that a component receiving focus must not initiate a change of context, and automatically submitting the form and loading a new page on focus is exactly such a prohibited change. 3.2.2 On Input is the tempting distractor, but it applies when the user changes a setting/value (such as selecting an option), not merely when the control receives focus.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 3.2.1 On Focus",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/on-focus.html",
      },
      {
        label: "WCAG 2.2 Understanding: 3.2.2 On Input",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/on-input.html",
      },
    ],
  },
  {
    id: "ariaw-001",
    topic: "aria",
    difficulty: "medium",
    question:
      'A team builds a tab interface following the ARIA Authoring Practices Tabs pattern. The container has `role="tablist"`, and each tab has `role="tab"`. Which attribute is used to mark which tab is currently active in the tablist?',
    options: [
      '`aria-pressed="true"` on the active tab',
      '`aria-expanded="true"` on the active tab',
      '`aria-selected="true"` on the active tab',
      '`aria-current="true"` on the active tab',
    ],
    correctIndex: 2,
    explanation:
      'In the APG Tabs pattern, the active tab carries `aria-selected="true"` (and inactive tabs `aria-selected="false"`), exposing the selected state required by 4.1.2 Name, Role, Value (Level A). `aria-current` marks the current item among a set of links/steps (for example the current page in navigation), not the selected tab in a tablist, so it is the tempting wrong answer here.',
    refs: [
      { label: "ARIA APG: Tabs Pattern", url: "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/" },
      {
        label: "WCAG 2.2 Understanding: 4.1.2 Name, Role, Value",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
    ],
  },
  {
    id: "ariaw-002",
    topic: "aria",
    difficulty: "medium",
    question:
      "A developer implements a Disclosure (show/hide) widget using a native `<button>` that toggles a region of content. A screen reader announces the button but never indicates whether the content is currently shown or hidden. Which fix correctly conveys the state?",
    options: [
      'Add `role="button"` to the button so its state is exposed',
      'Add `aria-haspopup="true"` to the button to indicate it controls content',
      'Toggle `aria-expanded` between `"true"` and `"false"` on the button as the region opens and closes',
      'Add `aria-selected="true"` to the button when the region is open',
    ],
    correctIndex: 2,
    explanation:
      "The APG Disclosure pattern requires the trigger button to carry `aria-expanded`, toggled between true and false, so the show/hide state is programmatically determinable per 4.1.2 Name, Role, Value (Level A). `aria-haspopup` is a property indicating a popup type (menu, dialog, listbox, etc.), not the expanded/collapsed state of a disclosure, so it is the most tempting but incorrect choice.",
    refs: [
      {
        label: "ARIA APG: Disclosure Pattern",
        url: "https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/",
      },
      {
        label: "WCAG 2.2 Understanding: 4.1.2 Name, Role, Value",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
    ],
  },
  {
    id: "ariaw-003",
    topic: "aria",
    difficulty: "hard",
    question:
      "A custom Tabs widget is keyboard-tested. Pressing Tab moves focus into the tablist and lands on the first tab, but pressing Tab again moves focus straight to the active tabpanel rather than to the next tab; the developer instead expected Tab to cycle through every tab. According to the APG Tabs pattern, what is the correct keyboard model for moving between tabs, and how is it implemented?",
    options: [
      "`aria-activedescendant` on the tablist should point at every tab in turn as the user presses Tab",
      'The Tab key should move between tabs, and the tabpanel should be removed from the tab order with `aria-hidden="true"`',
      'Each tab should have `tabindex="0"` so the Tab key visits every tab in sequence before reaching the panel',
      'Arrow keys move focus between tabs using a roving `tabindex` (only the active tab has `tabindex="0"`, the rest have `tabindex="-1"`)',
    ],
    correctIndex: 3,
    explanation:
      'The APG Tabs pattern uses a single tab stop for the tablist: arrow keys move focus among tabs via a roving `tabindex` (the active tab has `tabindex="0"`, the others `tabindex="-1"`), and Tab then moves to the tabpanel, supporting 2.1.1 Keyboard (Level A) with an efficient model. Giving every tab `tabindex="0"` would force users to Tab through all tabs, which the pattern deliberately avoids; `aria-activedescendant` is the alternative focus model for composites like comboboxes, not the roving-tabindex tabs example.',
    refs: [
      {
        label: "ARIA APG: Tabs Pattern (keyboard interaction)",
        url: "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/",
      },
      {
        label: "WCAG 2.2 Understanding: 2.1.1 Keyboard",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html",
      },
    ],
  },
  {
    id: "ariaw-004",
    topic: "aria",
    difficulty: "hard",
    question:
      "An engineer is building a modal dialog following the APG Dialog (Modal) pattern. Which set of behaviors and attributes is required for the modal to be correct and accessible?",
    options: [
      '`role="dialog"` with `aria-hidden="true"` on the dialog itself so background content is ignored, and rely on the browser to manage focus automatically',
      '`role="alertdialog"` with `aria-expanded="true"`, leave focus on the page so users can still reach background controls, and close only via the visible Close button',
      '`role="dialog"` with `aria-haspopup="dialog"` on the dialog element, no focus management needed because `aria-modal` handles keyboard isolation by itself',
      '`role="dialog"` with `aria-modal="true"`, move focus into the dialog on open, trap focus while open, close on Escape, and return focus to the triggering element on close',
    ],
    correctIndex: 3,
    explanation:
      'The APG Modal Dialog pattern requires `role="dialog"` plus `aria-modal="true"`, moving focus into the dialog on open, trapping focus within it, closing on Escape, and returning focus to the trigger on close; this combination supports 2.1.2 No Keyboard Trap (Level A) and 2.4.3 Focus Order (Level A). Putting `aria-hidden="true"` on the dialog itself would remove the dialog from the accessibility tree (it belongs on background content, if anything), and `aria-modal` alone does not move or trap focus, so that distractor is wrong.',
    refs: [
      {
        label: "ARIA APG: Dialog (Modal) Pattern",
        url: "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/",
      },
      {
        label: "WCAG 2.2 Understanding: 2.4.3 Focus Order",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html",
      },
    ],
  },
  {
    id: "ariax-001",
    topic: "aria",
    difficulty: "medium",
    question:
      "You are building a single-select autocomplete combobox following the ARIA APG Combobox pattern (version 1.2). The text input has the combobox role and controls a popup listbox. Which set of ARIA attributes on the input correctly reflects the open/closed state, links the input to its popup, and tracks which option is virtually focused?",
    options: [
      "`aria-haspopup` set to true, `aria-describedby` referencing the listbox, and `aria-current` naming the focused option",
      "`aria-pressed` toggled true/false, `aria-labelledby` referencing the listbox, and `aria-posinset` naming the focused option",
      "`aria-checked` on the input, `aria-owns` pointing to the listbox, and `aria-selected` naming the focused option",
      "`aria-expanded` toggled true/false, `aria-controls` referencing the listbox id, and `aria-activedescendant` referencing the active option id",
    ],
    correctIndex: 3,
    explanation:
      "The ARIA 1.2 Combobox pattern uses `aria-expanded` (a state) to report whether the popup is shown, `aria-controls` (a property) to associate the combobox with its popup, and `aria-activedescendant` (a property) to point at the visually-focused option while DOM focus stays on the input. `aria-checked`/`aria-pressed` are unrelated states (checkbox/toggle), and `aria-selected` belongs on the listbox options, not on the combobox input.",
    refs: [
      {
        label: "ARIA APG: Combobox Pattern",
        url: "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/",
      },
      { label: "WAI-ARIA 1.2 specification", url: "https://www.w3.org/TR/wai-aria-1.2/" },
    ],
  },
  {
    id: "ariax-002",
    topic: "aria",
    difficulty: "medium",
    question:
      "A settings page has a control that turns Wi-Fi on or off. It has two states only (on or off), takes effect immediately, and is not part of a form that the user submits. A developer is deciding between a switch and a checkbox for the accessible semantics. Which statement best guides the choice and the attribute used to expose the state?",
    options: [
      'Either `role="switch"` or `role="checkbox"` fits a two-state control, and both expose their state with `aria-checked`',
      "A checkbox should be used and its state exposed with `aria-selected`, because switches are not supported by screen readers",
      "A switch should be used and its state exposed with `aria-pressed`, since `aria-checked` applies only to checkboxes",
      "A switch should be used and its state exposed with `aria-expanded`, because the control reveals the Wi-Fi panel",
    ],
    correctIndex: 0,
    explanation:
      "Both the switch and checkbox roles represent a binary control and both use the `aria-checked` state, so either is technically valid (a switch reads as on/off, a checkbox as checked/unchecked). `aria-selected` applies to selectable options like listbox items, `aria-pressed` applies to toggle buttons, and `aria-expanded` reports disclosure state, so none of those is the correct state for this control.",
    refs: [
      {
        label: "ARIA APG: Switch Pattern",
        url: "https://www.w3.org/WAI/ARIA/apg/patterns/switch/",
      },
      { label: "WAI-ARIA 1.2 specification", url: "https://www.w3.org/TR/wai-aria-1.2/" },
    ],
  },
  {
    id: "ariax-003",
    topic: "aria",
    difficulty: "hard",
    question:
      'A volume control is built as a custom slider with `role="slider"`. The thumb is positioned at the 25 percent mark of a range from 0 to 100. The team wants screen readers to announce a human-friendly value such as "Quiet" instead of the raw number. Which markup is correct for the ARIA Slider pattern?',
    options: [
      '`<div role="slider" aria-valuenow="Quiet" aria-valuemin="0" aria-valuemax="100"></div>`',
      '`<div role="slider" aria-valuemin="0" aria-valuemax="100" aria-label="25, Quiet"></div>`',
      '`<div role="slider" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" aria-valuetext="Quiet"></div>`',
      '`<div role="slider" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" aria-roledescription="Quiet"></div>`',
    ],
    correctIndex: 2,
    explanation:
      '`aria-valuenow` must hold the numeric value (25), while `aria-valuetext` supplies the human-readable equivalent ("Quiet") that assistive technology announces in place of the number, per the ARIA 1.2 slider requirements. Putting text in `aria-valuenow` is invalid (it requires a number), and `aria-roledescription` only relabels the role (for example "volume slider"), not the current value.',
    refs: [
      {
        label: "ARIA APG: Slider Pattern",
        url: "https://www.w3.org/WAI/ARIA/apg/patterns/slider/",
      },
      { label: "WAI-ARIA 1.2 specification", url: "https://www.w3.org/TR/wai-aria-1.2/" },
    ],
  },
  {
    id: "ariax-004",
    topic: "aria",
    difficulty: "hard",
    question:
      'A developer hides an icon-only "Close" button visually offscreen but wants it removed for everyone, so they write `<button aria-hidden="true" onclick="closeDialog()"><svg>...</svg></button>`. The button is still in the tab order. What is the core accessibility defect, and what is the relevant rule?',
    options: [
      'It is correct: `aria-hidden="true"` is the standard way to hide a decorative control from assistive technology while keeping it usable',
      'It should use `role="presentation"` instead of `aria-hidden`, because `role="presentation"` both removes the element from the tree and from the tab order',
      '`aria-hidden="true"` removes the button from the accessibility tree but not from the tab order, so a keyboard user can focus a control that has no name or role exposed; `aria-hidden` must not be placed on focusable elements',
      "The button needs `aria-label` as well as `aria-hidden` so the close action still has an accessible name while hidden",
    ],
    correctIndex: 2,
    explanation:
      '`aria-hidden="true"` is a state that removes an element and its descendants from the accessibility tree, but it does not remove the element from the focus order, so a keyboard user can tab to a control that exposes no name, role, or value (a 4.1.2 Name, Role, Value, Level A, failure); the ARIA spec explicitly forbids `aria-hidden` on focusable elements. `role="presentation"` only strips semantics and likewise does not remove focusability, and adding `aria-label` cannot help because `aria-hidden` suppresses any name on that subtree.',
    refs: [
      {
        label: "WAI-ARIA 1.2: aria-hidden state",
        url: "https://www.w3.org/TR/wai-aria-1.2/#aria-hidden",
      },
      {
        label: "WCAG 2.2 Understanding: 4.1.2 Name, Role, Value",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
    ],
  },
  {
    id: "live-001",
    topic: "aria",
    difficulty: "easy",
    question:
      'A non-critical status message ("Draft saved") should be announced by a screen reader after the user finishes their current activity, not interrupt them mid-action. Which container role conveys this politeness, and which role would instead interrupt immediately?',
    options: [
      '`role="log"` announces immediately; `role="status"` waits for a pause.',
      '`role="timer"` announces politely; `role="marquee"` interrupts.',
      '`role="status"` announces politely (implicit `aria-live="polite"`); `role="alert"` interrupts (implicit `aria-live="assertive"`).',
      '`role="status"` and `role="alert"` both interrupt; only an explicit `aria-live="polite"` can wait for a pause.',
    ],
    correctIndex: 2,
    explanation:
      'Under ARIA 1.2, `role="status"` carries an implicit `aria-live="polite"` (announced at the next pause) and `role="alert"` carries an implicit `aria-live="assertive"` (interrupts immediately), which is the distinction 4.1.3 Status Messages, Level AA relies on. The claim that `role="status"` requires an explicit `aria-live="polite"` to be polite is wrong because the polite behaviour is built into the role.',
    refs: [
      {
        label: "WCAG 2.2 Understanding: 4.1.3 Status Messages",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html",
      },
      { label: "WAI-ARIA 1.2 specification", url: "https://www.w3.org/TR/wai-aria-1.2/" },
    ],
  },
  {
    id: "live-002",
    topic: "aria",
    difficulty: "medium",
    question:
      'On a product page, clicking "Add to cart" updates the cart count and shows "Item added, 3 in cart" without navigating or opening a dialog. A screen reader user hears nothing about the change. Which fix best satisfies 4.1.3 Status Messages?',
    options: [
      'Place the confirmation text inside a container with `role="status"` (or `aria-live="polite"`) so it is announced without moving focus.',
      "Call `element.focus()` on the confirmation text so the screen reader reads it when focus lands there.",
      'Add `aria-label="Item added"` to the "Add to cart" button so the new state is exposed on the control.',
      'Wrap the confirmation in `role="alert"` and also move focus to it to guarantee it is heard.',
    ],
    correctIndex: 0,
    explanation:
      '4.1.3 Status Messages, Level AA requires that a status change be programmatically determinable through role or properties so assistive technology can announce it without the message receiving focus; a polite live region (`role="status"` or `aria-live="polite"`) does exactly that. Moving focus to the confirmation is the very thing the criterion is meant to avoid, and `aria-label` on the button does not announce the change at the moment it happens.',
    refs: [
      {
        label: "WCAG 2.2 Understanding: 4.1.3 Status Messages",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html",
      },
    ],
  },
  {
    id: "live-003",
    topic: "aria",
    difficulty: "medium",
    question:
      'A live region shows a results count: `<div role="status">12 results</div>`. When it changes to "8 results", you want the screen reader to announce the entire phrase "8 results" rather than only the changed word. Which attribute, set on the live region, produces this behaviour?',
    options: [
      '`aria-relevant="text"`, because it limits announcements to text-node changes only.',
      '`aria-busy="true"`, because it forces the region to be re-read in full after updates.',
      '`aria-live="assertive"`, because assertive regions always read their entire contents.',
      '`aria-atomic="true"`, because it tells assistive technology to present the whole region as a single unit when any part changes.',
    ],
    correctIndex: 3,
    explanation:
      'Setting `aria-atomic="true"` (it defaults to false) tells assistive technology to present the entire live region as one unit on any change, so the full "8 results" is announced; this property supports clear status messaging under 4.1.3 Status Messages, Level AA. `aria-relevant` filters which mutation types trigger announcements (it does not force whole-region re-reading), and `aria-busy="true"` suppresses announcements until updates are complete rather than re-reading the region.',
    refs: [
      { label: "WAI-ARIA 1.2 specification", url: "https://www.w3.org/TR/wai-aria-1.2/" },
      {
        label: "WCAG 2.2 Understanding: 4.1.3 Status Messages",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html",
      },
    ],
  },
  {
    id: "live-004",
    topic: "aria",
    difficulty: "hard",
    question:
      'A developer expects that removing an item from an `aria-live="polite"` log will be announced, but assistive technology stays silent on removals while announcing additions. Which statement correctly explains the default behaviour under ARIA 1.2?',
    options: [
      '`aria-live="polite"` only ever announces text content and ignores node additions and removals entirely, regardless of `aria-relevant`.',
      'Removals are announced only if `aria-atomic="true"`; `aria-relevant` has no effect on whether removals are spoken.',
      '`aria-relevant` defaults to `"all"`, so every addition, removal, and text change is announced; the silence indicates a screen reader bug rather than a default.',
      '`aria-relevant` defaults to `"additions text"`, so node removals are not announced by default; to announce removals you must set `aria-relevant` to include `"removals"` (for example `"all"`).',
    ],
    correctIndex: 3,
    explanation:
      'Per ARIA 1.2, `aria-relevant` defaults to `"additions text"`, meaning element additions and text changes are announced but node removals are not unless `"removals"` (or `"all"`) is included; this is the property layer that 4.1.3 Status Messages, Level AA relies on for programmatic determinability. The claim that the default is `"all"` is the common misconception that this question targets, and `aria-atomic` controls whether the whole region is re-read, not whether removals are relevant.',
    refs: [
      { label: "WAI-ARIA 1.2 specification", url: "https://www.w3.org/TR/wai-aria-1.2/" },
      {
        label: "WCAG 2.2 Understanding: 4.1.3 Status Messages",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html",
      },
    ],
  },
  {
    id: "color-001",
    topic: "contrast",
    difficulty: "easy",
    question:
      "Under WCAG 2.2, what minimum contrast ratio does 1.4.3 Contrast (Minimum), Level AA, require for large-scale text against its background?",
    options: [
      "7:1",
      "2:1",
      "4.5:1, the same ratio required for all text regardless of size",
      "3:1",
    ],
    correctIndex: 3,
    explanation:
      "1.4.3 Contrast (Minimum), Level AA, sets a relaxed threshold of 3:1 for large-scale text (at least 18pt, or 14pt bold, roughly 24px or 18.66px bold) because larger glyphs remain legible at lower contrast. The tempting 4.5:1 answer is the ratio for normal-size text, not large text, and 7:1 is the stricter AAA enhanced threshold.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 1.4.3 Contrast (Minimum)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html",
      },
    ],
  },
  {
    id: "color-002",
    topic: "contrast",
    difficulty: "medium",
    question:
      "A required form field shows an error by turning its text and border red, with no other change. A colour-blind user cannot tell which field is in error. Which success criterion does this most directly violate, and at what level?",
    options: [
      "1.4.11 Non-text Contrast, Level AA, because the red border does not reach 3:1 contrast",
      "1.4.3 Contrast (Minimum), Level AA, because the red text is below 4.5:1",
      "1.4.1 Use of Color, Level A, because colour is the only visual means used to convey that the field is in error",
      "1.3.3 Sensory Characteristics, Level A, because the instructions rely on the shape of the field",
    ],
    correctIndex: 2,
    explanation:
      "1.4.1 Use of Color, Level A, requires that colour is not the only visual means of conveying information, indicating an action, or distinguishing a visual element; the error state needs an accompanying text message, icon, or other non-colour cue. The 1.4.11 distractor is wrong because the failure here is conveying state by colour alone, not the contrast ratio of the border, and 1.3.3 concerns instructions that rely on sensory characteristics like shape, size, or location, not error indication by colour.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 1.4.1 Use of Color",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html",
      },
    ],
  },
  {
    id: "color-003",
    topic: "contrast",
    difficulty: "medium",
    question:
      "A text input has a thin grey border that is its only visual boundary against the white page, and the border measures about 1.8:1 against the page. Which success criterion applies to the contrast of that border, and what is the minimum ratio?",
    options: [
      "1.4.6 Contrast (Enhanced), Level AAA, requiring 7:1 for all interactive components",
      "1.4.1 Use of Color, Level A, which mandates a 3:1 ratio for component borders",
      "1.4.3 Contrast (Minimum), Level AA, requiring 4.5:1 because the border is part of a text field",
      "1.4.11 Non-text Contrast, Level AA, requiring 3:1 for the visual boundary that identifies the control",
    ],
    correctIndex: 3,
    explanation:
      "1.4.11 Non-text Contrast, Level AA, requires at least 3:1 for the visual information needed to identify user interface components and their states, which includes the boundary that distinguishes a text field from its surroundings. 1.4.3 Contrast (Minimum) and its 4.5:1 figure apply to text, not to a control's boundary, and 1.4.1 Use of Color sets no contrast ratio at all.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 1.4.11 Non-text Contrast",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html",
      },
    ],
  },
  {
    id: "color-004",
    topic: "contrast",
    difficulty: "hard",
    question:
      "A government site must conform to WCAG 2.2 Level AAA. Normal-size body text on a coloured panel measures 5.2:1, and a heading rendered at 30px bold (large-scale text) measures 5.0:1 against its background. Evaluated against the applicable enhanced-contrast criterion, what is the outcome?",
    options: [
      "Both pass, because at AAA every piece of text only needs to reach 4.5:1",
      "Both pass, because 1.4.6 Contrast (Enhanced) requires 4.5:1 for normal text and 3:1 for large text",
      "The heading fails and the body text passes under 1.4.6 Contrast (Enhanced), Level AAA, which needs 4.5:1 for normal text and 7:1 for large text",
      "The body text fails and the heading passes under 1.4.6 Contrast (Enhanced), Level AAA, which needs 7:1 for normal text and 4.5:1 for large text",
    ],
    correctIndex: 3,
    explanation:
      "1.4.6 Contrast (Enhanced), Level AAA, requires 7:1 for normal-size text and 4.5:1 for large-scale text, so the 5.2:1 body text fails the 7:1 normal-text requirement while the 5.0:1 large heading clears the 4.5:1 large-text requirement. The distractors either apply the AA values (4.5:1 / 3:1) or swap the normal and large thresholds.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 1.4.6 Contrast (Enhanced)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html",
      },
    ],
  },
  {
    id: "adapt-001",
    topic: "reflow",
    difficulty: "medium",
    question:
      "A web page is tested for WCAG 2.2 Level AA. When its content is presented at a width equivalent to 320 CSS pixels, the main block of body text forces the user to scroll both horizontally and vertically to read each line, even though that text does not require a two-dimensional layout. Which success criterion does this most directly fail?",
    options: [
      "1.3.4 Orientation, because scrolling in two directions breaks the required portrait and landscape support",
      "1.4.12 Text Spacing, because squeezing the text into a narrow column changes its letter and word spacing",
      "1.4.4 Resize Text, because text must stay readable when scaled, which a 320 pixel width prevents",
      "1.4.10 Reflow, because content must reflow to a 320 CSS pixel width without two-dimensional scrolling",
    ],
    correctIndex: 3,
    explanation:
      "1.4.10 Reflow (Level AA) requires content to be presented without loss of information or functionality, and without scrolling in two dimensions, at a width equivalent to 320 CSS pixels. Ordinary text must reflow to fit, so being forced to scroll both ways to read it fails; the one carve-out is content that genuinely needs a two-dimensional layout, such as data tables, maps, or complex diagrams. The 320 CSS pixel width is the normative figure, while the familiar 1280px viewport at 400% zoom comes from a non-normative note and will not always reproduce the same layout. Resize Text (1.4.4) is the tempting wrong answer, but it is about scaling text up to 200%, not reflow.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 1.4.10 Reflow",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/reflow.html",
      },
    ],
  },
  {
    id: "adapt-002",
    topic: "text-spacing",
    difficulty: "medium",
    question:
      "Under 1.4.12 Text Spacing (Level AA), which set of override values must content support with no loss of content or functionality?",
    options: [
      "Line height at least 1.5x font size, paragraph spacing at least 2x font size, letter spacing at least 0.12x font size, word spacing at least 0.16x font size",
      "Line height at least 2x font size, paragraph spacing at least 1.5x font size, letter spacing at least 0.16x font size, word spacing at least 0.12x font size",
      "Line height at least 1.5x font size, paragraph spacing at least 1.5x font size, letter spacing at least 0.35x font size, word spacing at least 0.35x font size",
      "Line height at least 1.2x font size, paragraph spacing at least 2x font size, letter spacing at least 0.12x font size, word spacing at least 0.16x font size",
    ],
    correctIndex: 0,
    explanation:
      "1.4.12 Text Spacing, Level AA, requires no loss of content or functionality when the user sets line height to at least 1.5x the font size, spacing following paragraphs to at least 2x, letter spacing to at least 0.12x, and word spacing to at least 0.16x. The distractors swap or alter these specific multipliers (for example using 1.2x line height or 0.35x letter spacing), which are not the values in the criterion.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 1.4.12 Text Spacing",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html",
      },
    ],
  },
  {
    id: "adapt-003",
    topic: "target-size",
    difficulty: "hard",
    question:
      "A toolbar contains several 20x20 CSS pixel icon buttons placed close together. A reviewer notes they are smaller than 24x24 CSS pixels. Under 2.5.8 Target Size (Minimum), Level AA, which condition would allow these undersized targets to still pass the criterion?",
    options: [
      "Each undersized target has sufficient spacing so that a 24 CSS pixel diameter circle centered on it does not intersect another target or another target's circle",
      "The icons enlarge to 44x44 CSS pixels on hover, satisfying the Target Size requirement at the moment of interaction",
      "The icons are operable by keyboard, which exempts them from any pointer target size requirement",
      "The buttons sit inside a sentence of running text, so the inline exception removes the spacing requirement",
    ],
    correctIndex: 0,
    explanation:
      "2.5.8 Target Size (Minimum), Level AA, lets undersized targets pass via the Spacing exception when an imaginary 24 CSS pixel diameter circle centered on each target does not overlap any other target or its circle. Hover enlargement does not satisfy it because the target must meet the size or spacing condition without requiring a pointer hover state, and the inline exception applies to targets within a sentence or constrained by line-height, not to toolbar icon buttons.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 2.5.8 Target Size (Minimum)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html",
      },
    ],
  },
  {
    id: "adapt-004",
    topic: "content-on-hover",
    difficulty: "hard",
    question:
      "1.4.13 Content on Hover or Focus (Level AA) defines three requirements for additional content that appears on pointer hover or keyboard focus (such as a custom tooltip). Which statement correctly describes one of those three requirements?",
    options: [
      "The additional content must meet a contrast ratio of at least 3:1 against its background",
      "The additional content must remain visible until the user moves the pointer away, even if it would obscure other content",
      "The pointer must be able to move over the additional content without it disappearing (the content is hoverable), unless it is removed for a valid reason",
      "The additional content must be announced by a live region with `aria-live` set to assertive",
    ],
    correctIndex: 2,
    explanation:
      "1.4.13 Content on Hover or Focus, Level AA, has three requirements: Dismissible (can be removed without moving pointer or focus), Hoverable (the pointer can move over the additional content without it vanishing), and Persistent (it stays until the trigger is removed, focus is lost, or it is no longer valid). Requiring 3:1 contrast belongs to 1.4.11 Non-text Contrast, and assertive live-region announcement relates to 4.1.3 Status Messages, so those are out of scope for this criterion.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 1.4.13 Content on Hover or Focus",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html",
      },
    ],
  },
  {
    id: "input-001",
    topic: "pointer-gestures",
    difficulty: "medium",
    question:
      "An image carousel advances only when the user swipes left or right across it with one finger. There is no other way to move between slides. Which success criterion does this most directly fail, and what is the fix?",
    options: [
      "2.5.1 Pointer Gestures (Level A): a path-based gesture must have a single-pointer alternative, so add visible Previous and Next buttons that work with a simple tap or click.",
      "2.5.2 Pointer Cancellation (Level A): swipe activation fires on `touchstart`, so move activation to the up event.",
      "2.5.7 Dragging Movements (Level AA): a swipe is a dragging movement, so the only requirement is a single-pointer alternative that does not depend on dragging.",
      "2.5.4 Motion Actuation (Level A): the swipe is operated through device motion, so provide a settings toggle to disable it.",
    ],
    correctIndex: 0,
    explanation:
      "2.5.1 Pointer Gestures (Level A) requires that any path-based gesture (like a directional swipe) have a single-pointer alternative such as tappable Previous/Next buttons. The dragging-movements answer is wrong because a swipe is path-based rather than a dragging movement (which involves picking something up and releasing it on a target), and 2.5.7 is Level AA, not the most direct failure here.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 2.5.1 Pointer Gestures",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html",
      },
    ],
  },
  {
    id: "input-002",
    topic: "motion-actuation",
    difficulty: "medium",
    question:
      "A mobile web app lets users undo their last action by physically shaking the device. To satisfy 2.5.4 Motion Actuation (Level A), what must the design also provide?",
    options: [
      "A way to perform undo through user-interface components, plus a setting to disable the motion response so accidental shaking does not trigger it.",
      "A confirmation dialog that appears before the undo is committed.",
      "Nothing extra: device-motion controls are exempt from 2.5.4 because they are an essential feature of the device.",
      "A visible on-screen instruction telling users they can shake to undo.",
    ],
    correctIndex: 0,
    explanation:
      "2.5.4 Motion Actuation (Level A) requires that functionality operated by device motion also be operable through conventional UI components AND that responding to the motion can be disabled to prevent accidental actuation. Doing nothing is wrong: motion actuation is only exempt when the motion is essential to the function (for example a pedometer), which undo-by-shake is not.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 2.5.4 Motion Actuation",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/motion-actuation.html",
      },
    ],
  },
  {
    id: "input-003",
    topic: "pause-stop-hide",
    difficulty: "medium",
    question:
      "A homepage shows an auto-scrolling promotional banner that cycles through three slides every four seconds and runs continuously for the life of the page. Which statement correctly applies WCAG to this content?",
    options: [
      "`prefers-reduced-motion` is sufficient on its own to meet 2.2.2 as long as the banner stops for users who set that preference.",
      "Only 2.3.1 Three Flashes or Below Threshold (Level A) applies, since auto-advancing slides are a flashing concern.",
      "It is exempt from 2.2.2 because moving content that loops is treated the same as a real-time event such as a video stream.",
      "Because the motion starts automatically, lasts more than five seconds, and is presented in parallel with other content, 2.2.2 Pause, Stop, Hide (Level A) requires a mechanism to pause, stop, or hide it.",
    ],
    correctIndex: 3,
    explanation:
      "2.2.2 Pause, Stop, Hide (Level A) applies to moving, blinking, or scrolling content that starts automatically, lasts more than five seconds, and is shown alongside other content; it requires a pause, stop, or hide mechanism. Relying on `prefers-reduced-motion` alone is wrong because 2.2.2 demands an in-content control available to all users, not just those who set an OS preference, and 2.3.1 concerns flashing (a seizure risk), not gentle slide transitions.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 2.2.2 Pause, Stop, Hide",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html",
      },
    ],
  },
  {
    id: "input-004",
    topic: "pointer-cancellation",
    difficulty: "hard",
    question:
      'Consider a custom button that runs a destructive delete as soon as the pointer touches it:\n\n`<div role="button" tabindex="0" onpointerdown="deleteItem()">Delete</div>`.\n\nWhich change makes it conform to 2.5.2 Pointer Cancellation (Level A)?',
    options: [
      'Add `aria-pressed="false"` so assistive technology can announce the button state before activation.',
      "Increase the target to at least 44 by 44 CSS pixels so the touch is less likely to be accidental.",
      "Move activation to the up event (for example `pointerup` or `click`) so the user can move the pointer away before releasing to abort the action.",
      "Add a 300 millisecond delay before `deleteItem()` runs so the user has time to lift their finger.",
    ],
    correctIndex: 2,
    explanation:
      "2.5.2 Pointer Cancellation (Level A) requires that for single-pointer activation the down-event must not complete the function: activating on the up event lets a user abort by dragging off the control before release. The target-size and delay answers do not satisfy 2.5.2, which is about which event triggers completion, not size or timing; `aria-pressed` addresses name/role/value, not cancellation.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 2.5.2 Pointer Cancellation",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html",
      },
    ],
  },
  {
    id: "accname-001",
    topic: "aria",
    difficulty: "medium",
    question:
      'A search input is coded as follows:\n\n`<label for="q">Site search</label>`\n`<input id="q" aria-label="Search the docs" placeholder="Type a keyword">`.\n\nWhat accessible name will assistive technology compute for this input?',
    options: ["Search the docs", "Site search", "Type a keyword", "Site search Search the docs"],
    correctIndex: 0,
    explanation:
      "Under accname 1.2 precedence, `aria-label` is consulted before the native label (the `for`/`id` association) and before the placeholder, so it wins: the accessible name is the aria-label value. The visible label loses here, which is exactly why `aria-label` can silently override a visible label, a common pitfall the 'Site search' answer reflects.",
    refs: [
      {
        label: "Accessible Name and Description Computation 1.2",
        url: "https://www.w3.org/TR/accname-1.2/",
      },
      {
        label: "WCAG 2.2 Understanding: 4.1.2 Name, Role, Value",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
    ],
  },
  {
    id: "accname-002",
    topic: "forms",
    difficulty: "medium",
    question:
      'A developer ships a text field that has no `<label>`, no `aria-label`, no `aria-labelledby`, and no `title`, but does have `placeholder="Email address"`. Which statement is correct?',
    options: [
      "The placeholder is visible while the field is empty, but the name computation ignores it, so the field has no accessible name",
      "The field gets an accessible name from the placeholder fallback, but it still fails 3.3.2 Labels or Instructions",
      "The placeholder gives the field a valid accessible name, so it passes both 4.1.2 Name, Role, Value and 3.3.2 Labels or Instructions",
      "Adding a `<label>` later would not change the name, because a `placeholder` outranks a `<label>` in the name computation",
    ],
    correctIndex: 1,
    explanation:
      'HTML-AAM does give this field an accessible name: with no `aria-label`, `aria-labelledby`, `<label>`, or `title`, the computation falls back to the placeholder, so assistive tech announces "Email address" and 4.1.2 Name, Role, Value (Level A) is met. What fails is 3.3.2 Labels or Instructions (Level A): the placeholder vanishes from view as soon as the user types, so no visible label persists. The precedence claim is backwards too: a real `<label>` outranks the placeholder in the computation, so adding one takes over the name and, staying visible, fixes the 3.3.2 problem.',
    refs: [
      {
        label: "HTML-AAM: accessible name computation for text inputs",
        url: "https://www.w3.org/TR/html-aam-1.0/#input-type-text-input-type-password-input-type-number-input-type-search-input-type-tel-input-type-email-input-type-url-and-textarea-elements-accessible-name-computation",
      },
      {
        label: "WCAG 2.2 Understanding: 3.3.2 Labels or Instructions",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html",
      },
      {
        label: "WCAG 2.2 Understanding: 4.1.2 Name, Role, Value",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
    ],
  },
  {
    id: "accname-003",
    topic: "aria",
    difficulty: "medium",
    question:
      "What is the correct way to associate supplementary help text (for example, a password format hint) with an input so that screen readers announce it as a description rather than as the field's name?",
    options: [
      "Reference the help text from the input with `aria-describedby`",
      "Reference the help text from the input with `aria-labelledby`",
      "Place the help text in the input's `placeholder` attribute",
      "Put the help text in a `title` attribute, since `title` is the standard mechanism for descriptions",
    ],
    correctIndex: 0,
    explanation:
      "`aria-describedby` points to element IDs whose text becomes the accessible description, which assistive tech announces in addition to (not instead of) the name. Using `aria-labelledby` instead would fold the hint into the accessible name, and a placeholder is not a dependable mechanism for either name or description.",
    refs: [
      {
        label: "Accessible Name and Description Computation 1.2",
        url: "https://www.w3.org/TR/accname-1.2/",
      },
      { label: "WAI-ARIA 1.2", url: "https://www.w3.org/TR/wai-aria-1.2/" },
    ],
  },
  {
    id: "accname-004",
    topic: "aria",
    difficulty: "hard",
    question:
      'A button shows the visible text "Play" but is coded as `<button aria-label="Start playback now">Play</button>`. Which evaluation conclusion is correct?',
    options: [
      'It fails 2.5.3 Label in Name because the accessible name "Start playback now" does not include the visible label "Play"',
      'It passes 2.5.3 Label in Name because the visible label "Play" is contained within the accessible name (it appears inside "playback")',
      "It fails 4.1.2 Name, Role, Value (Level A) because a button must not have both visible content and an `aria-label`",
      "It passes because `aria-label` always overrides the visible text, so Label in Name does not apply to this button",
    ],
    correctIndex: 0,
    explanation:
      'This fails 2.5.3 Label in Name (Level A). The criterion is about words: the text a person sees as the label has to appear in the accessible name as that word. The visible label here is "Play", but "Start playback now" only holds those letters buried inside "playback", never as the word "Play". So a speech-input user who says "click Play" gets nothing, because Voice Control listens for the accessible name and no "Play" word is in it. Beware the substring trap in the other answer: a plain character match (and some automated tools) will report a pass, but that is a false positive, because passing an automated rule never proves conformance, only a clear failure is decisive. It is not a 4.1.2 Name, Role, Value issue (a button may carry an `aria-label`), and `aria-label` does not exempt a control from Label in Name. The fix is to include the visible word as a real word in the name, ideally at the start, for example `aria-label="Play, start playback now"`.',
    refs: [
      {
        label: "WCAG 2.2 Understanding: 2.5.3 Label in Name",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html",
      },
      {
        label: "Accessible Name and Description Computation 1.2",
        url: "https://www.w3.org/TR/accname-1.2/",
      },
    ],
  },
  {
    id: "evalm-001",
    topic: "evaluation",
    difficulty: "easy",
    question:
      "What is the correct order of the five steps in the WCAG-EM (Website Accessibility Conformance Evaluation Methodology) process?",
    options: [
      "Select a representative sample, define the evaluation scope, explore the target website, audit the selected sample, report the findings",
      "Define the evaluation scope, select a representative sample, explore the target website, audit the selected sample, report the findings",
      "Explore the target website, define the evaluation scope, audit the selected sample, select a representative sample, report the findings",
      "Define the evaluation scope, explore the target website, select a representative sample, audit the selected sample, report the evaluation findings",
    ],
    correctIndex: 3,
    explanation:
      "WCAG-EM defines five ordered steps: (1) Define the Evaluation Scope, (2) Explore the Target Website, (3) Select a Representative Sample, (4) Audit the Selected Sample, (5) Report the Evaluation Findings. Sampling cannot precede exploration because you must understand the site's structure and functionality before you can choose a representative sample.",
    refs: [
      {
        label: "WCAG-EM: Website Accessibility Conformance Evaluation Methodology",
        url: "https://www.w3.org/TR/WCAG-EM/",
      },
    ],
  },
  {
    id: "evalm-002",
    topic: "evaluation",
    difficulty: "medium",
    question:
      "A colleague claims that an evaluation must follow WCAG-EM exactly in order to make a valid WCAG 2.2 conformance claim. What is the accurate characterization of WCAG-EM's status?",
    options: [
      "WCAG-EM is a normative part of WCAG 2.2 that defines the five conformance requirements",
      "WCAG-EM is an ISO standard that supersedes the WCAG 2.2 conformance section",
      "WCAG-EM is a normative W3C Recommendation, and following it is required for any WCAG 2.2 conformance claim",
      "WCAG-EM is a non-normative W3C Working Group Note that describes an optional methodology; it is not required to make a WCAG conformance claim",
    ],
    correctIndex: 3,
    explanation:
      "WCAG-EM is a non-normative W3C Working Group Note offering an optional, structured methodology for evaluating full websites; it does not change or replace the normative WCAG 2.2 conformance requirements and is not mandatory for a conformance claim. Treating it as a normative Recommendation or as part of WCAG 2.2 itself misstates its status.",
    refs: [
      {
        label: "WCAG-EM: Website Accessibility Conformance Evaluation Methodology",
        url: "https://www.w3.org/TR/WCAG-EM/",
      },
      { label: "WCAG 2.2 Conformance", url: "https://www.w3.org/TR/WCAG22/#conformance" },
    ],
  },
  {
    id: "evalm-003",
    topic: "evaluation",
    difficulty: "medium",
    question:
      "During Step 1 of WCAG-EM for a client's online store, you are settling the conformance target. Which of these belongs to defining the evaluation scope at this step?",
    options: [
      "Running an automated scanner across the whole site to find which pages have the most errors",
      "Documenting each failed success criterion with screenshots and remediation advice",
      "Counting the total number of unique web pages so you can sample exactly 10% of them",
      "Deciding the target conformance level (for example WCAG 2.2 Level AA) and the WCAG version that the evaluation will assess against",
    ],
    correctIndex: 3,
    explanation:
      "Step 1 (Define the Evaluation Scope) is where you set the scope of the website, the WCAG version, and the target conformance level (such as Level AA), plus the baseline of assistive technologies and the goal of the evaluation. Counting pages and exploring with tools happen in Steps 2-3, and documenting failures with remediation advice is part of Step 5 (Report).",
    refs: [
      {
        label: "WCAG-EM Step 1: Define the Evaluation Scope",
        url: "https://www.w3.org/TR/WCAG-EM/",
      },
    ],
  },
  {
    id: "evalm-004",
    topic: "evaluation",
    difficulty: "hard",
    question:
      "Following WCAG-EM Step 3, an evaluator has assembled a structured sample of 30 web pages. To complete the representative sample correctly, what else must be added?",
    options: [
      "A randomly selected sample of pages (about 10% of the structured sample) plus any complete processes included in their entirety",
      "Exactly 30 more pages chosen at random, doubling the structured sample to ensure statistical significance",
      "Only the home page and the contact page, since these are the most visited",
      "Nothing further; a structured sample on its own is the complete representative sample under WCAG-EM",
    ],
    correctIndex: 0,
    explanation:
      "WCAG-EM's representative sample combines a structured sample, a randomly selected sample of roughly 10% of the structured sample, and any complete processes (such as checkout) audited in full. A structured sample alone is incomplete, and the random portion is about 10% of the structured sample, not an arbitrary doubling.",
    refs: [
      {
        label: "WCAG-EM Step 3: Select a Representative Sample",
        url: "https://www.w3.org/TR/WCAG-EM/",
      },
    ],
  },
  {
    id: "evalm-006",
    topic: "evaluation",
    difficulty: "easy",
    question:
      "Which activity is the primary purpose of Step 2 of WCAG-EM, Explore the Target Website?",
    options: [
      "Confirming the legal conformance level the organization is contractually required to meet",
      "Re-testing pages that failed a previous audit to verify that fixes were applied",
      "Writing the final evaluation report with an aggregated score and findings",
      "Identifying the website's common pages, functionality, types of content, and the technologies used to inform later sampling",
    ],
    correctIndex: 3,
    explanation:
      "Step 2 (Explore the Target Website) is about getting to know the site: identifying common pages, key functionality, the variety of page types and content, the web technologies in use, and any essential functionality, which then informs sample selection in Step 3. Writing the report is Step 5, and setting the required conformance level is part of Step 1 (Define the Evaluation Scope).",
    refs: [
      {
        label: "WCAG-EM Step 2: Explore the Target Website",
        url: "https://www.w3.org/TR/WCAG-EM/",
      },
    ],
  },
  {
    id: "conf-001",
    topic: "conformance",
    difficulty: "medium",
    question:
      "WCAG 2.2 defines a fixed set of conformance requirements that all must be satisfied for a page to conform. How many such conformance requirements are there, and which list correctly names them?",
    options: [
      "Four: meeting all Level A and AA success criteria, providing a conformance claim, supporting assistive technology, and using valid HTML.",
      "Five: conformance level, valid markup, a published conformance claim, an accessibility statement, and an automated test report.",
      "Three: conformance level, full pages, and complete processes.",
      "Five: conformance level, full pages, complete processes, only accessibility-supported ways of using technologies, and non-interference.",
    ],
    correctIndex: 3,
    explanation:
      "The WCAG 2.2 Conformance section lists exactly five conformance requirements: conformance level, full pages, complete processes, only accessibility-supported ways of using technologies, and non-interference. The four-item option is wrong because a conformance claim is optional (not required) and 'valid HTML' is not a conformance requirement (4.1.1 Parsing was removed in WCAG 2.2).",
    refs: [
      {
        label: "WCAG 2.2: Conformance Requirements",
        url: "https://www.w3.org/TR/WCAG22/#conformance",
      },
    ],
  },
  {
    id: "conf-002",
    topic: "conformance",
    difficulty: "medium",
    question:
      "A team finishes a single web page that meets every Level A and Level AA success criterion, but the page links to a downloadable PDF that fails several criteria. The page itself includes that PDF as embedded content the user can open inline. Under the 'full pages' conformance requirement, what is the consequence?",
    options: [
      "The page still conforms at AA, because conformance is judged only on the HTML, and linked or embedded documents are evaluated separately.",
      "The page conforms at Level A but drops to non-conforming only at AA, since embedded media is an AA-only concern.",
      "The full page does not conform, because the 'full pages' requirement means conformance is for the entire page including all content, and you cannot exclude part of it.",
      "The page conforms as long as a conformance claim notes the PDF as a known exception.",
    ],
    correctIndex: 2,
    explanation:
      "The 'full pages' conformance requirement states that conformance is for a full web page only and cannot be achieved if part of the page is excluded; all content on the page must conform. Saying the HTML is evaluated separately from embedded content is wrong, and the 'partial conformance' for third-party content provision in WCAG applies to content outside the author's control that is not embedded as part of the page, not to content the author has chosen to include.",
    refs: [
      {
        label: "WCAG 2.2: Conformance Requirement 2 (Full pages)",
        url: "https://www.w3.org/TR/WCAG22/#cc2",
      },
    ],
  },
  {
    id: "conf-003",
    topic: "conformance",
    difficulty: "hard",
    question:
      "A multi-step checkout consists of cart, shipping, payment, and confirmation pages. The cart, shipping, and confirmation pages each conform to Level AA, but the payment page has a keyboard trap that stops users completing the purchase. What does the 'complete processes' conformance requirement say about claiming AA conformance for these pages?",
    options: [
      "The process conforms because a majority (three of four) of the pages meet AA.",
      "The process conforms at Level A, since keyboard traps only affect the AA criteria for that single page.",
      "Each conforming page can still be claimed at AA individually; only the payment page is excluded from any claim.",
      "None of the pages in the process can be included in a conformance claim at the specified level, because every page in a multi-step process must conform for the process to conform.",
    ],
    correctIndex: 3,
    explanation:
      "The 'complete processes' requirement states that when a web page is one of a series of pages presenting a process, all pages in the process must conform at the specified level (or better) for any of them to be included in the conformance claim. A majority of conforming pages is irrelevant, and a keyboard trap fails 2.1.2 No Keyboard Trap at Level A, so it is not merely an AA concern.",
    refs: [
      {
        label: "WCAG 2.2: Conformance Requirement 3 (Complete processes)",
        url: "https://www.w3.org/TR/WCAG22/#cc3",
      },
    ],
  },
  {
    id: "conf-004",
    topic: "conformance",
    difficulty: "hard",
    question:
      "What does the 'accessibility-supported ways of using technologies' conformance requirement actually require an author to do?",
    options: [
      "Only use web technologies (HTML, CSS, scripting features, ARIA, media formats) in ways that are supported by users' assistive technologies and accessibility features of user agents; technologies used in non-supported ways must not be relied upon to meet a success criterion.",
      "Avoid all scripting and ARIA, because only plain semantic HTML is considered accessibility supported.",
      "Test the page in at least two screen readers and document the results in the conformance claim.",
      "Use only technologies that appear on the W3C's official published list of accessibility-supported technologies.",
    ],
    correctIndex: 0,
    explanation:
      "Conformance requirement 4 requires that only accessibility-supported ways of using technologies are relied upon to satisfy the success criteria; an accessibility-supported way is one that works with users' assistive technologies and the accessibility features of user agents. Banning scripting and ARIA is wrong (they can be accessibility supported), and there is deliberately no single authoritative W3C list of accessibility-supported technologies, so authors determine support themselves.",
    refs: [
      {
        label: "WCAG 2.2: Conformance Requirement 4 (accessibility-supported ways)",
        url: "https://www.w3.org/TR/WCAG22/#cc4",
      },
      {
        label: "WCAG 2.2: Understanding Accessibility Support",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/conformance.html",
      },
    ],
  },
  {
    id: "conf-005",
    topic: "conformance",
    difficulty: "hard",
    question:
      "A page claims Level A conformance. It meets all Level A success criteria, but it also includes an autoplaying audio clip that runs for 30 seconds with no way to pause or stop it, and a banner that flashes more than three times per second. A reviewer says, 'Those involve AA and Level A criteria the page already meets, so the Level A claim stands.' Which conformance requirement does this overlook?",
    options: [
      "Full pages, because the audio and banner are part of the page.",
      "Conformance level, because meeting Level A automatically requires meeting AA technologies.",
      "Accessibility-supported ways of using technologies, because audio and animation are non-supported technologies.",
      "Non-interference, because technologies that are turned off or not supported, and content like uncontrollable audio or flashing, must not block the user from accessing the rest of the page, including satisfying 1.4.2, 2.1.2, 2.2.2, and 2.3.1 regardless of conformance level.",
    ],
    correctIndex: 3,
    explanation:
      "Non-interference (conformance requirement 5) means that even when a technology is not relied upon, its use must not prevent users from accessing the rest of the page, and four specific criteria (1.4.2 Audio Control, 2.1.2 No Keyboard Trap, 2.2.2 Pause Stop Hide, 2.3.1 Three Flashes or Below Threshold) must be met at any conformance level. The flashing banner fails 2.3.1 and the autoplay audio fails 1.4.2, both Level A, so the Level A claim does not stand.",
    refs: [
      {
        label: "WCAG 2.2: Conformance Requirement 5 (Non-interference)",
        url: "https://www.w3.org/TR/WCAG22/#cc5",
      },
    ],
  },
  {
    id: "conf-006",
    topic: "conformance",
    difficulty: "medium",
    question:
      "An organization decides to publish an optional WCAG 2.2 conformance claim for its site. Which set of components must that conformance claim include to be valid?",
    options: [
      "A VPAT document, an accessibility statement, and contact details for reporting problems.",
      "The date of the claim, the guidelines title/version/URI (WCAG 2.2), the conformance level satisfied, a concise description of the web pages (such as a list of URIs) the claim covers, and a list of the web content technologies relied upon.",
      "A signed statement from a certified accessibility auditor and the results of an automated scan.",
      "The conformance level satisfied and a promise to fix any reported issues within a stated time frame.",
    ],
    correctIndex: 1,
    explanation:
      "WCAG 2.2 specifies five required components for an (optional) conformance claim: the date, the guidelines title/version/URI, the conformance level satisfied, a concise description of the pages covered, and a list of web content technologies relied upon. A VPAT, an auditor's signature, or an automated scan are not required components of a WCAG conformance claim.",
    refs: [
      {
        label: "WCAG 2.2: Required Components of a Conformance Claim",
        url: "https://www.w3.org/TR/WCAG22/#conformance-claims",
      },
    ],
  },
  {
    id: "conf-007",
    topic: "conformance",
    difficulty: "medium",
    question:
      "A developer wants to claim conformance for just the main content area of a page (the article), excluding a noncompliant third-party advertising widget rendered inside the page. Why does WCAG 2.2 not allow a conformance claim for that partial page?",
    options: [
      "Because conformance and conformance claims are made for full web pages only; you cannot conform a part of a page while excluding other content that is part of it.",
      "Because third-party content is automatically exempt, so the whole page already conforms without a special claim.",
      "Because partial-page claims are allowed only at Level AAA, not at A or AA.",
      'Because a partial-page claim is permitted as long as the excluded region is hidden with `aria-hidden="true"`.',
    ],
    correctIndex: 0,
    explanation:
      "WCAG 2.2 states that conformance (and any conformance claim) is for full web pages only and cannot be achieved if part of a page is excluded. The `aria-hidden` distractor is wrong because hiding a region from the accessibility tree does not remove it from the page for conformance purposes, and partial-page claims are not a function of conformance level. WCAG's optional 'statement of partial conformance' addresses third-party content that the author cannot control and that is not part of the delivered page, which is different from carving out a region of one's own page.",
    refs: [
      {
        label: "WCAG 2.2: Conformance (full pages) and Statement of Partial Conformance",
        url: "https://www.w3.org/TR/WCAG22/#conformance",
      },
    ],
  },
  {
    id: "act-001",
    topic: "evaluation",
    difficulty: "medium",
    question:
      "An ACT atomic rule and an ACT composite rule are being compared. Which statement correctly describes how each is structured under the ACT Rules Format 1.1?",
    options: [
      "An atomic rule combines the outcomes of several other rules, while a composite rule defines its own applicability and expectations from scratch.",
      "An atomic rule has its own applicability and expectations, while a composite rule combines the outcomes of multiple atomic rules into a single outcome.",
      "An atomic rule may only be evaluated by automated tools, while a composite rule may only be evaluated manually.",
      "An atomic rule maps to a single WCAG success criterion, while a composite rule must map to every success criterion at once.",
    ],
    correctIndex: 1,
    explanation:
      "In the ACT Rules Format 1.1, an atomic rule contains its own Applicability and Expectations and tests one specific solution, whereas a composite rule combines the outcomes of multiple atomic rules into a single outcome per test target. The reversed option is the tempting distractor: it swaps the two definitions, but it is composite rules (not atomic) that aggregate other rules' outcomes.",
    refs: [
      {
        label: "ACT Rules Format 1.1: Atomic and Composite Rules",
        url: "https://www.w3.org/TR/act-rules-format-1.1/",
      },
    ],
  },
  {
    id: "act-002",
    topic: "evaluation",
    difficulty: "medium",
    question:
      "Within a single ACT atomic rule, what is the role of the Applicability section as opposed to the Expectations section?",
    options: [
      "Applicability lists which automated tools may run the rule; Expectations lists the WCAG techniques that satisfy it.",
      "Applicability defines the conformance level (A, AA, or AAA) being tested; Expectations defines the contrast ratio or other numeric threshold.",
      "Applicability is the remediation advice for failures; Expectations is the description of the affected user groups.",
      "Applicability precisely defines which parts of the test subject the rule applies to; Expectations states the assertions those matched parts must meet to pass.",
    ],
    correctIndex: 3,
    explanation:
      "Under the ACT Rules Format 1.1, an atomic rule's Applicability is a precise description of the parts of the test subject the rule applies to, and its Expectations are the assertions a matched test target must satisfy to pass rather than fail. Tying Applicability to a conformance level is the tempting error: applicability scopes which elements are tested, not which WCAG level applies.",
    refs: [
      {
        label: "ACT Rules Format 1.1: Rule structure (Applicability and Expectations)",
        url: "https://www.w3.org/TR/act-rules-format-1.1/",
      },
    ],
  },
  {
    id: "act-003",
    topic: "evaluation",
    difficulty: "medium",
    question:
      "An evaluator runs an ACT atomic rule for image accessible names against a page. The page contains no `img` elements and nothing else that matches the rule's applicability. According to the ACT Rules Format, which outcome should the rule report for this page?",
    options: [
      "`inapplicable`, because no part of the test subject matches the rule's applicability",
      "`passed`, because there are no failures to report",
      "`cantTell`, because the evaluator could not locate any test targets",
      "`untested`, because a rule with zero matches has not actually been run",
    ],
    correctIndex: 0,
    explanation:
      "In the ACT Rules Format 1.1, when no part of the test subject matches a rule's applicability the outcome is `inapplicable`, which is distinct from `passed` (a matched target that met all expectations). Reporting `passed` is the tempting mistake: `passed` requires at least one applicable test target that satisfied the expectations, whereas zero matches yields `inapplicable`.",
    refs: [
      {
        label: "ACT Rules Format 1.1: Outcome (inapplicable vs passed)",
        url: "https://www.w3.org/TR/act-rules-format-1.1/",
      },
    ],
  },
  {
    id: "act-004",
    topic: "evaluation",
    difficulty: "hard",
    question:
      "An automated checker reaches a custom widget whose accessible name might be supplied by content injected at runtime, and the tool cannot reliably determine whether the relevant ACT rule's expectation is met. The component clearly does match the rule's applicability. Which outcome best fits this situation, and what does it signal?",
    options: [
      "`inapplicable`, signalling that the component is outside the rule's scope",
      "`failed`, signalling that any element a tool cannot fully evaluate must be treated as a violation",
      "`cantTell`, signalling that a target was applicable but the rule could not be fully resolved, so human review is needed",
      "`untested`, signalling that the rule was deliberately skipped for this page",
    ],
    correctIndex: 2,
    explanation:
      "The ACT Rules Format 1.1 defines `cantTell` for an applicable target where the rule's outcome could not be fully determined, which flags the item for human follow-up rather than asserting a pass or fail. Choosing `failed` is the seductive error: an undetermined result is not the same as a confirmed violation, and `untested` means the subject was never evaluated at all, which is not the case here.",
    refs: [
      {
        label: "ACT Rules Format 1.1: Outcome (cantTell and untested)",
        url: "https://www.w3.org/TR/act-rules-format-1.1/",
      },
    ],
  },
  {
    id: "act-005",
    topic: "evaluation",
    difficulty: "hard",
    question:
      "A procurement team asks why the W3C publishes the ACT Rules Format and the associated ACT Rules library when WCAG conformance is the actual legal requirement. Which statement best captures the purpose of ACT?",
    options: [
      "ACT replaces WCAG's success criteria with a simpler set of pass/fail rules that tools must use to certify conformance.",
      "ACT provides a shared way to write and interpret accessibility test rules so different tools and methodologies produce consistent, comparable results, while remaining informative rather than redefining WCAG conformance.",
      "ACT guarantees that an automated tool implementing the rules will detect every WCAG failure on a page, removing the need for manual testing.",
      "ACT is a normative extension of WCAG 2.2 that adds new Level AA success criteria for automated testability.",
    ],
    correctIndex: 1,
    explanation:
      "The ACT Rules Format and ACT Rules library exist to harmonise how accessibility tests are defined and interpreted so that different tools and methodologies yield consistent, comparable, reproducible results; the rules are informative and do not change what WCAG conformance means. The claim that an ACT-conformant tool finds every WCAG failure is the classic trap, since automated tooling detects only a subset of issues and many criteria still require human judgement.",
    refs: [
      {
        label: "ACT Rules Format 1.1: Purpose and scope",
        url: "https://www.w3.org/TR/act-rules-format-1.1/",
      },
      {
        label: "W3C WAI ACT Rules library (informative test rules)",
        url: "https://www.w3.org/WAI/standards-guidelines/act/rules/",
      },
    ],
  },
  {
    id: "tool-001",
    topic: "evaluation",
    difficulty: "easy",
    question:
      "A team runs an automated accessibility scanner across a site and the report shows zero violations. Which statement best describes what this result actually tells them?",
    options: [
      "The site conforms to WCAG 2.2 Level AA, because a clean automated scan is equivalent to a conformance claim.",
      "Only the subset of issues the tool can detect were not found; many criteria require human judgement, so the site is not proven to conform.",
      "The site conforms to Level A but still needs review for the additional AA criteria.",
      "All Level A and AA criteria pass, but Level AAA criteria remain untested.",
    ],
    correctIndex: 1,
    explanation:
      "Automated tools reliably detect only a minority of WCAG problems (for example missing `alt`, missing `lang`, some contrast), so a clean scan only means no machine-detectable issues were found, not WCAG conformance, which is defined by the normative conformance requirements in WCAG 2.2 and depends on human evaluation of things like alt-text quality and logical focus order. Equating a clean scan with conformance is the core misconception this tests.",
    refs: [
      {
        label: "WCAG 2.2 Conformance Requirements",
        url: "https://www.w3.org/TR/WCAG22/#conformance",
      },
    ],
  },
  {
    id: "tool-002",
    topic: "evaluation",
    difficulty: "medium",
    question:
      "Which of these accessibility checks is genuinely well-suited to fully automated detection, rather than requiring human judgement?",
    options: [
      "Whether the `alt` text on an informative image accurately describes its meaning.",
      "Whether the visual focus order of interactive elements is logical and meaningful.",
      "Whether an `<img>` element is missing an `alt` attribute entirely.",
      "Whether a link's text makes its purpose clear in context.",
    ],
    correctIndex: 2,
    explanation:
      "Detecting that a programmatic feature is absent (an `<img>` with no `alt` attribute) is a deterministic machine check tied to 1.1.1 Non-text Content, Level A, which is why scanners handle it well. Judging whether alt text is accurate, whether focus order is logical (2.4.3), or whether link text is clear (2.4.4) all require human interpretation of meaning, so they cannot be fully automated.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 1.1.1 Non-text Content",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
      },
    ],
  },
  {
    id: "tool-003",
    topic: "evaluation",
    difficulty: "medium",
    question:
      'An automated tool flags a decorative icon with `alt=""` as an error reading "image missing alternative text," even though an empty `alt` is the correct treatment for a decorative image. What kind of result is this, and what is the right response?',
    options: [
      "A false negative; the tester should add descriptive alt text to clear the flag.",
      'A false positive; the tester should verify manually and dismiss the flag, since `alt=""` is correct for a decorative image.',
      "A true positive; the markup must be changed because every `<img>` requires non-empty `alt` text.",
      "A false positive that proves the image actually fails 1.1.1, so it should be reported as a defect.",
    ],
    correctIndex: 1,
    explanation:
      'A false positive is when a tool reports a problem that is not actually a failure; `alt=""` is the correct way to mark a decorative image under 1.1.1 Non-text Content, Level A, so the flag should be verified and dismissed, not acted on. A false negative would be the opposite case (a real problem the tool misses), and the claim that every image needs non-empty `alt` is the misconception driving this kind of false positive.',
    refs: [
      {
        label: "WCAG 2.2 Understanding: 1.1.1 Non-text Content",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
      },
      { label: "ACT Rules Format 1.1", url: "https://www.w3.org/TR/act-rules-format-1.1/" },
    ],
  },
  {
    id: "tool-005",
    topic: "evaluation",
    difficulty: "medium",
    question:
      "Why is testing with assistive technology and real users with disabilities considered necessary even after automated and expert manual testing have both been completed?",
    options: [
      "Because assistive-technology testing replaces manual expert review, which only checks code rather than real behaviour.",
      "Because usability testing with people with disabilities can reveal barriers in actual task completion that pass-or-fail checks against the success criteria do not surface.",
      "Because WCAG 2.2 lists user testing as a sixth conformance requirement that must be documented.",
      "Because only assistive-technology testing can confirm colour contrast ratios meet 1.4.3.",
    ],
    correctIndex: 1,
    explanation:
      "Automated, manual expert, and usability testing with people with disabilities are complementary: usability testing surfaces real-world task barriers and AT interaction problems that a criterion-by-criterion pass/fail audit can miss, even when the page technically passes. WCAG has five conformance requirements, not six, and user testing is not one of them; contrast ratios are measured by tools, not by AT, so those distractors are wrong.",
    refs: [
      {
        label: "WCAG 2.2 Conformance Requirements",
        url: "https://www.w3.org/TR/WCAG22/#conformance",
      },
      {
        label: "WCAG-EM: Website Accessibility Conformance Evaluation Methodology",
        url: "https://www.w3.org/TR/WCAG-EM/",
      },
    ],
  },
  {
    id: "tool-006",
    topic: "evaluation",
    difficulty: "hard",
    question:
      "Two automated tools test the same page against the same WCAG criterion but report different outcomes. The ACT Rules Format is intended to address this kind of inconsistency. Which statement most accurately reflects what ACT Rules and their outcomes do?",
    options: [
      "ACT Rules guarantee that any conforming tool will detect every WCAG failure on a page, eliminating false negatives.",
      "An atomic ACT rule has Applicability and Expectations and produces outcomes such as passed, failed, or inapplicable, giving tools and methodologies a shared, comparable basis for results.",
      "ACT Rules are a normative part of WCAG 2.2, so a page failing any ACT rule is automatically non-conformant at the rule's level.",
      "A composite ACT rule combines other composite rules, which is how a single tool can fully automate every success criterion.",
    ],
    correctIndex: 1,
    explanation:
      "Under the ACT Rules Format 1.1, an atomic rule defines Applicability plus Expectations and yields outcomes (passed, failed, inapplicable, and also cantTell or untested), so different tools and manual methodologies can produce consistent, comparable results. ACT does not make tools detect every failure, is not normative within WCAG, and a composite rule combines atomic-rule outcomes (it cannot contain other composite rules), so those options misstate the format.",
    refs: [
      { label: "ACT Rules Format 1.1", url: "https://www.w3.org/TR/act-rules-format-1.1/" },
      {
        label: "ACT Rules Library (W3C WAI)",
        url: "https://www.w3.org/WAI/standards-guidelines/act/rules/",
      },
    ],
  },
  {
    id: "sr-001",
    topic: "screen-readers",
    difficulty: "medium",
    question:
      "When an NVDA or JAWS user reads a typical web page by pressing the Down arrow, H for headings, or K for links, which interaction mode are they using and what is it reading from?",
    options: [
      "Focus mode (forms mode), reading directly from the live DOM as the system caret moves",
      "Browse mode, reading from a virtual buffer (a flattened off-screen copy of the page) that single-key shortcuts navigate",
      "Application mode, which disables all single-key shortcuts and passes every keystroke to the page",
      "Caption mode, a screen-reader feature that mirrors the visible viewport line by line",
    ],
    correctIndex: 1,
    explanation:
      "NVDA and JAWS default to browse mode when reading documents and web pages. In this mode the screen reader builds a virtual buffer (a flattened off-screen representation of the page), and single-key quick-navigation keys such as H for the next heading and K for the next link move through it. When the user enters a form field or other control that needs typed input, the screen reader switches to focus mode (called forms mode in JAWS), which passes keystrokes straight to the control so letters are typed rather than treated as navigation commands. Focus mode is the plausible distractor because it does engage the live control, but it is not the mode that single-key navigation runs in.",
    refs: [
      {
        label: "Deque University: NVDA Keyboard Shortcuts (browse vs focus mode, quick navigation)",
        url: "https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts",
      },
      {
        label: "Deque University: JAWS Keyboard Shortcuts (browse vs forms mode, quick navigation)",
        url: "https://dequeuniversity.com/screenreaders/jaws-keyboard-shortcuts",
      },
    ],
  },
  {
    id: "sr-002",
    topic: "screen-readers",
    difficulty: "medium",
    question:
      "A user tabs into a text input inside a web form using NVDA. NVDA automatically switches into focus mode (forms mode) so the user can type. What is the practical consequence of this switch for that user?",
    options: [
      "Single-character quick-navigation keys (such as H for next heading) stop navigating and are instead sent to the field as typed text",
      "The virtual buffer is permanently destroyed for the rest of the page visit",
      "All ARIA states on the field, such as `aria-invalid`, are suppressed until browse mode resumes",
      "Tab and Shift+Tab stop working, so the user can no longer leave the field",
    ],
    correctIndex: 0,
    explanation:
      "In focus mode (forms mode) keystrokes go to the focused control so the user can type, which means browse-mode single-key shortcuts like H no longer navigate and are entered as characters instead. The Tab-key distractor is wrong because Tab still moves focus between controls in focus mode, and ARIA states like `aria-invalid` (a state per ARIA 1.2) remain exposed via 4.1.2 Name, Role, Value (Level A) regardless of mode.",
    refs: [
      { label: "WAI-ARIA 1.2 specification", url: "https://www.w3.org/TR/wai-aria-1.2/" },
      {
        label: "WCAG 2.2 Understanding: 4.1.2 Name, Role, Value",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
    ],
  },
  {
    id: "sr-003",
    topic: "screen-readers",
    difficulty: "medium",
    question:
      "A tester needs to confirm that a decorative flourish icon and its container are completely removed from what a screen reader announces, while leaving the element visible on screen. Which markup achieves that?",
    options: [
      '`<span class="flourish" role="presentation">`...`</span>`, which both hides the element visually and removes it from the accessibility tree',
      '`<span class="flourish" aria-label="">`...`</span>`, because an empty `aria-label` removes the element from the accessibility tree',
      '`<span class="flourish" aria-hidden="true">`...`</span>`, which keeps it visible but removes it and its descendants from the accessibility tree',
      '`<span class="flourish" style="display:none">`...`</span>`, which keeps it visible but removes it from the accessibility tree',
    ],
    correctIndex: 2,
    explanation:
      '`aria-hidden="true"` (a state in ARIA 1.2) removes the element and all its descendants from the accessibility tree while leaving it visually rendered, so screen readers ignore it. `display:none` removes the element from both the visual rendering and the accessibility tree (it would also hide it visually, contradicting the requirement), and `role="presentation"` only strips an element\'s semantic role rather than hiding the whole subtree from AT.',
    refs: [{ label: "WAI-ARIA 1.2 specification", url: "https://www.w3.org/TR/wai-aria-1.2/" }],
  },
  {
    id: "sr-004",
    topic: "screen-readers",
    difficulty: "medium",
    question:
      "A VoiceOver user on macOS opens the rotor (VO + U) to move quickly through a page. Which capability does the rotor primarily provide?",
    options: [
      "It automatically repairs missing landmarks and headings before listing them",
      "It lists page elements by category, such as headings, links, landmarks, and form controls, so the user can jump to a chosen item",
      "It increases the announced contrast ratio of text so low-contrast content becomes readable",
      "It converts the page into forms mode so every control can be typed into directly",
    ],
    correctIndex: 1,
    explanation:
      "The VoiceOver rotor groups navigable items by category (headings, links, landmarks, form controls, and so on) and lets the user pick one to jump to, mirroring the elements-lists that NVDA and JAWS expose. This depends on correct programmatic structure per 1.3.1 Info and Relationships (Level A); the rotor does not repair missing structure, so a page lacking headings simply shows none in that category.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 1.3.1 Info and Relationships",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
      },
    ],
  },
  {
    id: "sr-006",
    topic: "screen-readers",
    difficulty: "hard",
    question:
      'A button is coded as `<button>Delete <span aria-hidden="true">file.pdf</span></button>`. A tester reports the screen reader announces only "Delete, button" and asks why `aria-hidden` behaves the way it does on this nested span. Which explanation is correct?',
    options: [
      "`aria-hidden` on the span only hides it from sighted users via CSS, so its text should still be in the accessible name",
      '`aria-hidden="true"` removes the span\'s text from the accessibility tree, so it is excluded from the button\'s name-from-content computation, leaving only "Delete"',
      '`aria-hidden="true"` hides the text visually but the accname algorithm still includes hidden subtrees, so the report indicates a screen-reader bug',
      "`aria-hidden` has no effect inside a button because buttons always compute their name from the `title` attribute",
    ],
    correctIndex: 1,
    explanation:
      '`aria-hidden="true"` (a state in ARIA 1.2) removes the element and its descendants from the accessibility tree, and the accname 1.2 name-from-content computation skips nodes excluded that way, so only "Delete" contributes to the button\'s accessible name (relevant to 4.1.2 Name, Role, Value, Level A). `aria-hidden` is not a visual CSS hide (that is `display:none` or `visibility:hidden`) and the name computation does not include aria-hidden subtrees, so it is not a screen-reader bug.',
    refs: [
      {
        label: "accname 1.2 (Accessible Name Computation)",
        url: "https://www.w3.org/TR/accname-1.2/",
      },
      { label: "WAI-ARIA 1.2 specification", url: "https://www.w3.org/TR/wai-aria-1.2/" },
    ],
  },
  {
    id: "axtree-001",
    topic: "accessibility-tree",
    difficulty: "medium",
    question:
      "While inspecting a widget in the browser DevTools accessibility pane, an auditor notices the rendered DOM contains many more elements than the accessibility tree exposes. Which statement best explains the relationship between the DOM and the accessibility tree?",
    options: [
      "The accessibility tree is a separate, often-pruned representation that the browser derives from the DOM, computing each node's role, name, state, and value and omitting nodes that are not exposed to assistive technology.",
      "The accessibility tree is an exact one-to-one copy of the DOM, so every DOM node always has a matching accessibility node.",
      "Assistive technologies read the raw DOM directly and ignore the accessibility tree, which exists only for browser DevTools.",
      "The accessibility tree is built only from ARIA attributes, so elements without explicit ARIA never appear in it.",
    ],
    correctIndex: 0,
    explanation:
      "The browser computes the accessibility tree from the DOM (plus CSS and ARIA), exposing role, name, state, and value per node and pruning nodes that are not relevant to assistive tech, which is the foundation of 4.1.2 Name, Role, Value (Level A). It is not a one-to-one mirror, because nodes hidden or made presentational are removed; and native semantics (a button, a heading) appear without any ARIA, so the claim that only ARIA-tagged elements appear is wrong.",
    refs: [
      {
        label: "ARIA 1.2: Accessibility Tree",
        url: "https://www.w3.org/TR/wai-aria-1.2/#accessibility_tree",
      },
      {
        label: "WCAG 2.2 Understanding: 4.1.2 Name, Role, Value",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
    ],
  },
  {
    id: "axtree-002",
    topic: "accessibility-tree",
    difficulty: "medium",
    question:
      'An auditor is testing three icon buttons and wants to predict which one will NOT appear in the accessibility tree at all. The markup is:\n1) `<button style="visibility:hidden">Save</button>`\n2) `<button aria-hidden="true">Save</button>`\n3) `<button style="opacity:0">Save</button>`\nWhich button(s) are removed from the accessibility tree?',
    options: [
      "Only the button with `opacity:0`, because transparent elements are never exposed.",
      "All three, because each technique hides the control visually.",
      'The button with `visibility:hidden` and the button with `aria-hidden="true"`; the `opacity:0` button stays in the tree.',
      'Only the button with `aria-hidden="true"`; `visibility:hidden` has no effect on the accessibility tree.',
    ],
    correctIndex: 2,
    explanation:
      '`visibility:hidden` (like `display:none`) prunes the element from the accessibility tree, and `aria-hidden="true"` explicitly removes the element and its subtree, both relevant to 4.1.2 Name, Role, Value (Level A). `opacity:0` only changes paint, so the control remains in the tree and stays focusable, which is the trap in the answer claiming all three are removed.',
    refs: [
      {
        label: "ARIA 1.2: aria-hidden state",
        url: "https://www.w3.org/TR/wai-aria-1.2/#aria-hidden",
      },
      {
        label: "WCAG 2.2 Understanding: 4.1.2 Name, Role, Value",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
    ],
  },
  {
    id: "axtree-003",
    topic: "accessibility-tree",
    difficulty: "medium",
    question:
      "When evaluating how a browser exposes content to a Windows screen reader, an accessibility specialist refers to the platform accessibility APIs in play. Which pairing of platform and accessibility API is correct?",
    options: [
      "macOS exposes content through UI Automation, the same API Windows uses.",
      "Windows exposes content through APIs such as UI Automation and IAccessible2/MSAA, while macOS exposes it through the AX (NSAccessibility) API.",
      "Both Windows and macOS rely solely on the DOM, so no platform accessibility API is involved.",
      "macOS uses IAccessible2/MSAA, and Windows uses the AX API.",
    ],
    correctIndex: 1,
    explanation:
      "Browsers map the accessibility tree onto each operating system's platform accessibility API: on Windows that is UI Automation and IAccessible2/MSAA, and on macOS it is the AX (NSAccessibility) API, which is what makes role/name/state/value reach assistive technologies (the programmatic basis of 4.1.2 Name, Role, Value, Level A). The distractors swap the platforms or claim the DOM is read directly, which screen readers do not do.",
    refs: [
      {
        label: "Core-AAM 1.2: User Agent and Accessibility API Mappings",
        url: "https://www.w3.org/TR/core-aam-1.2/",
      },
      {
        label: "WCAG 2.2 Understanding: 4.1.2 Name, Role, Value",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
    ],
  },
  {
    id: "axtree-004",
    topic: "accessibility-tree",
    difficulty: "hard",
    question:
      'A developer marks a decorative wrapper with `role="presentation"` but is confused why a screen reader still announces the text inside it. The markup is: `<div role="presentation"><p>Quarterly results are up.</p></div>`. What is the correct explanation of how `role="presentation"`/`"none"` affects the accessibility tree?',
    options: [
      '`role="presentation"` removes the element\'s own implicit semantics from the accessibility tree, but its descendant content is still exposed unless separately hidden.',
      '`role="presentation"` is equivalent to `aria-hidden="true"`, so the element and all its descendants are removed from the accessibility tree.',
      '`role="presentation"` has no effect on the accessibility tree and is ignored by browsers.',
      '`role="presentation"` hides the element from sighted users while keeping it fully exposed to assistive technology.',
    ],
    correctIndex: 0,
    explanation:
      'Per ARIA 1.2, `role="presentation"`/`"none"` strips the element\'s own implicit role/semantics but does NOT remove its descendants, so the paragraph text is still exposed, which is why it differs from `aria-hidden="true"` (which removes the element and its entire subtree). The distractor equating it with aria-hidden conflates removing semantics with removing the subtree, and presentation does not change visual rendering at all.',
    refs: [
      {
        label: "MDN: ARIA presentation role",
        url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/presentation_role",
      },
    ],
  },
  {
    id: "vioa-001",
    topic: "aria",
    difficulty: "medium",
    question:
      'While auditing a navigation menu you find this markup for the expandable submenu trigger: `<li aria-expanded="false"><a href="/products">Products</a><ul>...</ul></li>`. Activating the link expands the submenu. What is the primary accessibility problem with this snippet?',
    options: [
      "`aria-expanded` is set on the `<li>`, which is not the interactive control that toggles the submenu, so assistive tech does not announce the collapsed/expanded state on the operable element",
      "`aria-expanded` must always be paired with `aria-controls` on the same element, and its omission here is the only defect",
      '`aria-expanded` is a property and cannot legally take the value `"false"`, so the value should be removed entirely',
      'The `<li>` needs `role="button"` because list items cannot carry any ARIA attributes',
    ],
    correctIndex: 0,
    explanation:
      '`aria-expanded` must be on the focusable, operable element that performs the toggle (here the `<a>` or, better, a `<button>`), not on a non-interactive `<li>`; on the `<li>` a screen reader will not associate the state with the control the user activates, defeating Name, Role, Value (4.1.2, Level A). `aria-expanded` is a state (not a property) and `"false"` is a valid value, so that distractor misclassifies it.',
    refs: [
      {
        label: "ARIA APG: Disclosure (Show/Hide) Pattern",
        url: "https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/",
      },
      {
        label: "WCAG 2.2 Understanding: 4.1.2 Name, Role, Value",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
    ],
  },
  {
    id: "vioa-002",
    topic: "aria",
    difficulty: "medium",
    question:
      'A reviewer encounters this status indicator on a dashboard: `<span aria-label="Server status: online"></span>`, styled as a green dot with CSS. The `<span>` has no role and is not focusable. Why does the `aria-label` fail to make the status available to most screen reader users?',
    options: [
      "`aria-label` is invalid on a `<span>` and must be replaced with the `title` attribute to expose the text",
      '`aria-label` only takes effect once the element receives keyboard focus, so adding `tabindex="0"` would fix it',
      "`aria-label` is generally ignored on a generic non-interactive element (a `<span>` with no semantic role and no name-from-content), so the name is not reliably exposed in the accessibility tree",
      "`aria-label` works here, and the real problem is that the colour green also needs a 4.5:1 contrast ratio against the page background",
    ],
    correctIndex: 2,
    explanation:
      'Per ARIA 1.2 and accname 1.2, `aria-label` is not reliably honoured on generic elements that neither have a widget/landmark role nor support name-from-content, so a bare `<span>` status will not be conveyed; use `role="img"` plus the label, or visually hidden text. This fails 1.1.1 Non-text Content (Level A) for the meaningful indicator. Adding `tabindex` does not make `aria-label` apply, and `aria-label` is not invalid on a `<span>`, it is simply not exposed there.',
    refs: [
      {
        label: "ARIA 1.2: aria-label and prohibited roles",
        url: "https://www.w3.org/TR/wai-aria-1.2/#aria-label",
      },
      {
        label: "accname 1.2 (Accessible Name Computation)",
        url: "https://www.w3.org/TR/accname-1.2/",
      },
    ],
  },
  {
    id: "vioa-003",
    topic: "aria",
    difficulty: "hard",
    question:
      'You test a custom "Add to cart" control coded as `<div role="button" tabindex="0" onclick="addToCart()">Add to cart</div>`. With a keyboard you can Tab to it and it shows focus, but pressing Enter and Space does nothing. Which success criterion is most directly failing here?',
    options: [
      "4.1.2 Name, Role, Value, Level A, because the control has no accessible name",
      "2.4.7 Focus Visible, Level AA, because the focus indicator is unreliable on div elements",
      "2.5.3 Label in Name, Level A, because the visible label is not contained in the accessible name",
      "2.1.1 Keyboard, Level A, because the control's function cannot be operated through the keyboard",
    ],
    correctIndex: 3,
    explanation:
      'The `div` exposes a button role and a name and is focusable, but a click handler does not fire on Enter/Space for a `div`, so the action cannot be triggered by keyboard, which is the defining failure of 2.1.1 Keyboard (Level A). Name, Role, Value is satisfied here (`role=button`, name "Add to cart"), and the visible label equals the accessible name, so Label in Name does not apply.',
    refs: [
      {
        label: "WCAG 2.2 Understanding: 2.1.1 Keyboard",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html",
      },
      {
        label: "ARIA APG: Button Pattern",
        url: "https://www.w3.org/WAI/ARIA/apg/patterns/button/",
      },
    ],
  },
  {
    id: "vioa-004",
    topic: "forms",
    difficulty: "medium",
    question:
      'A search widget is marked up as `<label for="q">Search the site</label> <input id="qfield" type="search">`. The visible text renders above the field. What is wrong with this snippet?',
    options: [
      'The `for` value (`"q"`) does not match the input\'s `id` (`"qfield"`), so no programmatic label association is created and the field has no accessible name from the label',
      "Nothing is wrong; a `<label>` placed before an `<input>` is automatically associated by proximity regardless of the `for` and `id` values",
      '`type="search"` is not a valid input type, so the label cannot attach to it',
      "The label needs an `aria-labelledby` attribute pointing to the input before the association takes effect",
    ],
    correctIndex: 0,
    explanation:
      'An explicit label associates only when the label\'s `for` value exactly matches the input\'s `id`; `"q"` does not match `"qfield"`, so the input is left without a programmatically associated name, failing 1.3.1 Info and Relationships (Level A) and leaving 4.1.2 Name, Role, Value with no name. Proximity does not create the association, `type="search"` is valid, and `aria-labelledby` would point from the input to the label, not the reverse.',
    refs: [
      {
        label: "WCAG 2.2 Understanding: 1.3.1 Info and Relationships",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
      },
      {
        label: "WCAG 2.2 Understanding: 4.1.2 Name, Role, Value",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
    ],
  },
  {
    id: "vioa-005",
    topic: "aria",
    difficulty: "hard",
    question:
      'An author treats the icon in an icon-only link as decorative and hides it from screen readers: `<a href="/settings"><svg aria-hidden="true" focusable="false">...</svg></a>`. There is no other text in the link. Which problem does this snippet have?',
    options: [
      '`aria-hidden="true"` on the `<svg>` is invalid because `aria-hidden` may only be used on the `<body>` element',
      "Hiding the only content from the accessibility tree leaves the link with no accessible name, so it is announced as an unlabelled link, failing 4.1.2 Name, Role, Value and 2.4.4 Link Purpose (In Context)",
      '`focusable="false"` creates a keyboard trap because it prevents the link itself from receiving focus',
      '`aria-hidden="true"` silently moves the link out of the tab order, failing Focus Order',
    ],
    correctIndex: 1,
    explanation:
      '`aria-hidden="true"` removes the SVG from the accessibility tree, which would be fine for a genuinely decorative icon sitting next to visible link text. Here the icon is the link\'s only content, so it is functional rather than decorative: hiding it leaves the `<a>` with no accessible name, and screen readers fall back to whatever they can find, often reading out the raw URL or just saying "link". WCAG documents this pattern as failure F89, a failure of 2.4.4 Link Purpose (In Context) and 4.1.2 Name, Role, Value, both Level A, and of 2.4.9 Link Purpose (Link Only) at AAA. Auditors often cite 1.1.1 Non-text Content as well, since it requires non-text content that acts as a control to have a name describing its purpose; that reading is defensible, but F89 itself does not map to 1.1.1. The fix is to add visually hidden text or an `aria-label` on the link. `aria-hidden` does not affect the link\'s tab order or focusability, and `focusable="false"` only controls the SVG\'s own focusability (an IE/Edge legacy concern); it does not trap focus.',
    refs: [
      {
        label: "WCAG 2.2 Failure F89: no accessible name for an image-only link",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F89",
      },
      {
        label: "WCAG 2.2 Understanding: 4.1.2 Name, Role, Value",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
      {
        label: "WCAG 2.2 Understanding: 2.4.4 Link Purpose (In Context)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html",
      },
      {
        label: "WCAG 2.2 Understanding: 1.1.1 Non-text Content",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
      },
      {
        label: "MDN: aria-hidden attribute",
        url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-hidden",
      },
    ],
  },
  {
    id: "vioa-006",
    topic: "aria",
    difficulty: "hard",
    question:
      'While reviewing a data table you find: `<table role="table"><tr role="row"><th role="columnheader">Name</th><th role="columnheader">Email</th></tr>...</table>`. The native HTML table elements already carry these semantics. According to ARIA guidance, what is the main issue?',
    options: [
      "The roles are required: native `<table>`, `<tr>`, and `<th>` do not expose table semantics to assistive technology without explicit ARIA roles",
      "Applying redundant ARIA roles that duplicate the implicit semantics of native elements is discouraged because it adds risk and maintenance cost without benefit, contrary to the First Rule of ARIA",
      'The `<th>` elements must use `role="rowheader"` instead of `role="columnheader"` whenever they appear in the first row',
      "Each role attribute must also be paired with a matching `aria-label` or the table will have no accessible name",
    ],
    correctIndex: 1,
    explanation:
      'Native `<table>`, `<tr>`, and `<th scope="col">` already expose table, row, and columnheader semantics, so re-declaring them with ARIA is redundant; the First Rule of ARIA says do not use ARIA when native HTML already provides the semantics and behaviour. The roles are not required (native semantics suffice), `role="columnheader"` is correct for a header that labels a column, and table roles do not each demand an `aria-label`.',
    refs: [
      { label: "Using ARIA: First Rule of ARIA Use", url: "https://www.w3.org/TR/using-aria/" },
      { label: "WAI-ARIA 1.2 specification", url: "https://www.w3.org/TR/wai-aria-1.2/" },
    ],
  },
  {
    id: "viob-001",
    topic: "evaluation",
    difficulty: "medium",
    question:
      'An audit of a documentation page finds that every section is introduced by a `<p class="section-title">` styled with CSS to be larger and bold, so each one looks exactly like a heading. There are no `<h1>` to `<h6>` elements and no `role="heading"` anywhere on the page. Which success criterion does this most directly fail?',
    options: [
      "1.3.1 Info and Relationships, Level A, because structure conveyed through the visual presentation is not programmatically determinable",
      "2.4.6 Headings and Labels, Level AA, because anything that visually acts as a heading must be descriptive and marked up as one",
      "2.4.10 Section Headings, Level AAA, because every section must begin with a real heading element",
      "2.4.1 Bypass Blocks, Level A, because screen reader users rely on heading navigation to bypass content",
    ],
    correctIndex: 0,
    explanation:
      "Text that only looks like a heading conveys its role by presentation alone, so sighted users perceive a structure that assistive technology is never told about. That is precisely what 1.3.1 Info and Relationships (Level A) prohibits, and WCAG documents this exact pattern as failure F2. Note the contrast with skipped heading levels: real heading markup with a gap in the numbering (say `h2` straight to `h4`) still exposes the structure programmatically and is a best-practice concern, not a failure, whereas styled-only headings expose no structure at all. 2.4.6 Headings and Labels (AA) judges whether headings that exist are descriptive; it does not require text to be marked up as a heading. 2.4.10 Section Headings is Level AAA, and 2.4.1 Bypass Blocks can be satisfied by a mechanism such as a skip link, so neither is the most direct failure here.",
    refs: [
      {
        label: "WCAG 2.2 Failure F2: using text presentation to convey structure without markup",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F2",
      },
      {
        label: "WCAG 2.2 Understanding: 1.3.1 Info and Relationships",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
      },
      {
        label: "WCAG 2.2 Understanding: 2.4.6 Headings and Labels",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html",
      },
    ],
  },
  {
    id: "viob-002",
    topic: "evaluation",
    difficulty: "medium",
    question:
      'A blog article ends with three links whose markup is `<a href="/post/12">Read more</a>`, `<a href="/post/13">Read more</a>`, and `<a href="/post/14">Read more</a>`. Each points to a different article. There is no `aria-label` or other accessible name override. Which issue does this represent at Level A?',
    options: [
      "It fails 4.1.2 Name, Role, Value because the links have no accessible role",
      "It fails 3.2.4 Consistent Identification because identical components must have identical names",
      "It fails 2.4.4 Link Purpose (In Context) because the purpose cannot be determined from the link text or its programmatically associated context",
      "It passes, because identical link text on a page is always acceptable when each href is unique",
    ],
    correctIndex: 2,
    explanation:
      "Repeated 'Read more' text gives no indication of each destination, failing 2.4.4 Link Purpose (In Context), Level A, which requires the purpose to be clear from the link text alone or together with its programmatically determined context. It is not a 3.2.4 Consistent Identification issue, since that criterion is about giving the SAME function the SAME name across pages, and here the links lead to different content.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 2.4.4 Link Purpose (In Context)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html",
      },
      {
        label: "WCAG 2.2 Understanding: 3.2.4 Consistent Identification",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification.html",
      },
    ],
  },
  {
    id: "viob-003",
    topic: "evaluation",
    difficulty: "hard",
    question:
      "A data table has a header row and a header column, marked up as: the first row uses `<th>` cells for column titles, and the first cell of every body row uses `<th>` for the row's label. None of the `<th>` elements carry a `scope` attribute, and there are no `headers`/`id` associations. A screen reader user reports that header context is announced inconsistently across browsers. Which finding is most accurate?",
    options: [
      "The table fully conforms because using `<th>` elements is sufficient to associate headers in all cases",
      "The table risks failing 1.3.1 Info and Relationships, Level A, because the row/column header relationships are not reliably programmatically determinable without `scope` or `headers`/`id`",
      "The table fails 1.3.2 Meaningful Sequence, Level A, because header cells must come before data cells in the DOM",
      "The table fails 4.1.2 Name, Role, Value, Level A, because `<th>` elements lack an accessible name",
    ],
    correctIndex: 1,
    explanation:
      "For a table with both row and column headers, the directional association can be ambiguous to assistive technology, so `scope` (or `headers`/`id`) is needed to make the relationships reliably programmatically determinable under 1.3.1 Info and Relationships, Level A. The distractor claiming `<th>` alone always suffices is the common misconception: it can work for simple single-axis tables but is not robust for tables with both header rows and header columns.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 1.3.1 Info and Relationships",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html",
      },
    ],
  },
  {
    id: "viob-004",
    topic: "evaluation",
    difficulty: "medium",
    question:
      'A marketing page renders its main tagline as a flattened PNG containing styled text: `<img src="tagline.png" alt="Accessibility for everyone, everywhere">`. The styling (a particular font and colour) is purely presentational and could be achieved with CSS. The alt text is accurate. Which finding best describes the issue?',
    options: [
      "It fails 1.1.1 Non-text Content, Level A, because the alt text duplicates visible text",
      "It passes everything, because correct alt text fully satisfies any image of text",
      "It fails 1.4.4 Resize Text, Level AA, because PNGs cannot be enlarged at all",
      "It fails 1.4.5 Images of Text, Level AA, because text is presented as an image when CSS could achieve the same visual presentation",
    ],
    correctIndex: 3,
    explanation:
      "Rendering text as an image when the same visual result is achievable with real text violates 1.4.5 Images of Text, Level AA, regardless of how good the alt text is. The misconception that accurate alt text satisfies any image of text is wrong: alt addresses 1.1.1 Non-text Content, but 1.4.5 separately requires using actual text unless a specific exception (such as essential presentation or customizable images) applies.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 1.4.5 Images of Text",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/images-of-text.html",
      },
      {
        label: "WCAG 2.2 Understanding: 1.1.1 Non-text Content",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
      },
    ],
  },
  {
    id: "viob-005",
    topic: "media",
    difficulty: "hard",
    question:
      "An e-learning module embeds a prerecorded video with spoken narration and on-screen demonstrations. The team has published a separate downloadable plain-text transcript but has not added any synchronized captions to the video itself. During an audit, which conclusion is correct for Level AA?",
    options: [
      "It satisfies 1.2.2 Captions (Prerecorded), Level A, because a transcript provides the same information as captions",
      "It fails 1.2.2 Captions (Prerecorded), Level A, because synchronized captions are required for prerecorded audio in synchronized media and a transcript does not substitute for them",
      "It fails only 1.2.5 Audio Description (Prerecorded), Level AA, since captions are not needed when a transcript exists",
      "It satisfies all media criteria because a transcript covers both the audio and the visual content",
    ],
    correctIndex: 1,
    explanation:
      "Prerecorded synchronized media must have synchronized captions to meet 1.2.2 Captions (Prerecorded), Level A; a standalone transcript is not a substitute because captions are time-synchronized with the audio for users who are deaf or hard of hearing. Treating a transcript as equivalent to captions is the classic misconception this item targets: they serve different needs and 1.2.2 is not satisfied by a transcript alone.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 1.2.2 Captions (Prerecorded)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html",
      },
    ],
  },
  {
    id: "viob-006",
    topic: "keyboard",
    difficulty: "hard",
    question:
      'A checkout form is coded so that, to enforce a custom order, several inputs carry positive tabindex values: the email field has `tabindex="3"`, the name field `tabindex="1"`, and the phone field `tabindex="2"`, while surrounding interactive elements use the default `tabindex="0"` or none. Which finding is most accurate?',
    options: [
      "It fails 2.1.1 Keyboard, Level A, because positive `tabindex` values remove elements from keyboard operation",
      "It fails 4.1.2 Name, Role, Value, Level A, because `tabindex` changes an element's role",
      "It is acceptable, because positive `tabindex` is the recommended way to guarantee a predictable tab order",
      "It risks failing 2.4.3 Focus Order, Level A, because the positive `tabindex` values create a tab sequence that does not preserve meaning and operability",
    ],
    correctIndex: 3,
    explanation:
      'Positive `tabindex` forces the tabindexed elements to the front of the tab order ahead of all `tabindex="0"` and default elements, producing a focus sequence that can diverge from the visual and logical reading order and thus risks failing 2.4.3 Focus Order, Level A. It is not a 2.1.1 Keyboard failure: the elements remain reachable by keyboard; the problem is the sequence, not operability, and positive `tabindex` is an anti-pattern rather than a recommended technique.',
    refs: [
      {
        label: "WCAG 2.2 Understanding: 2.4.3 Focus Order",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html",
      },
      {
        label: "WCAG 2.2 Understanding: 2.1.1 Keyboard",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html",
      },
    ],
  },
  {
    id: "ttest-003",
    topic: "evaluation",
    difficulty: "medium",
    question:
      "A QA team's expert review confirms that a multi-step booking flow meets every applicable WCAG 2.2 AA success criterion. A product manager asks whether usability testing with people with disabilities is still worth doing. What is the most accurate response?",
    options: [
      "It is unnecessary, because meeting WCAG 2.2 AA guarantees the flow is usable for people with disabilities.",
      "It is unnecessary, because usability testing with disabled users is only valid for assessing AAA criteria.",
      "It is still valuable, because conformance to WCAG does not guarantee the experience is efficient or free of barriers in practice, which testing with real users can reveal.",
      "It should replace the expert review entirely, because WCAG conformance can only be determined by usability testing with disabled users.",
    ],
    correctIndex: 2,
    explanation:
      "WCAG conformance is a technical baseline; it does not measure whether real users can complete tasks efficiently, so usability testing with people with disabilities surfaces practical barriers that a passing audit can miss. The idea that conformance equals usability is the common misconception, and conformance is assessed by evaluation against the success criteria, not determined by usability testing.",
    refs: [
      { label: "WCAG 2.2 spec: Conformance", url: "https://www.w3.org/TR/WCAG22/#conformance" },
      { label: "WCAG-EM Methodology", url: "https://www.w3.org/TR/WCAG-EM/" },
    ],
  },
  {
    id: "ttest-004",
    topic: "evaluation",
    difficulty: "medium",
    question:
      "A tooling team wants their accessibility checks to produce results that are consistent and comparable across different testing tools. They decide to implement checks following the ACT Rules Format. In that format, which statement correctly describes the rule types?",
    options: [
      "An atomic rule has applicability and expectations, while a composite rule combines the outcomes of atomic rules and cannot contain another composite rule.",
      "A composite rule has applicability and expectations, while an atomic rule combines the outcomes of several composite rules.",
      "Both atomic and composite rules may nest other composite rules to any depth to express complex logic.",
      "Atomic rules may only return passed or failed, while composite rules may additionally return cantTell.",
    ],
    correctIndex: 0,
    explanation:
      "In the ACT Rules Format, an atomic rule is defined by its applicability and one or more expectations, while a composite rule aggregates the outcomes of atomic rules and explicitly cannot contain other composite rules. The outcome set (passed, failed, inapplicable, plus cantTell and untested) is not restricted to one rule type, so limiting atomic rules to passed/failed is wrong.",
    refs: [{ label: "ACT Rules Format 1.1", url: "https://www.w3.org/TR/act-rules-format-1.1/" }],
  },
  {
    id: "ttest-005",
    topic: "evaluation",
    difficulty: "hard",
    question:
      "A team adds an automated axe-core scan to their CI pipeline so that accessibility regressions are caught on every pull request. After six months they find that several screen reader and focus-order regressions still reached production. Which conclusion best reflects sound accessibility QA practice?",
    options: [
      "The CI scan was misconfigured; a correctly configured automated rule set in CI catches all WCAG regressions before merge.",
      "Automated regression checks in CI are a useful gate for machine-detectable issues, but they must be paired with periodic manual and assistive-technology testing to catch issues automation cannot detect.",
      "Screen reader and focus-order issues are out of scope for WCAG, so they should not be treated as accessibility regressions.",
      "Automated checks should be removed from CI, because they create false confidence and manual testing alone is sufficient.",
    ],
    correctIndex: 1,
    explanation:
      "Automated checks in CI reliably catch only machine-detectable regressions, so judgement-dependent issues like screen reader announcements and logical focus order (governed by criteria such as 2.4.3 Focus Order, Level A) require complementary manual and assistive-technology testing. No automated configuration can catch all WCAG regressions, and focus order and screen reader support are squarely within WCAG scope, so dropping CI checks entirely just removes a useful first-line gate.",
    refs: [
      { label: "ACT Rules Format 1.1", url: "https://www.w3.org/TR/act-rules-format-1.1/" },
      {
        label: "WCAG 2.2 Understanding: 2.4.3 Focus Order",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html",
      },
    ],
  },
  {
    id: "vpatterm-001",
    topic: "vpat",
    difficulty: "easy",
    question:
      "In a VPAT/ACR, which conformance level term means the criterion is met by at least one method without any known defects?",
    options: ["Supports", "Partially Supports", "Not Applicable", "Not Evaluated"],
    correctIndex: 0,
    explanation:
      'In the VPAT (Voluntary Product Accessibility Template) published by ITI, "Supports" means the product has at least one method that meets the criterion without known defects, including cases met through equivalent facilitation. "Partially Supports" is wrong because it signals that some functionality does not meet the criterion, not full conformance. "Not Applicable" means the criterion is not relevant to the product, and "Not Evaluated" (permitted only for the Level AAA table) means the criterion was not assessed.',
    refs: [
      {
        label: "How to Create an ACR Using a VPAT (Section508.gov, conformance term definitions)",
        url: "https://www.section508.gov/sell/how-to-create-acr-with-vpat/",
      },
      {
        label: "VPAT (ITI Information Technology Industry Council)",
        url: "https://www.itic.org/policy/accessibility/vpat",
      },
    ],
  },
  {
    id: "vpatterm-002",
    topic: "vpat",
    difficulty: "medium",
    question:
      'A product team is filling out a WCAG edition VPAT. They did not assess one criterion at all and want to record that honestly. For which criterion is the term "Not Evaluated" permitted?',
    options: [
      "Any Level A criterion, as long as a reason is noted",
      "Any Level AA criterion that is out of project scope",
      "Only a Level AAA criterion",
      "Any criterion the vendor considers low priority",
    ],
    correctIndex: 2,
    explanation:
      'Per the VPAT instructions, "Not Evaluated" may be used only for Level AAA Success Criteria, because a conformance claim is made against Level A and AA. Using it for a Level A or AA criterion is wrong: those must be assessed and assigned Supports, Partially Supports, Does Not Support, or Not Applicable.',
    refs: [
      {
        label: "How to Create an ACR with a VPAT (Section 508)",
        url: "https://www.section508.gov/sell/how-to-create-acr-with-vpat/",
      },
      { label: "WCAG 2.2 Conformance", url: "https://www.w3.org/TR/WCAG22/#conformance" },
    ],
  },
  {
    id: "vpatterm-003",
    topic: "vpat",
    difficulty: "medium",
    question:
      'A reviewer reads a row marked "Does Not Support" in an ACR. What does that term assert about the product?',
    options: [
      "The criterion does not apply to this product's functionality",
      "The majority of the relevant functionality does not meet the criterion",
      "A small portion of the functionality fails while most of it conforms",
      "The criterion was deferred and has not yet been assessed",
    ],
    correctIndex: 1,
    explanation:
      'In the VPAT terminology, "Does Not Support" means the majority of the product\'s relevant functionality does not meet the criterion. The description of a small portion failing while most conforms is "Partially Supports," and "not relevant" is "Not Applicable," so those are the tempting confusions to avoid.',
    refs: [
      {
        label: "VPAT (ITI) conformance terms",
        url: "https://www.itic.org/policy/accessibility/vpat",
      },
      {
        label: "Accessibility Conformance Report (ACR)",
        url: "https://www.section508.gov/sell/acr/",
      },
    ],
  },
  {
    id: "vpatterm-004",
    topic: "vpat",
    difficulty: "medium",
    question:
      "A media player has no audio-only or video-only prerecorded content anywhere in the product. How should the row for 1.2.1 Audio-only and Video-only (Prerecorded) be completed in the ACR?",
    options: [
      "Supports, because there is nothing that could fail the criterion",
      "Does Not Support, because the feature is missing from the product",
      "Not Evaluated, since there was no content to test",
      "Not Applicable, because the criterion is not relevant to this product",
    ],
    correctIndex: 3,
    explanation:
      'When a criterion has no relevant content or functionality in the product, the correct VPAT term is "Not Applicable." Marking it "Supports" overstates conformance for content that does not exist, and "Not Evaluated" is reserved only for Level AAA criteria (1.2.1 is Level A).',
    refs: [
      {
        label: "VPAT (ITI) conformance terms",
        url: "https://www.itic.org/policy/accessibility/vpat",
      },
      {
        label: "WCAG 2.2 Understanding: 1.2.1 Audio-only and Video-only (Prerecorded)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded.html",
      },
    ],
  },
  {
    id: "vpatterm-005",
    topic: "vpat",
    difficulty: "hard",
    question:
      "An app does not provide a visible always-on label on its search field, but it does pair the field with persistent on-screen instructions plus a programmatic name that together let all users operate it equivalently to a conventionally labelled field. Citing equivalent facilitation, how can this row be recorded for the relevant criterion in the ACR, and what does that VPAT concept mean?",
    options: [
      '"Partially Supports": equivalent facilitation always downgrades a row by one level because the conventional technique is absent',
      '"Supports": equivalent facilitation lets an alternative method that achieves the same accessible outcome count as meeting the criterion',
      '"Not Applicable": equivalent facilitation means the criterion no longer applies once an alternative design is used',
      '"Does Not Support": equivalent facilitation is a WCAG 2.2 exception that VPAT does not recognize',
    ],
    correctIndex: 1,
    explanation:
      'The VPAT defines "Supports" as a criterion met by at least one method without known defects or through equivalent facilitation, meaning an alternative way of meeting the intent that provides an equivalent accessible outcome. It does not force a downgrade to Partially Supports, nor does it make the criterion Not Applicable; the criterion still applies and is judged as met (relevant intent reflected in 3.3.2 Labels or Instructions, Level A).',
    refs: [
      {
        label:
          "Section508.gov: How to create an ACR using a VPAT (conformance term definitions including equivalent facilitation)",
        url: "https://www.section508.gov/sell/how-to-create-acr-with-vpat/",
      },
      {
        label: "WCAG 2.2 Understanding: 3.3.2 Labels or Instructions",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html",
      },
    ],
  },
  {
    id: "vpated-001",
    topic: "vpat",
    difficulty: "easy",
    question:
      "A vendor downloads the blank Voluntary Product Accessibility Template (VPAT), fills it in for their product, and publishes the result. Which statement accurately describes the template and the completed document?",
    options: [
      "The VPAT template is published by the Information Technology Industry Council (ITI), and once filled in it is called an Accessibility Conformance Report (ACR).",
      "The VPAT template is published by the W3C as part of WCAG 2.2, and once filled in it is called a Conformance Claim.",
      "The VPAT template is published by the U.S. Access Board, and once filled in it is called a Section 508 Certificate.",
      "The VPAT template is published by the International Organization for Standardization (ISO), and once filled in it is called an Accessibility Statement.",
    ],
    correctIndex: 0,
    explanation:
      "The VPAT (Voluntary Product Accessibility Template) is published by ITI (Information Technology Industry Council), and a completed VPAT is an Accessibility Conformance Report (ACR). The W3C publishes WCAG but not the VPAT, and a WCAG conformance claim is a separate normative concept, so attributing the template to the W3C is incorrect.",
    refs: [
      {
        label: "ITI: VPAT (Voluntary Product Accessibility Template)",
        url: "https://www.itic.org/policy/accessibility/vpat",
      },
      {
        label: "Section508.gov: Accessibility Conformance Reports (ACR)",
        url: "https://www.section508.gov/sell/acr/",
      },
    ],
  },
  {
    id: "vpated-003",
    topic: "vpat",
    difficulty: "medium",
    question:
      "During procurement, a buyer asks a vendor for an ACR and is instead sent a link to the vendor's public accessibility statement on its marketing site. Why is that not an adequate substitute?",
    options: [
      "An accessibility statement is legally binding while an ACR is voluntary, so the statement is actually the stronger document for procurement.",
      "An ACR is a structured, criterion-by-criterion report of how the product conforms to specific standards (for example each WCAG SC), whereas a public accessibility statement is typically a brief narrative of commitment and contact details, not a per-criterion evaluation.",
      "An ACR can only describe hardware, so a software product can be represented just as well by an accessibility statement.",
      "There is no meaningful difference; an accessibility statement and an ACR are two names for the same VPAT-based document.",
    ],
    correctIndex: 1,
    explanation:
      "A completed VPAT (an ACR) reports conformance criterion by criterion against the chosen standards, giving buyers the detail they need to compare products during procurement; a public accessibility statement is usually a short narrative of commitment, scope, and feedback contacts rather than a per-criterion evaluation. Treating them as the same document is wrong, and an accessibility statement is not inherently legally binding nor a stronger procurement artifact than an ACR.",
    refs: [
      {
        label: "Section508.gov: Accessibility Conformance Reports (ACR)",
        url: "https://www.section508.gov/sell/acr/",
      },
      {
        label: "ITI: VPAT (Voluntary Product Accessibility Template)",
        url: "https://www.itic.org/policy/accessibility/vpat",
      },
    ],
  },
  {
    id: "atag-001",
    topic: "atag",
    difficulty: "medium",
    question:
      "ATAG 2.0 is organized into two parts. What is the difference between Part A and Part B?",
    options: [
      "Part A covers conformance at Level A, while Part B covers the additional Level AA requirements for authoring tools",
      "Part A makes the authoring tool's own user interface accessible, while Part B helps authors produce accessible content",
      "Part A applies to the published web content, while Part B applies to the back-end content management database",
      "Part A governs automated repair features, while Part B governs manual evaluation features",
    ],
    correctIndex: 1,
    explanation:
      "In ATAG 2.0, Part A is about making the authoring tool's user interface accessible (so authors with disabilities can use it), and Part B is about supporting the production of accessible content by any author. The level-based reading is wrong: A and B are functional divisions, not WCAG conformance levels, and each part has its own A/AA/AAA success criteria.",
    refs: [{ label: "ATAG 2.0 (W3C Recommendation)", url: "https://www.w3.org/TR/ATAG20/" }],
  },
  {
    id: "atag-002",
    topic: "atag",
    difficulty: "medium",
    question:
      "A product team is deciding whether ATAG 2.0 applies to their software. Which of these would NOT be considered an authoring tool under ATAG 2.0?",
    options: [
      "A WYSIWYG rich-text editor embedded in a help-desk ticketing app where agents compose public knowledge-base articles",
      "A content management system used to publish and update pages on a public website",
      "A social media app that lets users post text, images, and video to a public feed",
      "A screen reader that reads web content aloud to the end user but does not let them create or edit that content",
    ],
    correctIndex: 3,
    explanation:
      "ATAG 2.0 defines an authoring tool as any software (or service) that authors use to create or modify web content, which includes CMSs, WYSIWYG editors, and social media apps. A screen reader is assistive technology for consuming content, not producing it, so it is outside ATAG's scope (it falls under user-agent and AT considerations instead).",
    refs: [{ label: "ATAG 2.0: authoring tool definition", url: "https://www.w3.org/TR/ATAG20/" }],
  },
  {
    id: "atag-003",
    topic: "atag",
    difficulty: "medium",
    question:
      "A CMS generates the HTML skeleton (headings, landmarks, `lang` attribute, valid structure) for every new page entirely on its own, with no author involvement. Which ATAG 2.0 Part B principle most directly addresses this kind of fully automatic output?",
    options: [
      "B.1: ensure that automatically specified content is accessible",
      "B.2: support authors in producing accessible content",
      "B.3: support authors in improving the accessibility of existing content",
      "B.4: promote and integrate accessibility features",
    ],
    correctIndex: 0,
    explanation:
      "B.1 deals with content the tool produces automatically (without author input); when generation is fully automatic, the output must be accessible by default. B.2 is about supporting the author during manual authoring, B.3 is about checking and repairing existing content, and B.4 is about promoting and integrating the accessibility features, so none of those govern auto-generated output the way B.1 does.",
    refs: [{ label: "ATAG 2.0: Part B principles", url: "https://www.w3.org/TR/ATAG20/" }],
  },
  {
    id: "atag-004",
    topic: "atag",
    difficulty: "hard",
    question:
      'An author pastes an image into a WYSIWYG editor. The editor pops up a required field labeled "Describe this image for screen reader users" and will not let the author finish inserting the image until it is filled or the image is explicitly marked decorative. Which ATAG 2.0 Part B principle does this prompting behavior best exemplify?',
    options: [
      "B.1: ensure that automatically specified content is accessible, because the tool is supplying the alt text itself",
      "B.2: support authors in producing accessible content, by prompting for and assisting with accessibility information during authoring",
      "B.3: support authors in improving the accessibility of existing content, because the author is fixing an existing accessibility defect",
      "B.4: promote and integrate accessibility features, because the prompt advertises an accessibility option",
    ],
    correctIndex: 1,
    explanation:
      "B.2 is about supporting authors as they create content, including prompting for accessibility information such as a text alternative at the point of insertion; this in-flow prompt is a classic B.2 mechanism. B.1 is wrong because the author supplies the description, not the tool; B.3 concerns checking and repairing content that already exists, not capturing it at authoring time.",
    refs: [{ label: "ATAG 2.0: Principle B.2", url: "https://www.w3.org/TR/ATAG20/" }],
  },
  {
    id: "atag-005",
    topic: "atag",
    difficulty: "hard",
    question:
      'A vendor claims their CMS "conforms to ATAG 2.0" because it includes an accessibility checker that flags missing alt text and low contrast in the content authors produce. Why is this claim, on its own, insufficient for ATAG 2.0 conformance?',
    options: [
      "ATAG 2.0 conformance requires WCAG 2.2 Level AAA for the produced content, which a checker alone cannot guarantee",
      "An accessibility checker satisfies Part A (an accessible authoring interface) but ATAG 2.0 only recognizes Part B conformance",
      "A checker addresses checking and repair (B.3), but ATAG 2.0 conformance also requires meeting Part A (the tool's own UI is accessible) and the rest of Part B; satisfying one principle is not conformance to the whole standard",
      "ATAG 2.0 prohibits automated checkers because they cannot reliably detect WCAG failures, so the tool must rely on manual review only",
    ],
    correctIndex: 2,
    explanation:
      "ATAG 2.0 conformance requires satisfying the applicable success criteria across both Part A (the authoring tool's user interface is itself accessible) and Part B (support for producing accessible content); a checker addresses only the checking-and-repair aspect of B.3. Conforming to a single principle is not conformance to the standard, and ATAG does not mandate WCAG AAA nor forbid automated checkers.",
    refs: [{ label: "ATAG 2.0: conformance and Part B.3", url: "https://www.w3.org/TR/ATAG20/" }],
  },
  {
    id: "std-001",
    topic: "en-301-549",
    difficulty: "medium",
    question:
      "A European public sector body asks which version of WCAG and which conformance levels are incorporated into EN 301 549 V3.2.1 for web content. Which answer is correct?",
    options: [
      "WCAG 2.1, Level A and Level AA",
      "WCAG 2.0, Level A and Level AA",
      "WCAG 2.2, Level A, AA, and AAA",
      "WCAG 2.1, Level A only",
    ],
    correctIndex: 0,
    explanation:
      "EN 301 549 V3.2.1 (the current harmonised standard supporting the EU Web Accessibility Directive) incorporates WCAG 2.1 Level A and AA for web content and adds further non-web/ICT requirements. WCAG 2.0 A and AA is what Section 508 (Revised) references, not EN 301 549; WCAG 2.2 has not yet been folded into a harmonised version, and AAA is never required for legal conformance.",
    refs: [
      {
        label:
          "W3C: EU Web Accessibility laws (EN 301 549 includes WCAG 2.1 Level AA for web content)",
        url: "https://www.w3.org/WAI/policies/european-union/",
      },
      {
        label: "EU: Web Accessibility Directive standards and harmonisation",
        url: "https://digital-strategy.ec.europa.eu/en/policies/web-accessibility-directive-standards-and-harmonisation",
      },
    ],
  },
  {
    id: "std-002",
    topic: "standards-relationship",
    difficulty: "medium",
    question:
      "Which statement correctly describes the WCAG version referenced by the Revised Section 508 standards in the United States?",
    options: [
      "Section 508 (Revised) requires WCAG 2.2 Level AAA across all functionality.",
      "Section 508 (Revised) incorporates WCAG 2.0 Level A and AA by reference.",
      "Section 508 (Revised) incorporates WCAG 2.1 Level A and AA, the same as EN 301 549.",
      "Section 508 (Revised) defines its own success criteria and does not reference WCAG at all.",
    ],
    correctIndex: 1,
    explanation:
      "The Revised Section 508 standards incorporate WCAG 2.0 Level A and AA by reference (electronic content under E205.4 and software under E207.2). The tempting distractor is that 508 matches EN 301 549 on WCAG 2.1; in fact EN 301 549 V3.2.1 references WCAG 2.1 A/AA while 508 references the earlier WCAG 2.0 A/AA, and neither requires Level AAA.",
    refs: [
      {
        label: "U.S. Access Board: Revised Section 508 ICT Standards (WCAG 2.0 A/AA)",
        url: "https://www.access-board.gov/ict/",
      },
      {
        label: "WAI: WCAG 2.1 adopted into EN 301 549",
        url: "https://www.w3.org/WAI/news/2018-09-13/WCAG-21-EN301549/",
      },
    ],
  },
  {
    id: "std-003",
    topic: "wcag2ict",
    difficulty: "hard",
    question:
      "A team is preparing a desktop application (not delivered over the web) and wants to apply WCAG-aligned criteria. What is the correct status and scope of WCAG2ICT?",
    options: [
      "It is a normative W3C Recommendation that legally replaces WCAG for all non-web software.",
      "It only covers electronic documents such as PDFs, not standalone software applications.",
      "It is informative guidance on applying WCAG Level A and AA success criteria to non-web documents and software.",
      "It rewrites every WCAG success criterion, including Level AAA, into mandatory non-web requirements.",
    ],
    correctIndex: 2,
    explanation:
      "WCAG2ICT is an informative W3C Working Group Note (not normative) giving guidance on how WCAG 2.0/2.1/2.2 Level A and AA success criteria apply to non-web documents and software. The tempting distractor narrows it to documents only; in fact WCAG2ICT explicitly covers both non-web documents and non-web software, and it sets no binding requirements.",
    refs: [{ label: "WCAG2ICT (Working Group Note)", url: "https://www.w3.org/TR/wcag2ict-22/" }],
  },
  {
    id: "std-004",
    topic: "vpat",
    difficulty: "hard",
    question:
      "A vendor selling a product into both the US federal market and the EU public sector wants a single Accessibility Conformance Report (ACR) that addresses Section 508, EN 301 549, and WCAG in one document. Which VPAT edition should they use?",
    options: [
      "The 508 edition, because it is the most widely recognised and already covers WCAG.",
      "The WCAG edition, because EN 301 549 and Section 508 both derive from WCAG.",
      "The EU edition, because it is based on EN 301 549 which already references the others.",
      "The INT (International) edition, because it combines the 508, EU, and WCAG criteria sets.",
    ],
    correctIndex: 3,
    explanation:
      "A VPAT (Voluntary Product Accessibility Template, published by ITI) comes in four editions: 508, EU (EN 301 549), WCAG, and INT (International), and only the INT edition combines all three criteria sets in one report. Choosing the 508 or WCAG edition would omit the EN 301 549-specific non-web/ICT requirements that the EU market needs.",
    refs: [
      {
        label: "ITI VPAT (Voluntary Product Accessibility Template)",
        url: "https://www.itic.org/policy/accessibility/vpat",
      },
      {
        label: "Section 508 / Accessibility Conformance Report",
        url: "https://www.section508.gov/sell/acr/",
      },
    ],
  },
  {
    id: "std-005",
    topic: "vpat",
    difficulty: "hard",
    question:
      "While completing a VPAT for a product, an evaluator finds that a Level AA success criterion is met for most of the product, but one secondary workflow does not meet it. Which conformance term is correct for that criterion?",
    options: [
      "Supports, because the criterion is met across the majority of the product.",
      "Partially Supports, because some functionality of the product does not meet the criterion.",
      "Not Evaluated, because the failing workflow was not the main use case.",
      "Not Applicable, because the criterion is satisfied everywhere it matters.",
    ],
    correctIndex: 1,
    explanation:
      'In a VPAT/ACR, "Partially Supports" applies when some (but not all) functionality meets the criterion, which fits a product where one workflow fails. "Not Evaluated" is wrong because that term is permitted only for Level AAA criteria, and "Not Applicable" is reserved for criteria that are not relevant to the product at all.',
    refs: [
      {
        label: "Section 508 ACR/VPAT FAQ (conformance terms)",
        url: "https://www.section508.gov/sell/acr-vpat-faq/",
      },
      {
        label: "ITI VPAT (Voluntary Product Accessibility Template)",
        url: "https://www.itic.org/policy/accessibility/vpat",
      },
    ],
  },
  {
    id: "std-006",
    topic: "standards-relationship",
    difficulty: "medium",
    question:
      "Under the EU Web Accessibility Directive, what is the legal effect of a website meeting all applicable requirements of the harmonised standard EN 301 549?",
    options: [
      "It triggers a presumption of conformity with the accessibility requirements of the Directive.",
      "It guarantees WCAG 2.2 Level AAA conformance for the entire site.",
      "It exempts the body from publishing an accessibility statement.",
      "It satisfies the US Section 508 requirements automatically.",
    ],
    correctIndex: 0,
    explanation:
      "Meeting the harmonised standard (EN 301 549 V3.2.1) gives a legal presumption of conformity with the Web Accessibility Directive's accessibility requirements. The distractors confuse this with AAA conformance (EN 301 549 is based on WCAG 2.1 A and AA, not AAA), with the separate accessibility-statement obligation, and with US Section 508, which is a different legal regime referencing WCAG 2.0.",
    refs: [
      {
        label: "EU: Web Accessibility Directive standards and harmonisation",
        url: "https://digital-strategy.ec.europa.eu/en/policies/web-accessibility-directive-standards-and-harmonisation",
      },
    ],
  },
  {
    id: "remed-001",
    topic: "remediation",
    difficulty: "medium",
    question:
      "An audit returns 40 issues across a banking site. One of them prevents keyboard users from completing the funds-transfer flow at all; the rest are lower-impact (a few missing decorative-image niceties, some non-ideal heading wording). With limited capacity, how should the team prioritise remediation?",
    options: [
      "Fix the issues in the order the automated scanner listed them, since the tool already ranks them by importance",
      "Fix the keyboard barrier in the transfer flow first, because it blocks a core task for affected users, then work through the remaining issues by impact and frequency",
      "Fix the largest number of low-effort issues first to lower the total issue count fastest, leaving the harder transfer-flow fix for later",
      "Fix the issues that appear on the most pages first, regardless of whether any of them blocks a task",
    ],
    correctIndex: 1,
    explanation:
      "Remediation should be prioritised by user impact, severity, and frequency: a blocking issue that prevents completing a core task (the keyboard barrier on funds transfer) is the highest severity and should be fixed first. Closing many cosmetic items first to shrink the count, or following scanner order, ignores that one blocker leaves users unable to use the service at all; the keyboard requirement here relates to 2.1.1 Keyboard, Level A.",
    refs: [
      {
        label: "WCAG 2.2 Understanding: 2.1.1 Keyboard",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html",
      },
      { label: "WCAG 2.2: Conformance", url: "https://www.w3.org/TR/WCAG22/#conformance" },
    ],
  },
  {
    id: "remed-002",
    topic: "overlays",
    difficulty: "medium",
    question:
      'A vendor sells a single JavaScript "accessibility overlay" widget and claims that adding it to a site makes the site WCAG 2.2 AA conformant automatically. Why is this not a reliable remediation strategy?',
    options: [
      "Overlays are reliable, but only if the site also publishes an ACR alongside the widget",
      "Overlays reliably fix all WCAG issues at runtime, so the only drawback is the subscription cost",
      "A client-side widget cannot detect and correctly repair many WCAG failures (such as poor alt text, illogical focus order, or wrong semantics) and conformance still requires fixing the underlying code, verified by manual and assistive-technology testing",
      "Overlays only work for screen reader users and therefore do not help keyboard-only users at all",
    ],
    correctIndex: 2,
    explanation:
      "Automated overlay widgets cannot reliably detect or repair issues that need human judgement (the quality of alt text, logical focus and reading order, correct roles and names), so they do not substitute for fixing the source and verifying with manual and AT testing; passing or layering an automated tool is not WCAG conformance. The claim that an overlay fixes everything contradicts that automated tools detect only a minority of WCAG problems.",
    refs: [
      {
        label: "WCAG 2.2: Conformance Requirements",
        url: "https://www.w3.org/TR/WCAG22/#conformance",
      },
      { label: "ACT Rules Format 1.1", url: "https://www.w3.org/TR/act-rules-format-1.1/" },
    ],
  },
  {
    id: "remed-004",
    topic: "sdlc",
    difficulty: "hard",
    question:
      'After repeatedly shipping the same accessibility defects and fixing them late, a team wants to "shift accessibility left" and prevent regressions. Which combination of changes most directly addresses both prevention and regression?',
    options: [
      "Run a full manual audit only once per year and rely on a post-release overlay widget to catch anything missed in production",
      "Add accessibility acceptance criteria during design and development, use a component library with built-in accessible patterns, and run automated a11y checks plus targeted manual and AT tests in CI on every pull request",
      "Move all accessibility work to a single end-of-project QA gate so issues are caught together right before launch",
      "Replace manual testing entirely with an automated scanner in CI, since passing the scan demonstrates WCAG conformance",
    ],
    correctIndex: 1,
    explanation:
      "Shifting left means building accessibility in early (acceptance criteria, accessible-by-default components) and guarding against regressions continuously (automated checks plus targeted manual and AT testing in CI on each change), which is what authoring-tool and process guidance (for example ATAG 2.0 Part B's accessible templates and authoring support) encourages. The scanner-only option is wrong because automated tools detect only a minority of WCAG issues and passing a scan is not conformance.",
    refs: [
      { label: "ATAG 2.0", url: "https://www.w3.org/TR/ATAG20/" },
      {
        label: "WCAG 2.2: Conformance Requirements",
        url: "https://www.w3.org/TR/WCAG22/#conformance",
      },
    ],
  },
  {
    id: "remed-005",
    topic: "remediation",
    difficulty: "hard",
    question:
      "A complex interactive data-grid widget on a legacy page has deep accessibility problems that cannot be fully remediated before a hard regulatory deadline. The same data and all operations are also available through a simpler, fully accessible table-and-form view reachable from the same page. Under WCAG 2.2, what is the correct way to think about this?",
    options: [
      "Providing a conforming alternate version that offers all the same information and functionality, reachable from the non-conforming page, can satisfy conformance for that content while the grid is being remediated",
      "An equivalent accessible alternative is never permitted; the only acceptable path is to fix the data grid itself, no matter the deadline",
      "Because an accessible alternative exists, the team can leave the broken grid in place permanently and never needs to plan remediation of the original",
      'The alternative satisfies conformance only if the inaccessible data grid is also hidden with `aria-hidden="true"` so assistive technology never reaches it',
    ],
    correctIndex: 0,
    explanation:
      "WCAG allows a conforming alternate version (a version that provides all the same information and functionality and is reachable from the non-conforming content) as a way to meet the conformance requirements, which is exactly an equivalent accessible alternative; remediating the original is still the goal and should be tracked on the roadmap. Hiding the grid with `aria-hidden` does not make the page conform and can strip needed semantics, so that is not what the conforming-alternate-version mechanism requires.",
    refs: [
      {
        label: "WCAG 2.2: Conformance Requirements",
        url: "https://www.w3.org/TR/WCAG22/#conformance",
      },
      {
        label: "WCAG 2.2 Understanding: Conformance",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/conformance.html",
      },
    ],
  },
];
