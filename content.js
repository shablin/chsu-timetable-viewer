const WHITELIST = [
    "chsu.ru"
]

const GARBAGE_SELECTORS = [
	"header.pc",
	"#bx_breadcrumb_0",
	".footer__top_content",
	".footer_contacts:nth-child(2)",
	".right_col",
	".separator"
]

const IS_WHITELIST_MODE = true
const IS_CLEANER_MODE = true
const IS_GLOB_USERSELECT_BLOCK = true

function getLinksFromPage() {
	const links = document.querySelectorAll('a')
	console.log('[chsu-timetable-viewer]: found', links.length, 'links total')
	return links
}

function blockLink(links, whitelist) {
	links.forEach(link => {
		const href = link.href.toLowerCase()
		const isAllowedLink = whitelist.some(i => href.includes(i))
		
		if (!isAllowedLink) {
			link.style.pointerEvents = 'none'
			console.log('[chsu-timetable-viewer]:', 'pointerEvents prevented for:', link.href)
		}
	})
}

function getElementsBySelector(selectors) {
	return selectors
		.map(s => document.querySelector(s))
		.filter(el => el !== null)
}

function clearPage(elements) {
	elements.forEach(el => {
		el.remove()
		console.log('[chsu-timetable-viewer]: el removed:', el)
	})
}

function blockUserSelectGlob() {
	document.body.style.userSelect = "none"
}


if (IS_WHITELIST_MODE) blockLink(getLinksFromPage(), WHITELIST)
if (IS_CLEANER_MODE) clearPage(getElementsBySelector(GARBAGE_SELECTORS))
if (IS_GLOB_USERSELECT_BLOCK) blockUserSelectGlob()


const observer = new MutationObserver(() => blockLink());
observer.observe(document.body, { childList: true, subtree: true })
