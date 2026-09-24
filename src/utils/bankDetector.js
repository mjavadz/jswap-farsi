// Iranian Bank Detection for Cards and IBAN (Sheba)

const BANK_IBAN_CODES = {
  '010': { name: 'بانک مرکزی', color: '#1B5E20' },
  '011': { name: 'بانک صنعت و معدن', color: '#37474F' },
  '012': { name: 'بانک ملت', color: '#D32F2F' },
  '013': { name: 'بانک رفاه کارگران', color: '#1565C0' },
  '014': { name: 'بانک مسکن', color: '#FF6F00' },
  '015': { name: 'بانک سپه', color: '#B71C1C' },
  '016': { name: 'بانک کشاورزی', color: '#2E7D32' },
  '017': { name: 'بانک ملی ایران', color: '#0D47A1' },
  '018': { name: 'بانک تجارت', color: '#00838F' },
  '019': { name: 'بانک صادرات ایران', color: '#4A148C' },
  '020': { name: 'بانک توسعه صادرات', color: '#455A64' },
  '021': { name: 'پست بانک ایران', color: '#00796B' },
  '022': { name: 'بانک توسعه تعاون', color: '#00695C' },
  '051': { name: 'موسسه اعتباری توسعه', color: '#37474F' },
  '053': { name: 'بانک کارآفرین', color: '#00897B' },
  '054': { name: 'بانک پارسیان', color: '#C62828' },
  '055': { name: 'بانک اقتصاد نوین', color: '#558B2F' },
  '056': { name: 'بانک سامان / بلوبانک', color: '#1976D2' },
  '057': { name: 'بانک پاسارگاد / ویپاد', color: '#FBC02D' },
  '058': { name: 'بانک سرمایه', color: '#5D4037' },
  '059': { name: 'بانک سینا', color: '#00838F' },
  '060': { name: 'بانک مهر ایران', color: '#2E7D32' },
  '061': { name: 'بانک شهر', color: '#C2185B' },
  '062': { name: 'بانک آینده', color: '#6A1B9A' },
  '063': { name: 'بانک انصار', color: '#B71C1C' },
  '064': { name: 'بانک گردشگری', color: '#D81B60' },
  '066': { name: 'بانک دی', color: '#AD1457' },
  '069': { name: 'بانک ایران زمین', color: '#7B1FA2' },
  '070': { name: 'بانک رسالت', color: '#00897B' },
  '078': { name: 'بانک خاورمیانه', color: '#37474F' },
};

const BANK_CARD_PREFIXES = {
  '603799': 'بانک ملی ایران',
  '589210': 'بانک سپه',
  '627648': 'بانک توسعه صادرات',
  '627961': 'بانک صنعت و معدن',
  '603770': 'بانک کشاورزی',
  '628023': 'بانک مسکن',
  '627760': 'پست بانک ایران',
  '502908': 'بانک توسعه تعاون',
  '627412': 'بانک اقتصاد نوین',
  '622106': 'بانک پارسیان',
  '502229': 'بانک پاسارگاد',
  '627488': 'بانک کارآفرین',
  '621986': 'بانک سامان / بلوبانک',
  '639346': 'بانک سینا',
  '639607': 'بانک سرمایه',
  '636214': 'بانک آینده',
  '502806': 'بانک شهر',
  '502938': 'بانک دی',
  '603769': 'بانک صادرات ایران',
  '610433': 'بانک ملت',
  '627353': 'بانک تجارت',
  '589463': 'بانک رفاه کارگران',
  '627381': 'بانک انصار',
  '505785': 'بانک ایران زمین',
  '505416': 'بانک گردشگری',
  '606373': 'بانک مهر ایران',
  '504172': 'بانک رسالت',
};

export function detectBankFromIBAN(iban) {
  if (!iban) return null;
  const clean = iban.replace(/[^0-9a-zA-Z]/g, '').toUpperCase();
  // Standard Iranian IBAN: IR + 2 check digits + 3 bank code digits + 19 account digits = 26 chars
  if (clean.startsWith('IR') && clean.length >= 7) {
    const bankCode = clean.slice(4, 7);
    return BANK_IBAN_CODES[bankCode] || { name: 'بانک ایرانی', color: '#10B981' };
  }
  return null;
}

export function detectBankFromCard(card) {
  if (!card) return null;
  const clean = card.replace(/[^0-9]/g, '');
  if (clean.length >= 6) {
    const prefix = clean.slice(0, 6);
    const bankName = BANK_CARD_PREFIXES[prefix];
    if (bankName) {
      return { name: bankName };
    }
  }
  return null;
}

export function formatIBAN(iban) {
  if (!iban) return '';
  const clean = iban.replace(/[^0-9a-zA-Z]/g, '').toUpperCase();
  // Chunk in 4 characters
  return clean.match(/.{1,4}/g)?.join(' ') || clean;
}
