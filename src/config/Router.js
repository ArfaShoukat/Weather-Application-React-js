
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Dashboard from '../view/Dashboard/index'
import SearchHistoryPage from "../view/SearchHistoryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard/>
  },
  {
    path: "/SearchHistoryPage",
    element: <SearchHistoryPage/>
  },
 
]);
function Router(){
    return<RouterProvider router={router}/>
}
export default Router;
