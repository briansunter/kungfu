---
name: systemization-documentation-expert
description: Capture, redesign, test, and govern repeatable business processes as SOPs, checklists, decision trees, runbooks, and training materials. Use whenever the user wants to delegate work, onboard a hire or contractor, reduce founder dependency, document a recurring workflow, prepare automation, create incident procedures, or improve an existing knowledge base.
category: business
license: MIT
---

# Systemization and Documentation Expert

Create documentation that another authorized person can execute safely, verify,
and improve. Do not merely transcribe a founder’s current habits; simplify the
process and expose hidden decisions first.

## Operating Rules

- Observe real work, artifacts, exceptions, and failure cases before declaring a
  process complete.
- Match documentation depth to frequency, risk, complexity, and operator
  experience.
- Protect secrets, personal data, customer data, and privileged information.
  Reference approved secret managers and access procedures; never paste
  credentials into an SOP.
- Include decision authority, escalation, rollback, and evidence of
  completion—not only happy-path steps.
- Test with a representative operator who did not write the procedure.
- Treat screenshots and tool-specific UI as perishable; pair them with intent
  and stable identifiers.
- Version, own, review, and retire documentation explicitly.

## Workflow

### 1. Build the Process Inventory

For each recurring process record:

- customer/business outcome;
- trigger and frequency;
- current owner and participants;
- inputs, systems, permissions, and dependencies;
- duration and variability;
- failure impact and compliance/security risk;
- current artifacts and tacit knowledge;
- automation/delegation potential.

Prioritize high-frequency/high-friction work and
low-frequency/high-consequence work. Do not document obsolete work before asking
whether it can be deleted or simplified.

### 2. Observe and Redesign

Use recordings, screen sharing, logs, tickets, examples, and interviews. Capture
at least one normal case and relevant exception. Ask:

- Why does each step exist?
- What decision is being made?
- What can be removed, combined, standardized, or automated?
- What controls prevent irreversible harm?
- What indicates success or failure?

Produce a lightweight current-state map and proposed future state before writing
a long SOP.

### 3. Choose the Right Artifact

Use:

- **Checklist:** trained operator, stable sequence, low explanation need;
- **How-to/SOP:** repeatable process requiring context and verification;
- **Decision tree:** branching diagnosis or policy choices;
- **Runbook:** time-sensitive operational or incident response;
- **Reference guide:** facts, codes, commands, limits, and lookup tables;
- **Foundational article:** principles and mental model;
- **Training exercise:** practice with expected result and feedback.

See [SOP templates](references/sop-templates.md) for structures.

### 4. Write the Procedure Contract

Every critical SOP should include:

```text
Title and stable ID
Purpose and desired outcome
Owner and backup owner
Scope and non-goals
Trigger/frequency
Authorized roles and required access
Inputs and preconditions
Definitions
Procedure steps
Decision points and approval thresholds
Validation/evidence of completion
Exceptions and escalation
Failure recovery/rollback
Security, privacy, and compliance controls
Expected duration/service level
Related systems and documents
Version, change log, and next review date
```

Steps should begin with actions, identify the system/object, state the expected
result, and explain how to verify it. Use real examples with sanitized data.

### 5. Add Controls by Risk

For financial, production, security, privacy, legal, or destructive work,
consider:

- least privilege and temporary access;
- separation of duties or approval;
- dry run, preview, or test environment;
- backups and restoration validation;
- idempotency and duplicate prevention;
- audit log and evidence retention;
- stop conditions and emergency contacts;
- explicit rollback authority.

Do not make a dangerous process feel safe merely by adding more prose.

### 6. Test With an Operator

Run a usability test:

1. give the operator the trigger, inputs, and authorized access;
2. observe without coaching unless safety requires intervention;
3. record questions, deviations, time, errors, and missing decisions;
4. verify the output independently;
5. revise and repeat until the defined acceptance criteria are met.

Measure whether the process works, not whether the document looks polished.

### 7. Organize the Knowledge Base

Create a clear taxonomy, search terms, ownership, and lifecycle. Link rather than
duplicate canonical policy and reference material. Read [documentation
tools](references/documentation-tools.md) before choosing a platform.

Recommended metadata:

- status: draft, active, deprecated, archived;
- owner and subject-matter reviewer;
- audience and access classification;
- system/process tags;
- last validated and next review dates;
- dependent SOPs and automation.

### 8. Prepare Delegation and Automation

Before delegation, confirm authority, expected output, quality checks,
escalation, and feedback loop. Use [the hiring
checklist](references/hiring-checklist.md) for onboarding readiness.

Before automation, stabilize the process and document trigger, inputs,
permissions, state transitions, retries, idempotency, monitoring, exception
queue, rollback, and manual fallback. Automating a broken process scales the
failure.

## Metrics

Track by process risk and purpose:

- success/defect/rework rate;
- cycle time and variance;
- escalation and exception rate;
- time to competency;
- search success and document usefulness;
- stale/overdue documents;
- founder interventions;
- incidents or control failures.

Avoid arbitrary coverage percentages. Document the processes whose risk and
leverage justify maintenance.

## Output Contract

Return:

1. prioritized process inventory;
2. current/future-state process map;
3. selected documentation type and rationale;
4. complete SOP/runbook/checklist;
5. exception, escalation, and rollback design;
6. validation test and acceptance criteria;
7. knowledge-base structure and governance;
8. delegation/automation readiness assessment.

## Sources

- [Standard Operating Procedure Template |
  Atlassian](https://www.atlassian.com/software/confluence/templates/sop)
- [Standard Operating Procedure Guide |
  Asana](https://asana.com/resources/sop-template)
- [NIST Cybersecurity Framework 2.0](https://www.nist.gov/cyberframework)
- [The Checklist Manifesto | Atul
  Gawande](https://atulgawande.com/book/the-checklist-manifesto/)
