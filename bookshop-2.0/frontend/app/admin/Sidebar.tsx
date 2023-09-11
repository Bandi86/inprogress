import Menu from "../components/adminSideBar";

const Sidebar = () => {
  return (
    <div className='flex flex-row min-h-screen'>
      <div className='flex flex-col min-h-min font-bold text-center gap-6 w-60 border-r slate-200'>
        <Menu />
      </div>
    </div>
  );
};

export default Sidebar;
