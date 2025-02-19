module.exports = async ({ github, context, imageId }) => {
  const varName = context.ref.replaceAll("/", "_").toUpperCase();
  const repoVars = await github.rest.actions.listRepoVariables({
    owner: context.repo.owner,
    repo: context.repo.repo,
  });
  const commentId = repoVars.data.variables.find(
    (v) => v.name === varName
  )?.value;
  if (commentId) {
    await github.rest.issues.deleteComment({
      comment_id: Number(commentId),
      owner: context.repo.owner,
      repo: context.repo.repo,
    });
    const { data } = await github.rest.issues.createComment({
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
      body: `The Docker image ID for this build is: ${imageId}`,
    });
    await github.rest.actions.updateRepoVariable({
      owner: context.repo.owner,
      repo: context.repo.repo,
      name: varName,
      value: data.id.toString(),
    });
  } else {
    const { data } = await github.rest.issues.createComment({
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
      body: `The Docker image ID for this build is: ${imageId}`,
    });
    await github.rest.actions.createRepoVariable({
      owner: context.repo.owner,
      repo: context.repo.repo,
      name: varName,
      value: data.id.toString(),
    });
  }

  return true;
};
