import { headings } from './Style';
import { FC, ReactNode } from 'react';

export interface IHeading {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children?: ReactNode;
  className?: string;
  id?: string;
}

export const Heading: FC<IHeading> = (props) => {
  const { as = 'h1', children, className, id } = props;
  const StyledHeading = as ? headings[as.toUpperCase()] : headings.H1;

  return (
    <StyledHeading className={className} id={id}>
      {children}
    </StyledHeading>
  );
};
