import "./App.css";
import MaterialTable from "./component/MaterialTable";
import { dummyArray } from "./dummy";
import { personColumns } from "./dummy/columnDef";

function App() {
  return (
    <>
      <MaterialTable data={dummyArray} columns={personColumns} />
    </>
  );
}

export default App;
