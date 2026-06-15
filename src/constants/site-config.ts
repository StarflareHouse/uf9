import type { Locale } from '@/i18n'

const englishShareholderPdf = { dir: '/pdf/en/uf9-shareholder', pages: 14, file: '/pdf/EN_UF9-shareholder.pdf' }
const chineseShareholderPdf = { dir: '/pdf/cn/uf9-shareholder', pages: 14, file: '/pdf/CN_UF9-shareholder.pdf' }

export const siteConfig = {
  contact: {
    telegram: 'https://t.me/uf9official',
    line: 'https://line.me/ti/p/@uf9',
    email: 'support@uf9.com',
    liveChat: 'https://uf9.com/chat',
  },

  social: {
    telegram: 'https://t.me/uf9channel',
    facebook: 'https://facebook.com/uf9official',
    instagram: 'https://instagram.com/uf9official',
    twitter: 'https://x.com/uf9official',
  },

  links: {
    register: 'https://uf9.com/register',
    login: 'https://uf9.com/login',
    downloadApp: 'https://uf9.com/download',
    gameLobby: 'https://uf9.com/games',
  },

  pdf: {
    shareholder: {
      'ms-MY': englishShareholderPdf,
      'en-SG': englishShareholderPdf,
      'fil-PH': englishShareholderPdf,
      'ko-KR': englishShareholderPdf,
      'zh-CN': chineseShareholderPdf,
      'th-TH': englishShareholderPdf,
      'id-ID': englishShareholderPdf,
      'vi-VN': englishShareholderPdf,
      'hi-IN': englishShareholderPdf,
      'ja-JP': englishShareholderPdf,
      'zh-TW': chineseShareholderPdf,
      'zh-HK': chineseShareholderPdf,
    } satisfies Record<Locale, { dir: string; pages: number; file: string }>,
  },
} as const
