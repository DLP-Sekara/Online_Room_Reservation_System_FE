import Footer from '../components/onBoarding/Footer';
type props = {
  children: React.ReactNode;
  footer?: boolean;
};
const AdminOnBoardingLayout = ({ children, footer = true }: props) => {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-[#F4F3F2]">
      {/* <div className="fixed left-0 top-0 z-10 flex w-full items-start justify-start px-4 py-2.5 sm:px-6 lg:px-10 lg:py-4 xl:px-12">
        <img src="/logo.svg" alt="Ocean View Logo" className="h-6 sm:h-8 lg:h-36" />
      </div> */}

      <div className="flex h-full w-full flex-col items-center justify-between gap-5 overflow-y-auto px-5 pb-5 pt-20">
        <div className="flex w-full flex-col items-center lg:w-[40%] 2xl:w-[80%]">
          {children}
        </div>

        {footer && <Footer />}
      </div>
    </div>
  );
};

export default AdminOnBoardingLayout;
