const PROMPT_TEMPLATES = [
  {
    category: 'Debugging',
    icon: '&#x1F41B;',
    templates: [
      { title: 'Fix a specific bug', prompt: 'Look at [file] and fix the bug where [describe the unexpected behaviour]. Run the tests after to verify the fix.', tags: ['debug', 'fix'] },
      { title: 'Explain an error message', prompt: 'I am getting this error when I run [command]:\n\n[paste error message]\n\nExplain what it means and fix the root cause.', tags: ['debug', 'error'] },
      { title: 'Trace a value through the code', prompt: 'Trace how [variable or value] flows through the codebase starting from [entry point]. Show me every function it passes through and where it gets modified.', tags: ['debug', 'trace'] },
      { title: 'Add diagnostic logging', prompt: 'Add helpful logging statements to [file or function] so I can debug [describe the issue]. Use the existing logging pattern in the project. Do not change any logic.', tags: ['debug', 'logging'] },
      { title: 'Find why a test is failing', prompt: 'The test [test name] in [test file] is failing. Read the test, read the source code it exercises, and explain why it fails. Then fix it.', tags: ['debug', 'test'] }
    ]
  },
  {
    category: 'Code Generation',
    icon: '&#x1F680;',
    templates: [
      { title: 'Create a new feature', prompt: 'Create a [feature name] feature that [describe what it should do]. Put the code in [directory or file]. Follow the patterns already used in this project.', tags: ['generate', 'feature'] },
      { title: 'Build a utility function', prompt: 'Write a utility function called [name] that takes [inputs] and returns [output]. Include input validation and edge-case handling. Add it to [file].', tags: ['generate', 'utility'] },
      { title: 'Scaffold a new component', prompt: 'Scaffold a new [React/Vue/HTML] component called [ComponentName] that [describe purpose]. Include props/parameters for [list customisable parts]. Match the style of existing components in [directory].', tags: ['generate', 'component'] },
      { title: 'Generate a script', prompt: 'Write a [language] script that [describe task]. It should read from [input source] and output to [destination]. Add error handling and a usage message when run without arguments.', tags: ['generate', 'script'] },
      { title: 'Create an API endpoint', prompt: 'Add a new [GET/POST/PUT/DELETE] endpoint at [route] that [describe what it does]. Follow the existing route and controller patterns in this project. Include input validation and error responses.', tags: ['generate', 'api'] }
    ]
  },
  {
    category: 'Refactoring',
    icon: '&#x2699;',
    templates: [
      { title: 'Clean up a messy file', prompt: 'Refactor [file] to improve readability. Extract long functions, name magic numbers, and remove dead code. Do not change any external behaviour.', tags: ['refactor', 'cleanup'] },
      { title: 'Extract repeated logic', prompt: 'Find all duplicated logic related to [describe pattern] across the codebase. Extract it into a shared helper function and update all call sites.', tags: ['refactor', 'dry'] },
      { title: 'Rename for clarity', prompt: 'In [file or directory], rename [old name] to [new name] everywhere it appears — variables, functions, comments, and imports. Make sure nothing breaks.', tags: ['refactor', 'rename'] },
      { title: 'Simplify conditional logic', prompt: 'Simplify the complex if/else or switch logic in [function name] in [file]. Use early returns, guard clauses, or a lookup table where appropriate.', tags: ['refactor', 'simplify'] },
      { title: 'Modernise syntax', prompt: 'Update [file] to use modern [language] syntax (e.g., arrow functions, destructuring, async/await, template literals). Keep all behaviour identical.', tags: ['refactor', 'modernise'] }
    ]
  },
  {
    category: 'Testing',
    icon: '&#x1F9EA;',
    templates: [
      { title: 'Write unit tests', prompt: 'Write unit tests for [function or module] in [file]. Cover the happy path, edge cases, and error cases. Use the testing framework already configured in this project.', tags: ['test', 'unit'] },
      { title: 'Add integration tests', prompt: 'Write integration tests for the [feature or workflow] that verify [describe end-to-end behaviour]. Mock external dependencies like [API/database/filesystem].', tags: ['test', 'integration'] },
      { title: 'Improve test coverage', prompt: 'Check which functions in [file or directory] lack test coverage. Write tests for the untested paths, focusing on error handling and boundary conditions.', tags: ['test', 'coverage'] },
      { title: 'Generate test data', prompt: 'Create a test fixture file with realistic sample data for [describe data shape]. Include at least [number] entries covering normal values, edge cases, and invalid inputs.', tags: ['test', 'fixtures'] },
      { title: 'Add snapshot tests', prompt: 'Add snapshot tests for [component or output] to catch unintended changes in its rendered output. Use the snapshot testing tool already in the project.', tags: ['test', 'snapshot'] }
    ]
  },
  {
    category: 'Code Review',
    icon: '&#x1F50D;',
    templates: [
      { title: 'General code review', prompt: 'Review [file or directory] for bugs, readability issues, and improvements. List each finding with the file, line number, severity (high/medium/low), and a suggested fix.', tags: ['review', 'quality'] },
      { title: 'Security audit', prompt: 'Audit [file or directory] for security vulnerabilities: injection risks, exposed secrets, missing input validation, insecure defaults. Prioritise by severity.', tags: ['review', 'security'] },
      { title: 'Performance review', prompt: 'Review [file or function] for performance issues: unnecessary loops, repeated computations, large memory allocations, missing caching opportunities. Suggest concrete improvements.', tags: ['review', 'performance'] },
      { title: 'Review a pull request', prompt: 'Review the changes in this branch compared to [base branch]. Summarise what changed, flag any risks, and suggest improvements. Run the tests to check nothing is broken.', tags: ['review', 'pr'] },
      { title: 'Check for accessibility', prompt: 'Review [file or component] for accessibility issues: missing alt text, poor contrast, keyboard navigation gaps, missing ARIA labels. Reference WCAG 2.1 AA guidelines.', tags: ['review', 'a11y'] }
    ]
  },
  {
    category: 'Documentation',
    icon: '&#x1F4D6;',
    templates: [
      { title: 'Add inline comments', prompt: 'Add clear comments to [file] explaining the non-obvious logic. Do not comment trivial lines — focus on the "why" rather than the "what".', tags: ['docs', 'comments'] },
      { title: 'Write a README', prompt: 'Generate a README.md for [project or directory] covering: what it does, how to install, how to run, configuration options, and a usage example.', tags: ['docs', 'readme'] },
      { title: 'Generate API documentation', prompt: 'Document all public functions and endpoints in [file or directory]. For each, include: description, parameters with types, return value, and a usage example.', tags: ['docs', 'api'] },
      { title: 'Create a changelog entry', prompt: 'Look at the git commits since [tag or date]. Write a changelog entry grouped by: Added, Changed, Fixed, Removed. Use concise user-facing language.', tags: ['docs', 'changelog'] }
    ]
  },
  {
    category: 'DevOps & Deploy',
    icon: '&#x1F4E6;',
    templates: [
      { title: 'Create a Dockerfile', prompt: 'Write a Dockerfile for this project. Use a multi-stage build, run as a non-root user, and keep the final image as small as possible. Add a .dockerignore file too.', tags: ['devops', 'docker'] },
      { title: 'Set up CI/CD pipeline', prompt: 'Create a [GitHub Actions / GitLab CI] pipeline that: installs dependencies, runs linting, runs tests, and builds the project. Trigger on push to main and on pull requests.', tags: ['devops', 'ci'] },
      { title: 'Write a deploy script', prompt: 'Write a deploy script that builds the project, runs tests, and deploys to [target environment]. Include a rollback step if the health check fails. Use [bash/Python/Node].', tags: ['devops', 'deploy'] },
      { title: 'Set up environment config', prompt: 'Create an .env.example file listing every environment variable this project needs. Include a comment for each explaining its purpose and an example value. Never include real secrets.', tags: ['devops', 'config'] },
      { title: 'Add health check endpoint', prompt: 'Add a /health endpoint that returns the app version, uptime, and status of dependencies (database, external APIs). Return HTTP 200 when healthy, 503 when degraded.', tags: ['devops', 'monitoring'] }
    ]
  }
];
