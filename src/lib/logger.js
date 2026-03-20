function formatLog(entry) {
  const base = `[${entry.timestamp}] [${entry.level}]${entry.endpoint ? ` [${entry.endpoint}]` : ''}${entry.ip ? ` [${entry.ip}]` : ''} ${entry.message}`;
  if (entry.data) {
    return `${base} | ${JSON.stringify(entry.data)}`;
  }
  return base;
}

export const logger = {
  info: (message, data, context = {}) => {
    const entry = {
      timestamp: new Date().toISOString(),
      level: 'INFO',
      message,
      data,
      ...context,
    };
    console.log(formatLog(entry));
  },
  warn: (message, data, context = {}) => {
    const entry = {
      timestamp: new Date().toISOString(),
      level: 'WARN',
      message,
      data,
      ...context,
    };
    console.warn(formatLog(entry));
  },
  error: (message, data, context = {}) => {
    const entry = {
      timestamp: new Date().toISOString(),
      level: 'ERROR',
      message,
      data,
      ...context,
    };
    console.error(formatLog(entry));
  },
  debug: (message, data, context = {}) => {
    if (process.env.NODE_ENV === 'development') {
      const entry = {
        timestamp: new Date().toISOString(),
        level: 'DEBUG',
        message,
        data,
        ...context,
      };
      console.debug(formatLog(entry));
    }
  },
};
