/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    remotePatterns:[{hostname:"event-town-api.onrender.com"},{
      hostname:"picsum.photos"
    },{
      hostname:"example.com"
    }]
  }
};

export default nextConfig;
