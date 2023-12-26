export function createMessageCard(
  notificationSummary: string,
  notificationColor: string,
  commit: any,
  author: any,
  runNum: string,
  runId: string,
  repoName: string,
  sha: string,
  repoUrl: string,
  timestamp: string
): any {
  const commitMessage: string = commit?.data?.commit?.message
  let avatar_url: string =
    'https://www.gravatar.com/avatar/05b6d8cc7c662bf81e01b39254f88a48?d=identicon'
  let pr: string = ''

  if (author) {
    if (author.avatar_url) {
      avatar_url = author.avatar_url
    }
  }

  if (commitMessage.includes('#')) {
    commit.data.commit.message.split(' ').forEach((data: string) => {
      if (/^#\d+$/.test(data)) {
        pr = data.replace('#', '')
      }
    })
  }

  return {
    '@type': 'MessageCard',
    '@context': 'https://schema.org/extensions',
    summary: notificationSummary,
    themeColor: notificationColor,
    title: notificationSummary,
    sections: [
      {
        activityTitle: `**CI #${runNum} (commit ${sha.substr(
          0,
          7
        )})** on [${repoName}](${repoUrl})`,
        activityImage: avatar_url,
        activitySubtitle: `by ${commit.data.commit.author.name} [(@${author.login})](${author.html_url}) on ${timestamp}`
      }
    ],
    potentialAction: [
      {
        '@context': 'http://schema.org',
        target: [`${repoUrl}/pull/${pr}`],
        '@type': 'ViewAction',
        name: '개발 사항'
      },
      {
        '@context': 'http://schema.org',
        target: [commit.data.html_url],
        '@type': 'ViewAction',
        name: '코드변경 내역'
      },
      {
        '@context': 'http://schema.org',
        target: [`${repoUrl}/actions/runs/${runId}`],
        '@type': 'ViewAction',
        name: 'Workflow 확인'
      }
    ]
  }
}
