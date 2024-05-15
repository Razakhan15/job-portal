import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Grid, makeStyles } from "@material-ui/core";

import Welcome, { ErrorPage } from "./component/Welcome";
import Navbar from "./component/Navbar";
import Login from "./component/Login";
import Logout from "./component/Logout";
import Signup from "./component/Signup";
import Home from "./component/Home";
import Applications from "./component/Applications";
import Profile from "./component/Profile";
import CreateJobs from "./component/recruiter/CreateJobs";
import MyJobs from "./component/recruiter/MyJobs";
import JobApplications from "./component/recruiter/JobApplications";
import AcceptedApplicants from "./component/recruiter/AcceptedApplicants";
import RecruiterProfile from "./component/recruiter/Profile";
import MessagePopup from "./lib/MessagePopup";
import isAuth, { userType } from "./lib/isAuth";

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "98vh",
    paddingTop: "64px",
    boxSizing: "border-box",
    width: "100%",
  },
}));

export const SetPopupContext = createContext();
const TITLE = "Job-o-Hunt";

function App() {
  const classes = useStyles();
  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: "",
  });

  return (
    <BrowserRouter>
      <SetPopupContext.Provider value={setPopup}>
        <Grid container direction="column">
          <Grid item xs>
            <Navbar />
          </Grid>
          <Grid item className={classes.body}>
            <Routes>
              <Route path="/" exact element={<Welcome />} />
              <Route exact element={<Login />} path="/login" />

              <Route exact element={<Signup />} path="/signup" />

              <Route exact element={<Logout />} path="/logout" />

              <Route exact element={<Home />} path="/home" />

              <Route exact element={<Applications />} path="/applications" />

              {userType() === "recruiter" ? (
                <Route exact element={<RecruiterProfile />} path="/profile" />
              ) : (
                <Route exact element={<Profile />} path="/profile" />
              )}

              <Route exact element={<CreateJobs />} path="/addjob" />

              <Route exact element={<MyJobs />} path="/myjobs" />

              <Route
                exact
                element={<JobApplications />}
                path="/job/applications/:jobId"
              />

              <Route exact element={<AcceptedApplicants />} path="/employees" />

              <Route element={<ErrorPage />} />
            </Routes>
          </Grid>
        </Grid>
        <MessagePopup
          open={popup.open}
          setOpen={(status) =>
            setPopup({
              ...popup,
              open: status,
            })
          }
          severity={popup.severity}
          message={popup.message}
        />
      </SetPopupContext.Provider>
    </BrowserRouter>
  );
}

export default App;
