# 🧭 Top-Level Locator Methods in Playwright

| Role         | Description                          | Example                        |
| ------------ | ------------------------------------ | ------------------------------ |
| `button`     | For buttons                          | `page.getByRole('button')`     |
| `link`       | Anchor tags (`<a>`) with `href`      | `page.getByRole('link')`       |
| `textbox`    | Input fields (`<input type="text">`) | `page.getByRole('textbox')`    |
| `checkbox`   | Checkboxes                           | `page.getByRole('checkbox')`   |
| `radio`      | Radio buttons                        | `page.getByRole('radio')`      |
| `combobox`   | Dropdowns/select fields              | `page.getByRole('combobox')`   |
| `list`       | For `<ul>`/`<ol>`                    | `page.getByRole('list')`       |
| `listitem`   | For `<li>` inside lists              | `page.getByRole('listitem')`   |
| `heading`    | For `<h1>`–`<h6>`                    | `page.getByRole('heading')`    |
| `img`        | For images with `alt` text           | `page.getByRole('img')`        |
| `dialog`     | Modal dialogs                        | `page.getByRole('dialog')`     |
| `tab`        | For tab interfaces                   | `page.getByRole('tab')`        |
| `tabpanel`   | For tab content areas                | `page.getByRole('tabpanel')`   |
| `navigation` | Nav bar containers                   | `page.getByRole('navigation')` |
| `main`       | Main content area                    | `page.getByRole('main')`       |
| `form`       | For `<form>` elements                | `page.getByRole('form')`       |
| `searchbox`  | Input used for searching             | `page.getByRole('searchbox')`  |
| `slider`     | For range sliders                    | `page.getByRole('slider')`     |
| `spinbutton` | Number steppers                      | `page.getByRole('spinbutton')` |
| `switch`     | Toggle switch                        | `page.getByRole('switch')`     |

# 🎯 Advanced Locator Techniques
| Pattern                                | Description                             | Example                                         |
| -------------------------------------- | --------------------------------------- | ----------------------------------------------- |
| `.first()` / `.nth(index)` / `.last()` | Target element at position              | `locator('.item').nth(2)`                       |
| `.filter()`                            | Refine locator by additional conditions | `locator('button').filter({ hasText: 'Edit' })` |
| `.has()` / `.hasText()`                | Locate based on child or inner text     | `locator('div').hasText('Logged in')`           |
| `.and()`                               | Combine multiple locators               | `locator('button').and(locator(':visible'))`    |
| `.locator('selector')`                 | Sub-locate from another locator         | `section.locator('button')`                     |

