import { Transaction } from '@mysten/sui/transactions';

// Update với package ID của bạn khi có
const PACKAGE_ID = '0xff71d817d1d5adeb8d4d8471a9fe477db82aa6eda9d1df45f3b758bd5c5fb8d4';
const MODULE_NAME = 'hero_tcg';

export const createHeroTransaction = async (
  name: string,
  level: number,
  imageUrl: string
) => {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::${MODULE_NAME}::create_hero`,
    arguments: [
      tx.pure.string(name),
      tx.pure.u8(level),
      tx.pure.string(imageUrl),
    ],
  });

  return tx;
};

export const levelUpHeroTransaction = (heroId: string) => {
  const tx = new Transaction();

  tx.moveCall({
    target: `${PACKAGE_ID}::${MODULE_NAME}::level_up`,
    arguments: [
      tx.object(heroId), // Hero object ID
    ],
  });

  return tx;
};


