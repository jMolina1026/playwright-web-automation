# ✅ Preferred Order of Locator Methods (Best Practice)

###### This priority is based on accessibility, semantic meaning, and stability:

| Priority | Locator Method                    | Why?                                                                   |
| -------- | --------------------------------- | ---------------------------------------------------------------------- |
| 1️⃣      | `getByRole()`                     | **Most semantic & accessible** — based on ARIA roles and names.        |
| 2️⃣      | `getByLabel()`                    | Best for form fields (input, checkbox, textarea) tied to a `<label>`.  |
| 3️⃣      | `getByPlaceholder()`              | Use when labels are missing, and the field has a clear placeholder.    |
| 4️⃣      | `getByText()`                     | Great for buttons, links, and visible text content.                    |
| 5️⃣      | `getByAltText()` / `getByTitle()` | Use for images or tooltips with `alt` or `title` attributes.           |
| 6️⃣      | `getByTestId()`                   | Use as a **last resort** when no semantic markup is available.         |
| 7️⃣      | `locator('selector')`             | Lowest-level — use for fine-grained or legacy cases (e.g., XPath/CSS). |

# 🔍 Why this order?
- Accessibility-first: Methods like getByRole() and getByLabel() align with how users (especially screen readers) interact with your app.

- Stability: These locators change less often than CSS classes or DOM structure.

- Readability: A test that says .getByRole('button', { name: 'Submit' }) is far more descriptive than .locator('.btn-primary').
