# @scalemule/embed-token

Server-side token signing utility for ScaleMule Gallop video embeds.

## Install

```bash
npm install @scalemule/embed-token
```

## Usage

```ts
import { signEmbedToken } from '@scalemule/embed-token'

const token = signEmbedToken({
  secret: process.env.GALLOP_EMBED_SECRET!,
  videoId: 'vid_123',
  applicationId: 'app_456',
  allowedOrigins: ['https://app.example.com'],
  viewerId: 'user_789',
})
```

## Notes

- Runs server-side only.
- No network calls are made by this package.

## License

MIT
