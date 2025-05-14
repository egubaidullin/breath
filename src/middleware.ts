import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware для обработки запросов
export function middleware(request: NextRequest) {
  // Получаем текущий URL
  const url = request.nextUrl.clone();
  
  // Добавляем заголовки для кеширования статических ресурсов
  const response = NextResponse.next();
  
  // Определяем, является ли запрос статическим ресурсом
  const isStaticResource = url.pathname.startsWith('/_next/static/') || 
                          url.pathname.startsWith('/icons/') ||
                          url.pathname.startsWith('/fonts/') ||
                          url.pathname.match(/\.(ico|png|svg|json)$/);
  
  // Если это статический ресурс, добавляем заголовки кеширования
  if (isStaticResource) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  return response;
}

// Указываем, для каких путей применять middleware
export const config = {
  matcher: [
    // Применяем ко всем путям, кроме API и Next.js внутренних путей
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
