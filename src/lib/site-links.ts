export const repoUrl = 'https://github.com/hnamhocit/hndb-desktop'
export const releaseRepo = {
	owner: 'hnamhocit',
	repo: 'hndb',
} as const
export const releaseRepoUrl = `https://github.com/${releaseRepo.owner}/${releaseRepo.repo}`

export const siteLinks = {
	about: '/about',
	blog: '/blog',
	issues: `${repoUrl}/issues`,
	featureRequest: `${repoUrl}/issues/new?title=%5BFeature%20Request%5D%20`,
	website: 'https://hnamhocit.vercel.app',
	email: 'mailto:hnamhocit@gmail.com',
	docs: 'https://www.hndb.space/docs',
	releases: `${releaseRepoUrl}/releases`,
} as const
