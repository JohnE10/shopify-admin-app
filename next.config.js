// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// }

// module.exports = nextConfig

// // --- the code above is what was originally in this file ---

module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/dogs",
        destination: "https://meowfacts.herokuapp.com",
      },
    ];
  };
  return {
    rewrites,
  };
};