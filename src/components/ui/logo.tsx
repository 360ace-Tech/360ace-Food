import Image from 'next/image';
import clsx from 'clsx';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md';
  withGradient?: boolean;
}

const sizeMap = {
  sm: 'h-8 w-8 md:h-10 md:w-10',
  md: 'h-10 w-10 md:h-12 md:w-12'
};

export function Logo({ className, size = 'md', withGradient = true }: LogoProps) {
  return (
    <div className={clsx('relative overflow-hidden rounded-full', sizeMap[size], className)}>
      {withGradient ? <div className="absolute inset-0 bg-gradient-to-br from-ember to-sage" /> : null}
      <Image src="/images/logo-light.png" alt="360ace.Food" fill priority className="object-contain" />
    </div>
  );
}
