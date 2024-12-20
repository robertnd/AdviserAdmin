import { Button } from "@/components/ui/button";
import { Bell, Menu, Search } from "lucide-react";
import { Link } from "react-router-dom";
// import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SIDEBAR_MENU_ITEMS } from "@/constants/dashboard";
import { Input } from "@/components/ui/input";
import OMLogo from "@/assets/logos/om-logo.png";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";


const AppHeader: React.FC = () => {
  return (
    <header className="flex z-[200] bg-[#282828] text-white h-14 items-center gap-4 w-full border-b p-8 flex-shrink-0 lg:h-[60px] lg:p-10">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-2xl font-medium text-white">
            <Link
              to="#"
              className="flex items-center gap-2 text-2xl text-white font-semibold"
            >
              {/* <Package2 className="h-6 w-6" /> */}
              <span className="not-sr-only text-white text-2xl">Advisor Admin</span>
            </Link>
            {SIDEBAR_MENU_ITEMS.map((link) => (
              <Link
                key={link.key}
                to={link.href}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                {<link.Icon className="h-5 w-5" />}
                {link.label}
              </Link>
            ))}
          </nav>
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
        </SheetContent>
      </Sheet>
      <div className="w-full flex items-center justify-between gap-4 ">
        <div className="flex items-center gap-2">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-white font-normal"
          >
            <img className="h-10 w-10" src={OMLogo}/>
            <span className="not-sr-only text-white text-lg">Advisor Admin</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <QuestionMarkCircledIcon className="h-5 w-5" />
          <Bell className="h-5 w-5 mx-4" />
          <form>
            <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search ..."
              className="w-full min-w-[300px] appearance-none rounded-full bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
          </form>
        </div>
      </div>
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white z-[1210]">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </header>
  );
};

export default AppHeader;
