## Pull Request Info - SDK Docs Consolidation

Jira ticket: https://jira.mongodb.org/browse/DOCSP-NNNNN

*Staged Page*

- [PAGE_NAME](https://docs-mongodbcom-staging.corp.mongodb.com/realm/docsworker-xlarge/BRANCH_NAME/)

*Page Source*

Add links to every SDK's pages where you got the SDK-specific information:

- [PAGE_NAME](https://www.mongodb.com/docs/atlas/device-sdks/LIVE-DOCS-LINK)

### PR Author Checklist

Before requesting a review for your PR, please check these items:

- [ ] Did you open the PR against the `feature-consolidated-sdk-docs` branch instead of master? 
- [ ] Did you tag pages appropriately?
  - genre
  - meta.keywords
  - meta.description
- [ ] Did you update Realm naming and the language around persistence layer/local/device per [this document](https://docs.google.com/document/d/126OczVxBWAwZ4P5ZsSM29WI3REvONEr1ald-mAwPtyQ/edit?usp=sharing)?
- [ ] Have you created new consolidated SDK ref targets starting with "_sdks-" for relevant sections on the page?
- [ ] Did you remove or update any SDK-specific refs to use the new consolidated SDK ref targets?
- [ ] Did you [update any Kotlin API links](https://jira.mongodb.org/browse/DOCSP-32519) to use the new Kotlin SDK roles?
- [ ] Does every shared code box have snippets or placeholders for all 9 languages?
- [ ] Does every API description section have API details or a generic placeholder for all 9 languages?
- [ ] Have you checked related pages for any relevant content we should include on the consolidated page?
- [ ] Do all new include files comply with [the naming guidelines](https://docs.google.com/document/d/1h8cr66zoEVeXytVfvDxlCSsUS5IZwvUQvfSCEXNMpek/edit#heading=h.ulh8b5f2hu9)?
- [ ] Did you add tickets to the relevant SDK: Consolidation Gaps epic to add missing code examples?

### Reviewer Checklist

As a reviewer, please check these items:

- [ ] Do all of the shared code example boxes contain language-specific snippets or placeholders for every language?
- [ ] Do all API reference details contain working API reference links or generic content?
- [ ] Has all of the Realm naming/language been updated?
- [ ] Is all relevant content from the individual SDK pages present on the consolidated page?
