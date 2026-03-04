const test = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');
const { signEmbedToken } = require('../dist/index.js');

test('signEmbedToken includes iat and expiration claims', () => {
  const secret = 'test-secret';
  const token = signEmbedToken({
    secret,
    videoId: 'video_123',
    applicationId: 'app_456',
    expiresIn: 600,
    allowedOrigins: ['https://app.example.com'],
    viewerId: 'viewer_789',
    sessionId: 'session_abc',
  });

  const claims = jwt.verify(token, secret, { algorithms: ['HS256'] });

  assert.equal(claims.vid, 'video_123');
  assert.equal(claims.app, 'app_456');
  assert.equal(claims.sub, 'viewer_789');
  assert.equal(claims.ses, 'session_abc');
  assert.deepEqual(claims.org, ['https://app.example.com']);
  assert.equal(typeof claims.iat, 'number');
  assert.equal(typeof claims.exp, 'number');
  assert.equal(claims.exp - claims.iat, 600);
});
