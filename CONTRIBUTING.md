# Contributing to presentation-template

🎉 Thank you for your interest in contributing to `presentation-template`! Your
ideas, fixes, and improvements are welcome and appreciated.

Whether you’re fixing a typo, reporting a bug, suggesting a feature, or
submitting a pull request—this guide will help you get started.

Everyone participating in this project is expected to follow the
[Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

<!-- prettier-ignore-start -->

1. Open an Issue

    - Have a question, bug report, or feature suggestion?
    [Open an issue](https://github.com/isaac-cf-wong/presentation-template/issues/new/choose)
    and describe your idea clearly.
    - Check for existing issues before opening a new one.

2. Fork and Clone the Repository

    ```shell
    git clone git@github.com:<username>/presentation-template.git
    cd presentation-template
    ```

3. Set Up Your Environment

    The presentation itself only needs Node.js (18.x or 20.x, matching CI) and
    npm:

    ```shell
    npm install
    ```

    The repository tooling (pre-commit hooks, changelog generation) is managed
    with [uv](https://docs.astral.sh/uv/). If you don't have uv installed, you
    can install it with pip:

    - Install via pip: `pip install --upgrade pip && pip install uv`
    - Project pages: [uv on PyPI](https://pypi.org/project/uv/) | [uv on GitHub](https://github.com/astral-sh/uv)
    - Full documentation and usage guide: [uv docs](https://docs.astral.sh/uv/)

    ```shell
    uv sync --group dev
    ```

4. Set Up Pre-commit Hooks

    We use **pre-commit** hooks (run through
    [prek](https://github.com/j178/prek)) to ensure consistent formatting,
    linting, and spelling. After syncing dependencies, run:

    ```shell
    uv run prek install
    ```

    This installs the hooks defined in `.pre-commit-config.yaml` so prettier,
    markdownlint, stylelint, typos, and the rest run when you commit. To run
    them over the whole repository at any time:

    ```shell
    uv run prek run --all-files
    ```

    Pull request titles are validated in GitHub Actions (see
    `.github/workflows/semantic-pr-title.yml`) using the same Conventional
    Commit vocabulary described under [Commit Message Guidelines](#commit-message-guidelines).

    > **Important**
    > The changelog is auto-generated from commits. Use Conventional Commits
    > locally so `git-cliff` can classify changes, and match that style in PR
    > titles so CI passes.

5. Create a New Branch

    Give it a meaningful name like `fix-typo-in-docs` or
    `feature-add-dark-theme-toggle`.

6. Make Changes

    - Write clear, concise, and well-documented code.
    - Author slide content as Markdown files in `slides/` and reference them
      from `index.html` with `data-markdown`.
    - Put style overrides in `css/custom.css` and custom behavior in
      `js/custom.js` rather than editing the vendored reveal.js files under
      `node_modules/`.
    - Update `README.md` or `docs/` when you change behavior or add options.
    - **Keep changes atomic and focused**: one type of change per commit
      (e.g., do not mix refactoring with feature addition).

7. Test Your Changes

    Run the smoke test and make sure the production build succeeds:

    ```shell
    npm test
    npm run build
    ```

    Then check the result in a browser—both the live-reload dev server and the
    built output:

    ```shell
    npm start      # http://localhost:8000 with live reload
    npm run preview  # serves dist/ after npm run build
    ```

    For presentation changes, please also verify:

    - Slides render correctly in the overview (`ESC`) and speaker view (`S`).
    - PDF export still works (append `?print-pdf` to the URL and print).
    - The layout holds up at a narrow window width.

8. Open a Pull Request

    Clearly describe the motivation and scope of your change. Link it to the
    relevant issue if applicable. The pull request titles should match the
    [Conventional Commits spec](https://www.conventionalcommits.org/).

<!-- prettier-ignore-end -->

## Commit Message Guidelines

**Why this matters:** Our changelog is automatically generated from commit
messages using git-cliff. Commit messages must follow the Conventional Commits
format and adhere to strict rules.

### Rules

<!-- prettier-ignore-start -->

1. **One type of change per commit**

    - Do not mix different types of changes (e.g., bug fixes, features, refactoring) in a single commit.
    - Example: if you restyle the theme AND add a new slide, make two separate commits.

2. **Descriptive and meaningful messages**

    - Describe _what_ changed and _why_, not just _what_ was edited.
    - Avoid vague messages like "fix bug" or "update code";
      instead use "fix: keep code blocks from overflowing on narrow screens" or "feat: add KaTeX macros for common symbols".

3. **Follow Conventional Commits format**

    - All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) standard.
    - Format: `<type>(<scope>): <subject>`
    - Allowed types:
        - build: Changes that affect the build system or external dependencies
        - ci: Changes to our CI configuration files and scripts
        - docs: Documentation only changes
        - feat: A new feature
        - fix: A bug fix
        - perf: A code change that improves performance
        - refactor: A code change that neither fixes a bug nor adds a feature
        - style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
        - test: Adding missing tests or correcting existing tests
    - Example:

        ```text
        feat(slides): add a speaker-notes example to the features deck

        This commit documents reveal.js speaker notes directly in the template
        so new users can discover the feature from the default presentation.
        ```

    - PR titles are checked automatically in the **semantic-pr-title** workflow.

<!-- prettier-ignore-end -->

### Examples

✅ **Good commits:**

```text
feat(theme): add a paper palette with blue and gold accents
fix(build): copy KaTeX fonts into dist/
docs(readme): update installation instructions for clarity
refactor(gulpfile): extract the asset copy list into a constant
```

❌ **Bad commits:**

```text
fixed stuff
wip: many changes
update code
more fixes (no type/scope)
```

## 💡 Tips

- Be kind and constructive in your communication.
- Keep PRs focused and atomic—smaller changes are easier to review.
- Document new features and update existing docs if needed.
- Tag your PR with relevant labels if you can.

## Security Issues

Please do **not** report security vulnerabilities through public issues or pull
requests. Follow the process described in [SECURITY.md](SECURITY.md) instead.

## Licensing

By contributing, you agree that your contributions will be licensed under the
project’s 3-Clause BSD License.

---

Thanks again for being part of the `presentation-template` community!
