# Reviewing Guidelines for the MongoDB Realm Documentation

The MongoDB Realm Docs Team (a part of the Developer Education Team) produces
documentation for MongoDB Realm using JIRA and GitHub. Here's what the
process looks like:

1. A request for documentation comes in, either on Slack, through a Docs
   Team idea, or through a JIRA ticket or JIRA workflow, like the
   `docs-needed` tag.

2. The Realm Docs team triages the ticket, scoping out acceptance criteria
   and priority. The ticket is assigned an epic and prioritized based on
   that epic's scheduling.

3. A Realm Docs team member picks up the ticket in a sprint and creates
   the requested docs content. They open a PR to merge the new or updated
   content into the `docs-realm` repo that stores the docs-as-code content
   of the Realm Documentation.

4. Another Docs team member performs a **copy edit** of the PR.

5. When the **copy editor** approves the PR, the PR moves to the
   **technical review** stage if technical content has changed in a way
   that requires a technical eye (for instance, renaming a page or fixing
   a typo does not require a technical review). The Realm Docs team member
   who opened the PR reaches out to a Realm engineer with relevant technical
   experience to the content of the PR.

6. When the **technical reviewer** approves the PR,
   the ticket is ready for merge. The Realm Docs team member who opened
   the PR can squash and merge the PR into the `master` branch of
   `docs-realm` whenever content is ready for release (if a PR describes
   an as-of-yet unreleased feature, the PR remains open until the
   feature is released).

7. Once the content is merged, the Realm Docs team deploys the changes to
   [docs.mongodb.com/realm](https://docs.mongodb.com/realm/).

## Copy Edits

A **copy edit** of a docs PR consists of reviewing the structure, wording
and flow of a docs PR and correcting it if necessary.

### What to Review

- Wording
- Page Structure
- Snooty Autobuilder build errors and warnings
- Altered or added Example App tests (if any have changed, CI should
  automatically run)
- Technical content from a "looks correct" perspective, since technical
  review should address deeper concerns
- Whether or not the PR fulfills the Acceptance Criteria described in the
  linked JIRA ticket.

### What not to Review

Very little is completely off-limits to a copy edit of a PR -- if you
notice a technical issue, it's best to call it out early than to waste
an engineer's time fixing something that anybody could notice. However,
copy editors should constrain their reviews to only content within the
scope of the JIRA ticket.

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

### What not to Review

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
