## Pull Request Info - SDK Docs Consolidation

Jira ticket: https://jira.mongodb.org/browse/DOCSP-NNNNN

### Staging Links
<!-- start insert-links -->
-
<!-- end insert-links -->

*Page Source*

Add links to every SDK's pages where you got the SDK-specific information:

- [PAGE_NAME](https://www.mongodb.com/docs/atlas/device-sdks/LIVE-DOCS-LINK)

### PR Author Checklist

Before requesting a review for your PR, please check these items:

- [ ] Open the PR against the `feature-consolidated-sdk-docs` branch instead of `master`
- [ ] Tag the consolidated page for:
  - genre
  - meta.keywords
  - meta.description

#### Naming
- [ ] Update Realm naming and the language around persistence layer/local/device per [this document](https://docs.google.com/document/d/126OczVxBWAwZ4P5ZsSM29WI3REvONEr1ald-mAwPtyQ/edit?usp=sharing)
- [ ] Include `.rst` files comply with [the naming guidelines](https://docs.google.com/document/d/1h8cr66zoEVeXytVfvDxlCSsUS5IZwvUQvfSCEXNMpek/edit#heading=h.ulh8b5f2hu9)

#### Links and Refs
- [ ] Create new consolidated SDK ref targets starting with "_sdks-" for relevant sections
- [ ] Remove or update any SDK-specific refs to use the new consolidated SDK ref targets
- [ ] [Update any Kotlin API links](https://jira.mongodb.org/browse/DOCSP-32519) to use the new Kotlin SDK roles

#### Content
- [ ] Shared code boxes have snippets or placeholders for all 9 languages
- [ ] API description sections have API details or a generic placeholder for all 9 languages
- [ ] Check related pages for relevant content to include
- [ ] Create a ticket for missing examples in each relevant SDK: Consolidation Gaps epic

### Reviewer Checklist

As a reviewer, please check these items:

- [ ] Shared code example boxes contain language-specific snippets or placeholders for every language
- [ ] API reference details contain working API reference links or generic content
- [ ] Realm naming/language has been updated
- [ ] All relevant content from individual SDK pages is present on the consolidated page
