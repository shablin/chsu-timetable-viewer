const WHITELIST = [
    "chsu.ru"
]

function blockLinks() {
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        const href = link.href.toLowerCase();
        const text = link.href.toLowerCase();

        const isInWhitelist = WHITELIST.some(item => href.includes(item) || text.includes(item));

        if (!isInWhitelist) {
            link.style.pointerEvents = 'none';
        }
    });
}

blockLinks();

const observer = new MutationObserver(() => blockLinks());
observer.observe(document.body, { childList: true, subtree: true })