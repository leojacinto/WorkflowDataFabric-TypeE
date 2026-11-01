# Troubleshooting: flows and AI agent tools stay Queued

## Symptom

Record-triggered flows, the AI agent trigger and agent tool calls (subflows) sit in state Queued and never start. Scripts run from Build Agent still work.

## Cause

The `flow_engine` queue holds a very large number of `flow.fire` events. On the demo instance a stock timer ("Scheduled Job" flow, Retry Handler Framework, timer trigger `fba91b6cc3f36010092d99ccc840dd04`) fires every 5 seconds and queued about 11,000 contexts a day for months. Your flows wait behind them.

## Check

1. Open `sys_flow_context_list.do?sysparm_query=state=QUEUED` and group by Flow. A single flow with hundreds of thousands of rows is the cause.
2. Open `sysevent_list.do?sysparm_query=name=flow.fire^state=ready` and look at the oldest Created date. Weeks old means the queue is stuck.

## Fix

1. Open the timer trigger record (`sys_flow_timer_trigger.do?sys_id=<sys_id>`), untick Active and save. Do this first, or the queue refills.
2. Do not expect the queue to drain by itself. On the demo instance it held at about 515,000 ready events for 20 minutes, even after raising `com.glide.event_manager.flow_engine.hard_limit` and `claim_limit` from 50 to 500, which changed nothing.
3. Deleting by script is too slow to help at that size. Tested in Scripts - Background (global scope): deleting ready `flow.fire` events by context, in batches of 1,000, removed about 400 events a minute (the delete also removed the matching context rows). That is fine for a backlog of a few thousand, and about 11 hours for 280,000. A bulk `updateMultiple` on `sysevent` changed nothing.
4. Open a Now Support case to purge the `flow_engine` queue, or use a fresh instance for the lab run.

## Notes

- Only do this on a demo instance you own. The timer is a stock ServiceNow record.
- A fresh instance does not have this problem.
- Prove a trigger without the queue by running its flow in the foreground (`sn_fd.FlowAPI.getRunner().flow(name).inForeground()`).
