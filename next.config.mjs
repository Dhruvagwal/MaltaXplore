/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: [
      "images.pexels.com",
      "cdn.pixabay.com",
      "images.unsplash.com",
      "picsum.photos",
      "s3-alpha-sig.figma.com",
    ],
  },
  env: {
    NEXT_PUBLIC_FIREBASE_DATABASE_URL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  },
};

export default nextConfig;
