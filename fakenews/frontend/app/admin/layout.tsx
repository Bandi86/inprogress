import AdminNavBar from '@/components/AdminNavBar';

const adminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <>
       <AdminNavBar />
        {children}
      </>
    );
  };
  
  export default adminLayout;