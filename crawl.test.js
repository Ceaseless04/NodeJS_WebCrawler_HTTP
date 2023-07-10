const { normalizeURL, getURLsFromHTML } = require('./crawl.js');
const { test, expect } = require('@jest/globals');


test('normalizeURL strip protocol', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test('normalizeURL strip trailing slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test('normalizeURL capatilize', () => {
    const input = 'https://BLOG.boot.dev/path/'
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test('normalizeURL strip http', () => {
    const input = 'http://blog.boot.dev/path/'
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML absolute', () => {
    const input_HTML_Body = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `;

    const input_Base_URL = "https://blog.boot.dev/path/";
    const actual = getURLsFromHTML(input_HTML_Body, input_Base_URL);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML relative', () => {
    const input_HTML_Body = `
    <html>
        <body>
            <a href="/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `;

    const input_Base_URL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(input_HTML_Body, input_Base_URL);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
});