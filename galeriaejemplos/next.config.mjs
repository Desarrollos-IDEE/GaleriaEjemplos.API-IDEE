export default {
    output: 'standalone', // REQUIRED for Docker standalone copy
    devIndicators: false,
    // distDir: 'build',
    assetPrefix: '/galeriaejemplos', // ⚠️ EXTREMELY IMPORTANT WHEN DEPLOYING TO PRODUCTION, STATICS MUST BE DIRECTED TO THE VIEWER REGISTERED PATH
    basePath: '/galeriaejemplos',
    allowedDevOrigins: ['10.67.33.20'],
    reactStrictMode: false,
};