import { Route, Routes } from "react-router-dom";

import { AppRoutes } from "@/constants/routes";
import SignUpPage from "@/pages/sign-up/page";
import RootPage from "@/pages/root/page";

function App() {
  return (
    <main className="h-dvh overflow-x-hidden">
      <Routes>
        <Route path={AppRoutes.Root} element={<RootPage />} />
        <Route path={AppRoutes.SignUp} element={<SignUpPage />} />
      </Routes>
    </main>
  );
}

export default App;
