const WHITELIST = [
    "chsu.ru"
]

function blockLinks() {
    const links = document.querySelectorAll('a');
    console.info(`found ${links.length} links total`)

    links.forEach(link => {
        const href = link.href.toLowerCase();
        const text = link.href.toLowerCase();

        const isInWhitelist = WHITELIST.some(item => href.includes(item) || text.includes(item));

        if (!isInWhitelist) {
            link.style.pointerEvents = 'none';
            console.info("pointerEvents prevented for:", link.href)
        }
    });
}

blockLinks();

const observer = new MutationObserver(() => blockLinks());
observer.observe(document.body, { childList: true, subtree: true })