import Dashboard from "../Pages/Dashboard/Dashboard";
import Profile from "../Pages/Profile/Profile";
import UserStories from "../Pages/Dashboard/UserChatModel/UserStories/UserStories";
import AddStoriesSettings from "../Pages/StoriesSettings/AddStoriesSettings";

const Pages = [
  { path: "", element: <Dashboard /> },
  { path: "/profile", element: <Profile /> },
  { path: "/addStoriesSettings", element: <AddStoriesSettings /> },
  { path: "/stories/:id", element: <UserStories /> },
];

export default Pages;
