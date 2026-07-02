import{ BrowserRouter,Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ComplianceItems from "./pages/ComplianceItems";
import AddComplianceItem from "./pages/AddComplianceItem";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        {/*Public Route*/}
        <Route path="/" element={<Login />}/>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/compliance" element={<ComplianceItems />}/>
        <Route path="/add-item" element={<AddComplianceItem />}/>

        {/**/}
        
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;