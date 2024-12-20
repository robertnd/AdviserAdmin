import { Link } from "react-router-dom";

// import OMLogo from "@/assets/logos/om-logo.png";
import { SIDEBAR_MENU_ITEMS } from "@/constants/dashboard";
import { LogOut } from "lucide-react"; // Import the LogOut icon
import { removeCookie } from "@/lib/utils";


const AppSidebar: React.FC = () => {
  // const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear()
    localStorage.clear()
    removeCookie("accessToken")
    window.location.href = "/"
  };

  return (
    <div className="bg-white hidden fixed z-[30] inset-y-0 border-r border-[#c4c3c3] w-36 flex-shrink-0 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center text-white px-4 lg:h-[60px] lg:px-6">
          {/* <Link
            to="/dashboard"
            className="flex items-center gap-2 text-white font-semibold"
          >
            <img className="h-10 w-10" src={OMLogo}/>
            <span className="not-sr-only text-white text-sm">Advisor Admin</span>
          </Link> */}
          {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button> */}
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 py-6 text-sm font-medium lg:px-4">
            {SIDEBAR_MENU_ITEMS.map((link) => (
              <Link
                key={link.key}
                to={link.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 h-20 text-black transition-all hover:text-primary"
              >
                <div className="flex flex-col items-center justify-center w-full">
                <div>{<link.Icon className="h-6 w-6" />}</div>
                <div className="mt-2">{link.label}</div>
                </div>
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto">
          {/* <div className="min-h-16 border-t">
            <div className="px-2 py-2 lg:px-4 grid items-start">
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className="flex items-center gap-3 px-3 py-2"
                >
                  <Button
                    variant="secondary"
                    className="flex items-start justify-start bg-transparent shadow-none hover:bg-slate-200"
                  >
                    <CircleUser className="h-5 w-5" />
                    <p className="text-muted-foreground">My Account</p>
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div> */}
        </div>
        <div className="mt-auto mb-8">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full gap-2 px-3 py-2 text-sm font-medium text-black transition-all hover:text-primary"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;
