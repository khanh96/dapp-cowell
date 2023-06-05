explain:

```json
"dev": "vite", // start dev server, aliases: `vite dev`, `vite serve`
"build": "tsc && vite build", // build for production
"lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
"lint-c": "eslint --ext ts,tsx src/",
"lint:fix": "eslint --fix --ext ts,tsx src/",
"prettier": "prettier --check \"src/**/(*.tsx|*.ts|*.css|*.scss)\"",
"prettier:fix": "prettier --write \"src/**/(*.tsx|*.ts|*.css|*.scss)\"",
"preview": "vite preview" // locally preview production build
```
