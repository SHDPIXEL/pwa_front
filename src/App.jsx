import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChallengesPage from "./pages/Challenges";
import MemberProgramPage from "./pages/MemberProgram";
import Home from "./pages/Home";
import RedeemPage from "./pages/Redeem";
import Layout from "./layout/Layout";
import Welcome from "./pages/welcome";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home/>} />
            <Route path="/Challenges" element={<ChallengesPage />} />
            <Route path="/memberprogram" element={<MemberProgramPage />} />
            <Route path="/redeem" element={<RedeemPage />}/>
            <Route path="/welcome" element={<Welcome />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
