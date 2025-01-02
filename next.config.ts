/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        protocol: "https",
        hostname: "icon-library.com",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack(config: any) {
    config.module.rules.push({
      test: /\.map$/,
      use: 'ignore-loader',
    });
    return config;
  },
};

export default nextConfig;
