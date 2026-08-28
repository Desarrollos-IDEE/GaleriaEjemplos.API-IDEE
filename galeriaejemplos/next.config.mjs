export default {
    output: 'standalone', // REQUIRED for Docker standalone copy
    devIndicators: false,
    // distDir: 'build',
    assetPrefix: '/GaleriaEjemplos_API-IDEE', // ⚠️ EXTREMELY IMPORTANT WHEN DEPLOYING TO PRODUCTION, STATICS MUST BE DIRECTED TO THE VIEWER REGISTERED PATH
    basePath: '/GaleriaEjemplos_API-IDEE',
    allowedDevOrigins: ['10.67.33.20'],
    reactStrictMode: false,
};