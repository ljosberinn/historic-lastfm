import { ReactNode, HTMLAttributes } from 'react';

type ExternalLinkProps = {
  children: ReactNode;
  href?: string;
  rel?: string;
  title?: string;
  id?: string;
} & HTMLAttributes<HTMLAnchorElement>;

export function ExternalLink({
  children,
  ...rest
}: ExternalLinkProps): JSX.Element {
  return (
    <a target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}
