function getShortSite(site: string):string  {
	return site.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '');
}

export default getShortSite;