type BodyProps = {
  children: React.ReactNode;
  className?: string;
};

export const Body = ({ children, className }: BodyProps) => {
  return <div className={className}>{children}</div>;
};
