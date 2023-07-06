/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,    
  },  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },      
      {
        protocol: "https",
        hostname: "docs.google.com",
        port: "",
      },      
    ],
  },
}

module.exports = nextConfig
