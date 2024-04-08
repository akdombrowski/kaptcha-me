/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.postimg.cc",
        pathname: "/DzjCwcwW/race-Track.webp",
      },
    ],
  },
};

module.exports = nextConfig;
