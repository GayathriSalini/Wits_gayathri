// Simple in-memory rate limiter using a Map
// In production, use Redis for distributed rate limiting

const rateLimitMap = new Map();

const RATE_LIMIT_CONFIG = {
  '/api/register': { maxRequests: 5, windowMs: 60 * 1000 }, // 5 per minute
  '/api/registrations': { maxRequests: 100, windowMs: 60 * 1000 }, // 100 per minute
  '/api/analytics': { maxRequests: 50, windowMs: 60 * 1000 }, // 50 per minute
  '/api/auth/login': { maxRequests: 10, windowMs: 60 * 1000 }, // 10 per minute
};

export function checkRateLimit(ip, endpoint) {
  const config = RATE_LIMIT_CONFIG[endpoint] || {
    maxRequests: 30,
    windowMs: 60 * 1000,
  };
  
  const key = `${ip}:${endpoint}`;
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now - entry.windowStart > config.windowMs) {
    rateLimitMap.set(key, { count: 1, windowStart: now });
    return { allowed: true, remaining: config.maxRequests - 1, resetIn: config.windowMs };
  }

  if (entry.count >= config.maxRequests) {
    const resetIn = config.windowMs - (now - entry.windowStart);
    return { allowed: false, remaining: 0, resetIn };
  }

  entry.count++;
  return { allowed: true, remaining: config.maxRequests - entry.count, resetIn: config.windowMs - (now - entry.windowStart) };
}

export function getClientIp(request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1'
  );
}
