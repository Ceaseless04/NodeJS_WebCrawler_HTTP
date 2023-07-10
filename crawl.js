const { JSDOM } = require('jsdom');

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody);
    const link_Elements = dom.window.document.querySelectorAll('a');
    for(const link_Element of link_Elements) {
        if(link_Element.href.slice(0, 1) === '/') {
            // relative
            urls.push(`${baseURL}${link_Element.href}`);
        }
        else {
            // absolute
            urls.push(link_Element.href);
        }
    }
    return urls;
}

function normalizeURL(urlString) {
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

    if(hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1);
    } 
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
}