type AuthLayoutProps = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen min-w-max place-items-center">
      <div className="m-auto w-full max-w-615 rounded-20 bg-white py-40 px-40 shadow-base sm:px-60 lg:px-100">
        {children}
      </div>
    </div>
  );
};
