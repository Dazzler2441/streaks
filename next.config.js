import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const config = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

export default config; 