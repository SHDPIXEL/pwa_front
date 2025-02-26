import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChallengesPage from "./pages/Challenges";
import MemberProgramPage from "./pages/MemberProgram";
import Home from "./pages/Home";
import RedeemPage from "./pages/Redeem";
import Layout from "./layout/Layout";
import Welcome from "./pages/welcome";
import ChallengeDetails from "./pages/ChallengeDetails";
import DietConsultation from "./pages/DietConsultation";
import WeekChallengesPage from "./pages/WeekChallengesPage";
import Profile from "./pages/Profile";
import ProductPage from "./pages/ProductPage";
import RewardPage from "./pages/RewardPage";
import FirstLogin from "./pages/FirstLoginPage";
import ThankYouPage from "./pages/Thankyou";
import SplashScreen from "./pages/SplashScreen";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import SubmissionHistory from "./pages/SubmissionHistory";
import { UserProvider } from "./context/userContext";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <UserProvider>
          <Routes>
            {/* Public Route (Home) */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/splash" element={<SplashScreen />} />
            </Route>

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Layout />}>
                <Route path="/Challenges" element={<ChallengesPage />} />
                <Route path="/challenges/week/:weekId" element={<WeekChallengesPage />} />
                <Route path="/memberprogram" element={<MemberProgramPage />} />
                <Route path="/redeem" element={<RedeemPage />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/challenges/week/:weekId/:challengeId" element={<ChallengeDetails />} />
                <Route path="/dietconsultation" element={<DietConsultation />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/reward/:id" element={<RewardPage />} />
                <Route path="/thankyou" element={<ThankYouPage />} />
                <Route path="/firstlogin" element={<FirstLogin />} />
                <Route path="/history" element={<SubmissionHistory />} />
              </Route>
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
