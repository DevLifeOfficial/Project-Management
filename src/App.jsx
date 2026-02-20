import { BrowserRouter } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/layout/MainLayout";
import AppRouter from "./router/AppRouter";
import { ProjectProvider } from "./context/ProjectContext";

function App() {
  return (
    <>
      <ProjectProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ProjectProvider>
    </>
  );
}

export default App;
