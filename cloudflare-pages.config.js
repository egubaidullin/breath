// Специальная конфигурация для Cloudflare Pages
// Используется для оптимизации сборки и обхода ограничений размера файлов

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const cloudflareConfig = {
  // Отключаем генерацию исходных карт в production для уменьшения размера сборки
  productionBrowserSourceMaps: false,
  
  // Оптимизируем размер изображений
  images: {
    unoptimized: true, // Для Cloudflare Pages лучше использовать unoptimized: true
    formats: ['image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 дней
  },
  
  // Оптимизируем webpack
  webpack: (config, { isServer, dev }) => {
    // Применяем оптимизации только для production сборки
    if (!dev) {
      // Отключаем генерацию исходных карт
      config.devtool = false;
      
      // Оптимизируем размер бандла
      config.optimization.minimize = true;
      
      // Разделяем чанки для уменьшения размера отдельных файлов
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        maxSize: 20 * 1024 * 1024, // 20 МБ максимальный размер чанка
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            name: 'framework',
            test: /[\\/]node_modules[\\/](@next|next|react|react-dom)[\\/]/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace('@', '')}`;
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
          },
          shared: {
            name: 'shared',
            priority: 10,
            minChunks: 2,
            reuseExistingChunk: true,
          },
        },
      };
      
      // Дополнительные оптимизации для Cloudflare Pages
      config.optimization.moduleIds = 'deterministic';
      
      // Исключаем ненужные библиотеки из серверной сборки
      if (isServer) {
        config.externals = [...(config.externals || []), 
          'firebase', 
          '@tanstack/react-query', 
          '@tanstack-query-firebase/react',
          'recharts'
        ];
      }
    }
    
    return config;
  },
  
  // Отключаем некоторые экспериментальные функции, которые могут увеличивать размер сборки
  experimental: {
    serverComponentsExternalPackages: [
      'firebase',
      '@tanstack/react-query',
      '@tanstack-query-firebase/react',
      'recharts'
    ],
  },
  
  // Настройки для Cloudflare Pages
  // https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/
  output: 'standalone',
  
  // Отключаем телеметрию
  telemetry: { 
    disabled: true 
  },
  
  // Уменьшаем размер сборки, отключая некоторые функции
  swcMinify: true,
  reactStrictMode: false,
  
  // Оптимизируем кеширование
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000, // 1 час
    pagesBufferLength: 2,
  },
};

module.exports = withBundleAnalyzer(cloudflareConfig);
