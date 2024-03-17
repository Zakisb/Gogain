import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/auth/login",
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default withNextIntl(nextConfig);
