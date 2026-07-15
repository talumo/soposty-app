import React from 'react';
import Image from 'next/image';

export const LogoTextComponent = () => {
  return (
    <Image
      src="/soposty-horiz-trans.png"
      alt="Soposty"
      width={160}
      height={52}
      style={{ objectFit: 'contain' }}
    />
  );
};
