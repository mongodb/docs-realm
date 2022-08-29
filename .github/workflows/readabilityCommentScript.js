module.exports = async ({ github, context }) => {
  // Build header
  const { SHA } = process.env;
  const readabilityTag = '<span id="readability-score-comment"></div>';
  const header = `${readabilityTag}Commit Hash: ${SHA}
  You can see any previous Readability scores (if they exist) by looking
  at the comment's history.
  ---

  `;

  // Create post body with header
  const fs = require("fs");
  let body = fs.readFileSync("${{github.workspace}}/scores.md", "utf8");
  body = header + body;

  // Set up
  const owner = context.repo.owner;
  const repo = context.repo.repo;
  const issue_number = Number(
    fs.readFileSync("${{github.workspace}}/issue_number", "utf8")
  );

  // Update or create readability comment
  const comments = await octokit.rest.issues.listComments({
    owner,
    repo,
    issue_number,
  });
  const readabilityComment = comments.find((comment) =>
    comment.body.contains(readabilityTag)
  );
  const comment_id = readabilityComment.id;
  if (readabilityComment) {
    await github.rest.issues.updateComment({
      owner,
      repo,
      issue_number,
      comment_id,
      body,
    });
    console.log("Updated comment with readability score!");
  } else {
    await github.rest.issues.createComment({
      issue_number,
      owner,
      repo,
      body,
    });
    console.log(`Created a new readability comment!`);
  }
};
