import Image from 'next/image';
import clsx from 'clsx';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md';
  withGradient?: boolean;
}

const sizeMap = {
  sm: { className: 'h-8 w-8 md:h-10 md:w-10', sizes: '(min-width: 768px) 40px, 32px' },
  md: { className: 'h-10 w-10 md:h-12 md:w-12', sizes: '(min-width: 768px) 48px, 40px' }
};

export function Logo({ className, size = 'md', withGradient = true }: LogoProps) {
  const { className: sizeClasses, sizes } = sizeMap[size];
  return (
    <div className={clsx('relative overflow-hidden rounded-full', sizeClasses, className)}>
      {withGradient ? <div className="absolute inset-0 bg-gradient-to-br from-ember to-sage" /> : null}
      <Image
        src="/images/logo-light.png"
        alt="360ace.Food"
        fill
        priority
        sizes={sizes}
        className="object-contain"
      />
    </div>
  );
}
