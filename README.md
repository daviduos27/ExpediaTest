# ExpediaTest this changed to Booking after I created the base fro the freamework

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Install Playwright browsers:**

    ```bash
    npx playwright install
    ```

4.  **Configuration:**
    * Review and configure `playwright.config.ts` as needed (e.g., browser selection, parallel execution settings).
    * Set up any required environment variables (e.g., login credentials) in a `.env` file or through your operating system.

## Running Tests

1.  **Run all tests:**

    ```bash
    npx playwright test
    ```

2.  **Run specific test file:**

    ```bash
    npx playwright test src/tests/hotelSearch.spec.ts
    ```

3.  **Run tests in headed mode:**

    ```bash
    npx playwright test --headed
    ```

4.  **View HTML Report:**

    ```bash
    npx playwright show-report
    ```

5.  **View Allure Report (if configured):**
    * Install Allure CLI if needed.
    * Generate Allure report: `npx allure generate allure-results --clean -o allure-report`
    * Open Allure report: `npx allure open allure-report`

## AI Integration

* **Test Case Generation:**
    * Used ChatGPT to suggest edge cases and refine test scenarios. Documented prompts and AI-generated test cases in `TEST_CASES.md`.
* **Self-Healing Tests:**
    * Leveraged Playwright's auto-healing selectors where applicable.
    * Explored and implemented custom AI-powered locators using external libraries or custom logic (if implemented). Details are provided in the Loom video.
* **AI-Based Test Reporting:**
    * If possible, implemented AI-driven analysis of test execution logs to identify patterns and suggest optimizations. Details are shown in the Loom video and any generated reports.
    * Used AI to create a summary of the test results.

## Loom Video

* A Loom video demonstration is included, showcasing the execution of the automated tests and explaining the AI integration.
* Link to Loom Video: [Insert your Loom video link here]

## Test Cases

* The `TEST_CASES.md` file contains detailed test cases for each user story, including AI-generated suggestions.

