# Reviewing Guidelines for the MongoDB Realm Documentation

Realm Docs contributions typically go through two sets of reviewers:
a **copy edit**, which focuses on structure and wording, and a
**technical review**, which addresses code snippets and the technical
correctness of prose.

## Technical Review

A **technical review** consists of reviewing the technical accuracy and
completeness of a docs PR (Pull Request) and correcting it if necessary.
If a writer of an article wants someone else to check the technical
content of an article, the writer contacts a specific engineer to
perform the technical review.

### What to Review

- Code snippets
- Technical claims, e.g. ("To create a `Foo`, use the `Bar.createFoo()` method")
- Missing "footguns", i.e. potential pitfalls that could trip up users
  who try to follow the documentation.

### What Not to Review

- Wording of sentences: while suggestions are appreciated, PRs
  that have reached the technical review stage have already passed copy
  editing. Copy edits are out of scope of technical reviews, unless they
  directly relate to a technical claim.
- Structure of the page: as with wording, structural changes are out of
  scope and should never block approval of a technical review.
- Any lines of the page that have not been touched in the PR,
  unless they refer to content that has changed as a result of the PR or
  fall within the scope of the PR's related JIRA ticket. If you do notice
  an issue with content that's outside of the JIRA ticket's scope, the
  docs team would very much appreciate if you could bring it up in the
  #docs-realm Slack channel or file a JIRA ticket capturing the issue.
