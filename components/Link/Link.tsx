import { CSSProperties, FunctionComponent, LegacyRef, MouseEvent, ReactNode, forwardRef } from 'react';
import { useRouter } from 'next/router';

// This component bypasses the need to use Next.js <Link/>
// component because their prefetch defaults are insane.
// See: https://nextjs.org/docs/api-reference/next/link

interface LinkProps {
  children: ReactNode | string;
  className?: string;
  disableRouter?: boolean;
  href: string;
  onClick?: Function;
  rel?: string;
  style?: CSSProperties;
  target?: string;
  title?: string;
}

const Link: FunctionComponent<LinkProps> = forwardRef(({ children, disableRouter, href, onClick, ...props }, ref: LegacyRef<HTMLAnchorElement>) => {
  const router = useRouter();

  const handleClick = async (event: MouseEvent) => {
    event.preventDefault();
    await onClick?.(event);

    if (!disableRouter) {
      await router.push(href);
    }
  };

  return (
    <a {...props} href={href} onClick={handleClick} ref={ref}>
      {children}
    </a>
  );
});
Link.displayName = 'Link';

export default Link;
