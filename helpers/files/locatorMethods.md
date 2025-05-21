| Method                              | Description                           | Example                                        |
| ----------------------------------- | ------------------------------------- | ---------------------------------------------- |
| `locator(selector)`                 | Generic CSS/XPath/text selector       | `page.locator('.btn-primary')`                 |
| `getByRole(role[, options])`        | Find by ARIA role and accessible name | `page.getByRole('button', { name: 'Submit' })` |
| `getByLabel(text[, options])`       | Find form inputs by `<label>`         | `page.getByLabel('Email')`                     |
| `getByPlaceholder(text[, options])` | Find inputs by `placeholder` text     | `page.getByPlaceholder('Enter your email')`    |
| `getByText(text[, options])`        | Find by visible text                  | `page.getByText('Welcome back')`               |
| `getByTitle(text[, options])`       | Find by `title` attribute             | `page.getByTitle('User profile')`              |
| `getByAltText(text[, options])`     | Find images by `alt` attribute        | `page.getByAltText('Company logo')`            |
| `getByTestId(testId)`               | Find by `data-testid` attribute       | `page.getByTestId('login-form')`               |
