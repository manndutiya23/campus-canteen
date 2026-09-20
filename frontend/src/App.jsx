import { BrowserRouter, Routes, Route } from "react-router-dom";

import StaffDashboard from "./pages/StaffDashboard";
import OrderStatusPage from "./pages/OrderStatusPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StaffDashboard />} />
        <Route path="/order/:orderId" element={<OrderStatusPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;