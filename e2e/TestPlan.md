# Tails & Tales Selenium UI Test Plan

## Objective

Verify core pet diary workflows in Chrome against the React frontend, Express API, and a dedicated PostgreSQL database with pgvector. Keep component behavior covered by Vitest and measure semantic search quality with the existing offline evaluation.

## Phase 1 — Core smoke coverage


| ID     | Scenario                       | Setup and action                                                                                                                                    | Expected result                                                                                | Status  |
| ------ | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------- |
| UI-01  | Sign in, refresh, and sign out | Sign in with a seeded account and refresh the diary list. Sign out and revisit the diary URL.                                                       | The session survives refresh. After sign-out, the protected diary is inaccessible.             | Planned |
| UI-02a | Edit and persist               | Open a prepared diary entry in Chrome, change its title and story, save, and refresh. Restore the original values during cleanup and refresh again. | Both edits persist after refresh. Cleanup restores both original values.                       | Passed  |
| UI-02b | Create and persist             | Seed an account and pet. Create a uniquely titled entry, refresh the list, and open the new entry.                                                  | The entry remains in the list and opens with the submitted title and story.                    | Planned |
| UI-02c | Delete and persist             | Seed an account, pet, and diary entry. Open the entry, confirm deletion, and refresh the list.                                                      | The deleted entry remains absent from the list.                                                | Planned |
| UI-03  | Filter entries by date         | Seed two entries on different dates in the same month. Select one of those dates, then click **All dates**.                                         | Only the selected date's entry appears while filtered. Clearing the filter shows both entries. | Planned |

## Phase 2 — Editing, accounts, and pets

UI-02a and UI-07 passed locally before the shared-helper refactor. Fix the UI-02a import and driver scope and rerun both scripts before implementing **UI-08**.

| ID    | Scenario                        | Setup and action                                                                                                                    | Expected result                                                                                             | Status                      |
| ----- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------- |
| UI-07 | Cancel an edit                  | Change the title and story of a prepared entry. Click **Cancel**, check both fields immediately, then refresh and check them again. | Both original values return before refresh and remain afterward.                                            | Implemented (rerun pending) |
| UI-08 | Recover from a failed save      | Edit a seeded entry. Configure one update request to fail, then retry with the normal API response.                                 | The page shows an error and retains both draft fields. The retry succeeds and both changes survive refresh. | Planned (next)              |
| UI-04 | Reject an invalid sign-in       | Enter a valid test email with the wrong password.                                                                                   | The page shows an error and the session stays signed out.                                                   | Planned                     |
| UI-05 | Register with a first pet       | Register with a unique email and provide the first pet's details. Refresh the diary page.                                           | Registration signs the user in and the new pet is still selected or available after refresh.                | Planned                     |
| UI-06 | Switch pets                     | Seed two pets under one account with distinct diary entries. Switch between them.                                                   | The list shows the selected pet's entries each time.                                                        | Planned                     |
| UI-09 | Protect another account's entry | Set up two accounts. Sign in as one and open the other account's entry URL.                                                         | The other account's entry content is inaccessible.                                                          | Planned                     |

## Phase 3 — Calendar, search, and AI

| ID    | Scenario                                   | Setup and action                                                                                      | Expected result                                                                                     | Status  |
| ----- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------- |
| UI-10 | Navigate months and return to today        | Navigate to a different month and select a date with a seeded entry. Click **Today**.                 | The selected date shows its entry. **Today** returns to the current month and selects today's date. | Planned |
| UI-11 | Combine semantic search and date filters   | Return two controlled search matches on different dates. Select one date, then click **All dates**.   | The date filter narrows the matches. Clearing it restores both matches and preserves the search.    | Planned |
| UI-12 | Display and retain a diary Q&A answer      | Submit a question with a delayed, fixed response. Close and reopen the chat after the answer arrives. | The loading state appears, the answer renders, and the exchange remains visible after reopening.    | Planned |
| UI-13 | Recover from a diary Q&A error             | Return a controlled error for the first question and a fixed answer for the next one.                 | The error is visible and the next answer renders successfully.                                      | Planned |
| UI-14 | Display a title suggestion and translation | Request a title suggestion and a translation using separate fixed responses.                          | Each result appears in the corresponding UI.                                                        | Planned |

## Execution and troubleshooting

- Start with local Chrome. Use headless Chrome when enabling the CI smoke test.
- Give each case its own test data and a fresh browser session. Use a disposable PostgreSQL database and clean up fixture rows after the test.
- Use the real API and database for account and diary persistence. Use controlled responses for AI, search UI, and simulated errors.
- Wait for visible conditions such as save confirmation or a rendered entry. Use stable locators and verify persistence by refreshing before checking field values.
- Before marking a case **Passing locally**, run it independently and repeat it from clean test data. On failures, record the test ID, failing assertion, and current URL. Capture a screenshot when a browser session is available.
