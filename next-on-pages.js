// Конфигурация для @cloudflare/next-on-pages
/** @type {import('@cloudflare/next-on-pages').NextOnPagesConfig} */
module.exports = {
  // Настройки для оптимизации размера бандла
  optimizeImages: true,
  optimizeCss: true,
  minify: true,
  
  // Настройки для кеширования
  caching: {
    // Кеширование статических ресурсов
    staticAssets: {
      browserTTL: 31536000, // 1 год
      edgeTTL: 31536000, // 1 год
    },
    // Кеширование страниц
    pages: {
      // Настройки для статических страниц
      static: {
        browserTTL: 86400, // 1 день
        edgeTTL: 86400, // 1 день
      },
      // Настройки для динамических страниц
      dynamic: {
        browserTTL: 0, // Не кешировать в браузере
        edgeTTL: 0, // Не кешировать на edge
      },
    },
  },
  
  // Настройки для обработки ошибок
  errorPages: {
    404: '/404',
    500: '/500',
  },
  
  // Настройки для оптимизации производительности
  performance: {
    // Включаем HTTP/2 Server Push
    serverPush: true,
    // Включаем Brotli сжатие
    brotli: true,
  },
};
