# 🎭 Playwright `getByRole()` Complete Guide with Real-World Examples

> Use `page.getByRole(role, options)` to locate accessible elements reliably.  
> This guide includes **all ARIA-supported roles** and **where you'd encounter them in real apps**.

---

## 🔐 Authentication

| Role       | Description                    | Example Usage |
|------------|--------------------------------|---------------|
| `textbox`  | For username/email inputs      | `page.getByRole('textbox', { name: 'Email' })` |
| `textbox`  | For password (if visible label)| `page.getByRole('textbox', { name: 'Password' })` |
| `button`   | For "Sign in", "Register", etc | `page.getByRole('button', { name: 'Sign in' })` |
| `link`     | For "Forgot password?"         | `page.getByRole('link', { name: 'Forgot password?' })` |
| `form`     | For the login form container   | `page.getByRole('form', { name: 'Login' })` |

---

## 📑 Navigation & Layout

| Role           | Description                       | Example Usage |
|----------------|-----------------------------------|---------------|
| `navigation`   | Top or side navigation bars       | `page.getByRole('navigation', { name: 'Main nav' })` |
| `banner`       | Site header                       | `page.getByRole('banner')` |
| `main`         | Main content area                 | `page.getByRole('main')` |
| `contentinfo`  | Page footer                       | `page.getByRole('contentinfo')` |
| `link`         | Menu links                        | `page.getByRole('link', { name: 'Dashboard' })` |

---

## 📋 Forms & Inputs

| Role           | Description                          | Example Usage |
|----------------|--------------------------------------|---------------|
| `textbox`      | Text, email, and password fields     | `page.getByRole('textbox', { name: 'Email' })` |
| `checkbox`     | Checkbox inputs                      | `page.getByRole('checkbox', { name: 'Accept terms' })` |
| `radio`        | Radio button choices                 | `page.getByRole('radio', { name: 'Male' })` |
| `combobox`     | Dropdown/select fields               | `page.getByRole('combobox', { name: 'Country' })` |
| `switch`       | Toggle switch controls               | `page.getByRole('switch', { name: 'Enable dark mode' })` |
| `slider`       | Range input                          | `page.getByRole('slider', { name: 'Volume' })` |
| `spinbutton`   | Numeric steppers                     | `page.getByRole('spinbutton', { name: 'Quantity' })` |
| `searchbox`    | Search inputs                        | `page.getByRole('searchbox', { name: 'Search' })` |

---

## 🧭 Tabs & Panels

| Role         | Description                    | Example Usage |
|--------------|--------------------------------|---------------|
| `tab`        | Tab label                      | `page.getByRole('tab', { name: 'Profile' })` |
| `tabpanel`   | Content associated with a tab  | `page.getByRole('tabpanel')` |

---

## 🪟 Modals & Dialogs

| Role       | Description               | Example Usage |
|------------|---------------------------|---------------|
| `dialog`   | For modal windows         | `page.getByRole('dialog', { name: 'Confirm Delete' })` |
| `alert`    | Inline error/warning      | `page.getByRole('alert')` |

---

## 📷 Media & Visuals

| Role       | Description                    | Example Usage |
|------------|--------------------------------|---------------|
| `img`      | Images with `alt` text         | `page.getByRole('img', { name: 'Product preview' })` |
| `figure`   | Standalone image with caption  | Not directly queryable, but use `getByRole('img')` inside it |

---

## 🗂️ Lists, Tables & Data

| Role         | Description                     | Example Usage |
|--------------|---------------------------------|---------------|
| `list`       | `<ul>` or `<ol>` elements       | `page.getByRole('list')` |
| `listitem`   | `<li>` inside lists             | `page.getByRole('listitem', { name: 'Item A' })` |
| `table`      | Semantic data tables            | `page.getByRole('table')` |
| `row`        | Table rows                      | `page.getByRole('row')` |
| `cell`       | Table data cells                | `page.getByRole('cell')` |
| `columnheader` | Table header cells            | `page.getByRole('columnheader')` |
| `rowheader`  | Row headers                     | `page.getByRole('rowheader')` |
| `grid`       | Advanced editable table/grid    | `page.getByRole('grid')` |

---

## 🎧 Interactive UI Components

| Role         | Description                      | Example Usage |
|--------------|----------------------------------|---------------|
| `button`     | Clickable actions                | `page.getByRole('button', { name: 'Submit' })` |
| `link`       | Anchor tags with `href`          | `page.getByRole('link', { name: 'Learn More' })` |
| `tooltip`    | Tooltip text                     | `page.getByRole('tooltip')` |
| `status`     | Status updates (e.g. loading...) | `page.getByRole('status')` |
| `progressbar`| Progress indicators              | `page.getByRole('progressbar')` |

---

## 🛠️ Utility

| Role       | Description                     | Example Usage |
|------------|---------------------------------|---------------|
| `alertdialog` | Modal alert with actions     | `page.getByRole('alertdialog')` |
| `log`      | Console or live log display     | `page.getByRole('log')` |
| `marquee`  | Deprecated; scrolling text      | Rarely used   |
| `timer`    | Live countdown timer            | `page.getByRole('timer')` |
| `tooltip`  | Hover help text                 | `page.getByRole('tooltip')` |

---

## 📌 Tips for Using `getByRole()`

- Prefer `getByRole` over `getByText`, `getByLabel`, etc., for accessibility-first selectors.
- Use the `name` option for accessible labels:
  ```ts
  page.getByRole('button', { name: 'Save changes' });
