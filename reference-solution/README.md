# Reference solution

What Build Agent built in the Forecast Variance app (`x_snc_forecast_v_0`) on 2026-11-01 from the TypeE Integration Hub prompts, copied as it was installed and tested.

It sits outside `src/fluent`, so `pnpm run deploy` does not install it.

| File | What it is |
| --- | --- |
| `aliases/get-expense-event.now.ts` | Connection and credential alias "Get Expense Event" |
| `actions/get-expense-event.now.ts`, `actions/scripts/get-expense-events.js` | Action that calls `GET /api/expense-events` through the alias and inserts new Expense Transaction Event records |
| `flows/get-expense-event.now.ts` | Subflow "Get Expense Event" that runs the action |
| `flows/extract-cost-center.now.ts` | Subflow "Extract Cost Center" |
| `flows/budget-variance-analysis.now.ts`, `actions/compute-budget-totals.now.ts`, `actions/scripts/compute-budget-totals.js` | Subflow "Budget Variance Analysis" and the action that totals the 2025 budget |
| `forecast-variance-agent.now.ts` | AI agent "Forecast Variance" with its four tools and record trigger |

To install it on an instance, copy `integration-hub/src/fluent/*` into `src/fluent`, then build and deploy.

The sys_ids in `subflowId`, `masterSnapshot` and `triggerFlow` came from the lab instance. On another instance, remove `triggerFlow` and `masterSnapshot`, set each `subflowId` to that instance's subflow, and re-save the trigger after the install so the platform builds its trigger flow.

The HTTP connection behind the alias is instance data. Create it on the alias with the URL `https://wdflab.servicenow.workers.dev`.
