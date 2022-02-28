exports = async function sendCommunityReport(changeEvent) {
  const report = changeEvent.fullDocument;
  
  const projectName = `${report.owner}/${report.repo}`;
  
  const moment = require("moment");
  const formattedDate = moment(report.date).utc().format("MMMM Do, YYYY");
  
  const message = [
    `# Community contributions to ${projectName} since ${formattedDate}`,
    `Last week, there was activity on ${numIssuesWithActivity} issues and pull requests.`,
    `We had ${numContributors} people contribute, including ${numNewContributors} first time contributors.`,
  ].join("\n");
  
  console.log(message);
};
