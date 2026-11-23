const test = require('node:test');
const assert = require('node:assert/strict');

const db = require('../models');
const Application = require('../app');

let server;
let baseUrl;

test.before(async () => {
    await db.sequelize.authenticate();
    const app = new Application(db).getApp();

    await new Promise((resolve) => {
        server = app.listen(0, '127.0.0.1', resolve);
    });

    baseUrl = `http://127.0.0.1:${server.address().port}`;
});

test.after(async () => {
    if (server) {
        await new Promise((resolve, reject) => {
            server.close((error) => error ? reject(error) : resolve());
        });
    }
    await db.sequelize.close();
});

test('GET /api/authors returns authors', async () => {
    const response = await fetch(`${baseUrl}/api/authors`);
    assert.equal(response.status, 200);

    const authors = await response.json();
    assert.ok(Array.isArray(authors));
    assert.ok(authors.length > 0);
});

test('GET /api/authors/:id includes articles', async () => {
    const response = await fetch(`${baseUrl}/api/authors/1`);
    assert.equal(response.status, 200);

    const body = await response.json();
    assert.ok(body.author);
    assert.ok(Array.isArray(body.author.articles));
});

test('GET /api/authors/:id returns 404 for missing author', async () => {
    const response = await fetch(`${baseUrl}/api/authors/999999`);
    assert.equal(response.status, 404);
});

test('GET /api/authors/:id returns 400 for invalid id', async () => {
    const response = await fetch(`${baseUrl}/api/authors/abc`);
    assert.equal(response.status, 400);
});

test('GET /api/articles/:slug includes author', async () => {
    const response = await fetch(`${baseUrl}/api/articles/introduction-to-ahtanga`);
    assert.equal(response.status, 200);

    const body = await response.json();
    assert.ok(body.article.author);
});

test('unknown route returns 404', async () => {
    const response = await fetch(`${baseUrl}/unknown-route`);
    assert.equal(response.status, 404);

    const body = await response.json();
    assert.equal(body.message, 'Route not found');
});
