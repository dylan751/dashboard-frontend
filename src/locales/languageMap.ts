export interface LanguageMapType {
  en: string;
  ja: string;
  vn: string;
}

const languageMap: LanguageMapType = {
  en: 'English',
  ja: '日本語',
  vn: 'Việt Nam',
};

export const languageItems = [
  {
    id: 'en',
    text: 'English',
  },
  {
    id: 'ja',
    text: '日本語',
  },
  {
    id: 'vn',
    text: 'Việt Nam',
  },
];

export default languageMap;
