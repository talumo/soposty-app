import { getT } from '@gitroom/react/translation/get.translation.service.backend';

export const dynamic = 'force-dynamic';
import { ReactNode } from 'react';
import Image from 'next/image';
import loadDynamic from 'next/dynamic';
import { LogoTextComponent } from '@gitroom/frontend/components/ui/logo-text.component';
const ReturnUrlComponent = loadDynamic(() => import('./return.url.component'));
export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = await getT();

  return (
    <div className="bg-[#0A0A0A] min-h-screen flex items-center justify-center text-white">
      <ReturnUrlComponent />
      <div
        className="bg-[#111111] rounded-[16px] border border-[#222222] p-[48px] w-full max-w-[480px] shadow-2xl"
        style={{ borderTop: '4px solid #7C3AED' }}
      >
        <div className="flex flex-col items-center gap-[24px]">
          <LogoTextComponent />
          <div className="flex w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
