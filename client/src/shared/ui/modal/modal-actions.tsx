type ActionsProps = {
  children: React.ReactNode;
  className?: string;
};

export const Actions = ({ children, className }: ActionsProps) => {
  return <footer className={className}>{children}</footer>;
};
