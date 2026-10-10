---
name: independent-code-review
description: Objective review procedures, regression checklists, token integrity audits, and approval gating rules.
---

# Independent Code Review & Regression Analysis Skill

## 1. Purpose
Provides objective review criteria, anti-pattern checklists, and verification gates before approving transitions between workflow phases.

## 2. Review Checklist
1. **Token Discipline**: Does the code use any hardcoded color/spacing/shadow values instead of `--cl-*` tokens?
2. **Layer Discipline**: Are all new component CSS rules wrapped in `@layer cl-components`?
3. **Ref & DOM Forwarding**: Does the component forward ref cleanly? Are private props filtered from the DOM?
4. **Test Completeness**: Are all 7 test categories covered? Did `axe()` pass with 0 violations?
5. **No Breaking Changes**: Are all existing public interfaces and props preserved?
6. **Empirical Evidence**: Did the reviewer run and inspect actual command outputs?

## 3. Review Gate Rule
An implementation task is not marked complete based on self-assertion. The Independent Reviewer must independently execute validation commands and confirm test and build integrity.
