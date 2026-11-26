# Tails & Tales End-to-End Tests

This folder contains the Selenium browser checks for Tails & Tales. 

See [TestPlan.md](TestPlan.md) for planned coverage and individual test statuses.

## Set up the app

1. Install Node.js and Google Chrome.
2. Follow the [project setup instructions](../README.md) to start the React client and Express API with a local PostgreSQL test database that has pgvector enabled. The script uses `http://localhost:5173`. If Vite prints another address, update `baseUrl` in the script.
3. In the running app, register or sign in with a dedicated test account that has a pet. Add a diary entry for that pet with the following values, or update `diaryTitle` and `diaryStory` in the script to match an existing entry.

   | Field | Value                      |
   | ----- | -------------------------- |
   | Title | `Selenium edit fixture`    |
   | Story | `TestDog went for a walk.` |

   Use a unique title and keep it visible in the diary list. The script finds the link by title text and compares the story exactly.

## Run the browser check

From the repository root, enter `e2e/` and install the dependencies.

```sh
cd e2e
npm ci
```

Create `.env.local` in that folder with the credentials of the account you prepared. Replace both example values. Git ignores this file.

```dotenv
E2E_EMAIL=selenium@example.test
E2E_PASSWORD=replace-with-your-test-account-password
```

With the frontend and API running, launch the browser check from `e2e/`.

```sh
npm test
```

A passing run prints `Opened the expected diary and verified its title and story.` Chrome closes when the script finishes.

## Troubleshooting

- If `sendKeys` receives `undefined`, confirm `.env.local` exists and both variable names match the example.
- If the wait for `/entries` times out, try signing in manually against the same local app and check that the API is running.
- If `Expected the diary detail form to open` appears, check the stack trace. The script currently uses that message for both the diary-link wait and the detail-form wait. For the first, confirm the entry is visible under the signed-in pet. For the second, open the same entry manually and confirm the form loads.
