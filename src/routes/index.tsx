
import UserList from "@/components/userList";
import LayoutAdmin from "@/LayoutAdmin";
import { Route, Routes } from "react-router-dom";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<LayoutAdmin />}>
                <Route index element={<UserList />} />
            </Route>
        </Routes>
    );
};
export default Router;
