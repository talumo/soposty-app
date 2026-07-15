'use client';

import Image from 'next/image';

export const Logo = () => {
  return (
    <Image
      src="/soposty-icon.png"
      alt="Soposty"
      width={60}
      height={60}
      className="mt-[8px] min-w-[60px] min-h-[60px]"
    />
  );
};
