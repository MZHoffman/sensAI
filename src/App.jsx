import "./App.css";
import { Route, Routes } from "react-router-dom";
import { StudentAssignmentsPage } from "./components/StudentAssignmentsPage";
import { ClassesList } from "./components/ClassesList";
import { Header } from "./components/Header";
import { Navbar } from "./components/Navbar";
import { DisplayStudentAssignment } from "./components/DisplayStudentAssignment";
import { StudentLessonsPage } from "./components/StudentLessonsPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TeacherLessonsClassList from "./components/TeacherLessonsClassList";
import TeacherAssignmentsClassList from "./components/TeacherAssignmentClassList";
import Home from "./components/Home";

import { getUser } from "./utils/api";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const { user: fetchedUser } = await getUser(user.email);
          setUser(fetchedUser);
        } else {
          setUser("logged out");
        }
      } catch {
        
      }
    });
  }, []);
  return (
    <>
      {/* <Header /> Most likely used for home page/login */}
      <Navbar user={user} />
      <Routes>
        <Route
          path="/student/assignments"
          element={<StudentAssignmentsPage />}
        />
        <Route path="/teachers/home" element={<ClassesList />} />
        <Route
          path="/student/assignments/:assignment_id"
          element={<DisplayStudentAssignment />}
        />
        <Route path="/student/lessons" element={<StudentLessonsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/teacher/lessons/:class_id"
          element={<TeacherLessonsClassList user={user} />}
        />
        <Route
          path="/teacher/assignments/:class_id"
          element={<TeacherAssignmentsClassList user={user} />}
        />
        <Route path="/" element={<Home user={user} />} />
      </Routes>
    </>
  );
}

export default App;
