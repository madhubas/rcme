import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import rocketImg from "./assets/rocket.png";
import Signup from "./components/Signup";
import Check from "./components/ImageUpload.js/Check";
import Login from "./components/authcomponents/Login";
import Upload from "./components/ImageUpload.js/Upload";
import ImageUpload from "./components/ImageUpload.js/ImageUpload";
import { ProtectedRoute } from "./protected.route";
import AdminRcme from "./components/AdminCom/AdminRcme";
import AdminStudent from "./components/AdminCom/AdminStudent";
import Register from "./components/Register";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          {/* <Route exact path="/" component={AdminRcme} /> */}
          <Route exact path="/login" component={Login} />
          <Route path="/register" component={Signup} />
          {/* <Route paht="/admin" exact component={Admin} /> */}
          <Route path="/upload" exact component={Upload} />
          <Route path="/upload/:id" exact component={ImageUpload} />
          <Route exact path="/dashboard/rcme" component={AdminRcme} />
          <Route exact path="/dashboard/student" component={AdminStudent} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
