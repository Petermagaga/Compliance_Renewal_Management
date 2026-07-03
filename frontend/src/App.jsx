import{ BrowserRouter,Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ComplianceItems from "./pages/ComplianceItems";
import AddComplianceItem from "./pages/AddComplianceItem";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
function App(){
  return(
    <BrowserRouter>
      <Routes>
        {/*Public Route*/}
        <Route path="/" element={<Login />}/>

        <Route path="/dashboard" 
        element={
          <ProtectedRoute>
          <Dashboard />
          </ProtectedRoute>} />
        <Route path="/compliance" 
        element={
          <ProtectedRoute>
          <ComplianceItems />
          </ProtectedRoute>}/>
        <Route path="/add-item"
         element={
          <ProtectedRoute>
          <AddComplianceItem />
          </ProtectedRoute>}/>

        
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;