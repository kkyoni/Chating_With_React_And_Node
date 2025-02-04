import Dashboard from "../Pages/Dashboard/Dashboard";
import Profile from "../Pages/Profile/Profile";
import Stories from "../Pages/Dashboard/UserChatModel/UserStories/Stories";
import AddStoriesSettings from "../Pages/StoriesSettings/AddStoriesSettings";
import Faq from "../Pages/Faq/Faq";
import ChangePassword from "../Pages/ChangePassword/ChangePassword";
// import SearchComponent from "../Pages/ChangePassword/SearchComponent";

const Pages = [
  { path: "", element: <Dashboard /> },
  { path: "/profile", element: <Profile /> },
  { path: "/addStoriesSettings", element: <AddStoriesSettings /> },
  { path: "/stories", element: <Stories /> },
  { path: "/faq", element: <Faq /> },
  { path: "/profile-change-password", element: <ChangePassword /> },
  // { path: "/SearchComponent", element: <SearchComponent /> },
];

export default Pages;
