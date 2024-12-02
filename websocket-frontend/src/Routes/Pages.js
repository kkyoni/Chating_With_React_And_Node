import Dashboard from "../Pages/Dashboard/Dashboard";
import Profile from "../Pages/Profile/Profile";
import Stories from "../Pages/Dashboard/UserChatModel/UserStories/Stories";
import AddStoriesSettings from "../Pages/StoriesSettings/AddStoriesSettings";
import Faq from "../Pages/Faq/Faq";

const Pages = [
  { path: "", element: <Dashboard /> },
  { path: "/profile", element: <Profile /> },
  { path: "/addStoriesSettings", element: <AddStoriesSettings /> },
  { path: "/stories", element: <Stories /> },
  { path: "/faq", element: <Faq /> },
];

export default Pages;
