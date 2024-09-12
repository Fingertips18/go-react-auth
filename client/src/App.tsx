import { Route, Routes } from "react-router-dom";

import { AppRoutes } from "@/constants/routes";
import { Header } from "@/components/header";
import RootPage from "@/routes/root/page";

function App() {
  return (
    <main className="h-dvh">
      <Header />
      <Routes>
        <Route path={AppRoutes.Root} element={<RootPage />} />
      </Routes>
    </main>
  );
}

export default App;
