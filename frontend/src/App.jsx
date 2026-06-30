import{ BrowserRouter,Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ComplianceItems from "./pages/ComplianceItems";
import AddComplianceItem from "./pages/AddComplianceItem";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/compliance" element={<ComplianceItems />}/>
        <Route path="/add-item" element={<AddComplianceItem />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;