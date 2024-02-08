// import React from 'react';
// import { FaHome, FaUser, FaCog, FaBell, FaEdit, FaEnvelope, FaUsers, FaSyncAlt, FaSearch } from 'react-icons/fa';
// import '../index.css';

// function Component() {
//   return (
//     <div key="1" className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
//       <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
//         <div className="flex flex-col gap-2">
//           <div className="flex h-[60px] items-center px-6">
//             <a className="flex items-center gap-2 font-semibold" href="#">
//               <FaHome className="h-6 w-6" />
//               <span className="">Airbnb Users</span>
//             </a>
//           </div>
//           <div className="flex-1">
//             <nav className="grid items-start px-4 text-sm font-medium">
//               <a
//                 className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
//                 href="#"
//               >
//                 <FaHome className="h-4 w-4" />
//                 Home
//               </a>
//               <a
//                 className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
//                 href="#"
//               >
//                 <FaUser className="h-4 w-4" />
//                 Profile
//               </a>
//               <a
//                 className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
//                 href="#"
//               >
//                 <FaCog className="h-4 w-4" />
//                 Settings
//               </a>
//               <a
//                 className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
//                 href="#"
//               >
//                 <FaBell className="h-4 w-4" />
//                 Notifications
//               </a>
//             </nav>
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col">
//         <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
//           <a className="lg:hidden" href="#">
//             <FaHome className="h-6 w-6" />
//             <span className="sr-only">Home</span>
//           </a>
//           <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
//             <button className="rounded-full">
//               <FaSearch className="w-4 h-4" />
//               <span className="sr-only">Search</span>
//             </button>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <button size="icon" variant="ghost">
//                   <FaBell className="w-4 h-4" />
//                   <span className="sr-only">Toggle notifications</span>
//                 </button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-[200px]">
//                 <DropdownMenuLabel>You have no notifications</DropdownMenuLabel>
//               </DropdownMenuContent>
//             </DropdownMenu>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <button size="icon" variant="ghost">
//                   <img
//                     alt="Avatar"
//                     className="rounded-full"
//                     height="32"
//                     src="/placeholder.svg"
//                     style={{
//                       aspectRatio: "32/32",
//                       objectFit: "cover",
//                     }}
//                     width="32"
//                   />
//                   <span className="sr-only">Toggle user menu</span>
//                 </button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>Settings</DropdownMenuItem>
//                 <DropdownMenuItem>Support</DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>Logout</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </header>
//         <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
//           <div className="flex flex-col gap-2">
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
//                 <CardTitle className="text-sm font-medium">Profile</CardTitle>
//                 <button size="icon" variant="ghost">
//                   <FaEdit className="w-4 h-4" />
//                   <span className="sr-only">Edit</span>
//                 </button>
//               </CardHeader>
//               <CardContent className="flex items-center gap-4">
//                 <img
//                   alt="Avatar"
//                   className="rounded-full"
//                   height="100"
//                   src="/placeholder.svg"
//                   style={{
//                     aspectRatio: "100/100",
//                     objectFit: "cover",
//                   }}
//                   width="100"
//                 />
//                 <div className="grid gap-1 text-xs sm:text-sm">
//                   <div className="font-medium">John Doe</div>
//                   <div className="text-gray-500 dark:text-gray-400">john@example.com</div>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
//                 <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
//                 <button size="icon" variant="ghost">
//                   <FaSyncAlt className="w-4 h-4" />
//                   <span className="sr-only">Refresh</span>
//                 </button>
//               </CardHeader>
//               <CardContent className="flex flex-col gap-4">
//                 <Card>
//                   <CardContent className="flex items-center gap-4">
//                     <FaEnvelope className="w-6 h-6" />
//                     <div className="grid gap-1 text-xs sm:text-sm">
//                       <div className="font-medium">New message</div>
//                       <div className="text-xs text-gray-500 dark:text-gray-400">You have a new message</div>
//                     </div>
//                     <div className="ml-auto text-xs text-gray-500 dark:text-gray-400">2 min ago</div>
//                   </CardContent>
//                 </Card>
//                 <Card />
//                 <Card>
//                   <CardContent className="flex items-center gap-4">
//                     <FaUsers className="w-6 h-6" />
//                     <div className="grid gap-1 text-xs sm:text-sm">
//                       <div className="font-medium">New user</div>
//                       <div className="text-xs text-gray-500 dark:text-gray-400">You have a new user</div>
//                     </div>
//                     <div className="ml-auto text-xs text-gray-500 dark:text-gray-400">10 min ago</div>
//                   </CardContent>
//                 </Card>
//               </CardContent>
//             </Card>
//           </div>
//           <Card className="p-4 flex h-[100px] items-center">
//             <div className="grid gap-1 text-xs sm:text-sm">
//               <div className="font-semibold">Total Bookings</div>
//               <div className="text-xs text-gray-500 dark:text-gray-400">You have 12 completed bookings</div>
//             </div>
//           </Card>
//         </main>
//       </div>
//     </div>
//   )
// }

// function DropdownMenu({ children }) {
//   return <div>{children}</div>;
// }

// function DropdownMenuTrigger({ children }) {
//   return <div>{children}</div>;
// }

// function DropdownMenuContent({ children }) {
//   return <div>{children}</div>;
// }

// function DropdownMenuLabel({ children }) {
//   return <div>{children}</div>;
// }

// function DropdownMenuSeparator() {
//   return <div />;
// }

// function DropdownMenuItem({ children }) {
//   return <div>{children}</div>;
// }

// function Card({ children }) {
//   return <div>{children}</div>;
// }

// function CardTitle({ children }) {
//   return <div>{children}</div>;
// }

// function CardHeader({ children }) {
//   return <div>{children}</div>;
// }

// function CardContent({ children }) {
//   return <div>{children}</div>;
// }

import React from 'react';
import { FaHome, FaUser, FaCog, FaBell, FaSearch, FaEdit, FaSyncAlt, FaEnvelope, FaUsers } from 'react-icons/fa';
import '../index.css';


// function Navbar() {
//   return (
//     <div className="navbar">
//       <div className="sidebar sidebar-lg">
//         <div className="logo">
//           <FaHome />
//           <span>Airbnb Users</span>
//         </div>
//         {/* Sidebar Navigation */}
//       </div>
//       <div className="main-content">
//         <header className="header">
//           <a href="#">
//             <FaHome />
//             <span className="sr-only">Home</span>
//           </a>
//           {/* Other header content */}
//         </header>
//         <main className="main-content">
//           {/* Main content */}
//         </main>
//       </div>
//     </div>
//   );
// }






function Card({ children }) {
  return <div className="card">{children}</div>;
}
function Navbar() {
  return (
    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40 sidebar sidebar-lg">
        <div className="flex flex-col gap-2">
          <div className="flex h-[60px] items-center px-6">
            <a className="flex items-center gap-2 font-semibold" href="#">
              <FaHome className="h-6 w-6" />
              <span className="">Airbnb Users</span>
            </a>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-4 text-sm font-medium">
              <a className="nav-link" href="#">
                <FaHome className="h-4 w-4" />
                Home
              </a>
              {/* Add similar nav-link elements for other navigation items */}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <a className="lg:hidden" href="#">
            <FaHome className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </a>
          <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <button className="rounded-full">
              <FaSearch className="w-4 h-4" />
              <span className="sr-only">Search</span>
            </button>
            {/* Add DropdownMenu and DropdownMenuTrigger components with appropriate styles */}
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex flex-col gap-2">
            {/* Add Card components with appropriate styles */}
          </div>
          <Card className="p-4 flex h-[100px] items-center">
            <div className="grid gap-1 text-xs sm:text-sm">
              <div className="font-semibold">Total Bookings</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">You have 12 completed bookings</div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}

export default Navbar;

