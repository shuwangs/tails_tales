const MainLayout = ({ children }) => {
    return (
        <div className="flex flex-col max-w-[1126px] mx-auto">        
            {children}
        </div>
    );
};

export default MainLayout;
