import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChallengesPage from "./pages/Challenges";
import MemberProgramPage from "./pages/MemberProgram";
import Layout from "./layout/Layout";
import RedeemPage from "./pages/Redeem";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/Challenges" element={<ChallengesPage />} />
            <Route path="/memberprogram" element={<MemberProgramPage />} />
            <Route path="/redeem" element={<RedeemPage />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
