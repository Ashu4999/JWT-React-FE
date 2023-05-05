import { RegisterForm, LoginForm, Links, Home, EditorPage, Layout, Lounge, Unauthorized, AdminPage, NotFound404, RequireAuth, PersistentLogin } from "./MyComponents";
import "./App.css"
import { Route, Routes } from "react-router-dom";

const Roles_List = {
  "Admin": 1,
  "Editor": 2,
  "User": 3,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="linkpage" element={<Links />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* for persistent login for all protected routes so that don't redirect to login*/}
        <Route element={<PersistentLogin />}>
          {/* want to protect these routes */}
          <Route element={<RequireAuth allowedRoles={[Roles_List.User]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[Roles_List.Editor]} />}>
            <Route path="editor" element={<EditorPage />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[Roles_List.Admin]} />}>
            <Route path="admin" element={<AdminPage />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[Roles_List.Editor, Roles_List.Admin]} />}>
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound404 />} />
      </Route>
    </Routes>
  );
}

export default App;
