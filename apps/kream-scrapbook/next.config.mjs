/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kream-phinf.pstatic.net",
      },
    ],
  },
};

export default nextConfig;
