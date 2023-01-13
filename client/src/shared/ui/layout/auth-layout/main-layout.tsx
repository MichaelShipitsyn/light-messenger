type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen min-w-max py-13">
      <div className="m-auto h-[calc(100vh-2rem)] w-full max-w-1010 rounded-8 bg-white shadow-base">
        {children}
      </div>
    </div>
  );
};
