/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
    webpack: (config) => {
      return config; // ✅ Keep Webpack unmodified to prevent issues
    },
  };
  
  export default nextConfig;
  