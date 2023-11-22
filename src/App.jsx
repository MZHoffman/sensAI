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
import Home from "./components/Home";
import TeacherClasses from "./components/TeacherClasses";
import TeacherAssignmentsNew from "./components/TeacherAssignmentsNew";
import { StudentPage } from "./components/StudentPage";
import { ProfilePage } from "./components/ProfilePage";
import TeacherClassClassIDAssignmentsList from "./components/TeacherClassClassIDAssignmentsList";
import AssignmentTeacherList from "./components/AssignmentTeacherList";
import TeacherLessonsNew from "./components/TeacherLessonsNew";
import { StudentSingleLessonPage } from "./components/StudentSingleLessonPage";
import { TeacherSingleLessonPage } from "./components/TeacherSingleLessonPage";
import TeacherAssignmentFeedback from "./components/TeacherAssignmentFeedback";
import { StudentClasses } from "./components/StudentClasses";
import { getUser } from "./utils/api";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useState, useEffect } from "react";
import { StudentTeachersListPage } from "./components/StudentTeachersListPage";
import Chat from "./components/Chat";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // console.log("🚀 ~ App ~ user:", currentUser);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { user: fetchedUser } = await getUser(user.email);
        localStorage.setItem("user", fetchedUser.name);
        setCurrentUser(fetchedUser);
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("roomId");
        localStorage.removeItem("loggedUser");
        setCurrentUser("logged out");
      }
    });
  }, []);
  return (
    <>
      {/* <Header /> Most likely used for home page/login */}
      <Navbar user={currentUser} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/students" element={<StudentPage />} />
        <Route
          path="/student/assignments"
          element={<StudentAssignmentsPage user={currentUser} />}
        />
        <Route
          path="/student/assignments/:assignment_id"
          element={<DisplayStudentAssignment user={currentUser} />}
        />
        <Route
          path="/student/lessons"
          element={<StudentLessonsPage user={currentUser} />}
        />
        <Route path="/teachers/home" element={<ClassesList />} />
        <Route
          path="/teacher/lessons/:class_id"
          element={<TeacherLessonsClassList user={currentUser} />}
        />
        <Route
          path="/teacher/assignments/:assignment_id"
          element={<AssignmentTeacherList user={currentUser} />}
        />

        <Route
          path="/teacher/assignments/student/:user_id"
          element={<StudentAssignmentsPage user={currentUser} />}
        />
        <Route
          path="/teacher/assignments/new"
          element={<TeacherAssignmentsNew user={currentUser} />}
        />
        <Route
          path="/teacher/lessons/new"
          element={<TeacherLessonsNew user={currentUser} />}
        />
        <Route path="/" element={<Home user={currentUser} />} />
        <Route
          path="/teacher/classes/"
          element={<TeacherClasses user={currentUser} />}
        />

        <Route
          path="/teacher/classes/:class_id/assignments"
          element={<TeacherClassClassIDAssignmentsList user={currentUser} />}
        />
        <Route
          path="/teacher/classes/:class_id"
          element={<StudentPage user={currentUser} />}
        />
        <Route
          path="/student/lessons/:lesson_id"
          element={<StudentSingleLessonPage />}
        />
        <Route
          path="/teacher/:lesson_id/lessons"
          element={<TeacherSingleLessonPage />}
        />
        <Route
          path="/teacher/assignments/feedback/:assignment_id"
          element={<TeacherAssignmentFeedback />}
        />
        <Route
          path="/student/teachers"
          element={<StudentTeachersListPage user={currentUser} />}
        />
        <Route
          path="/student/teachers/chat/:room_id"
          element={<Chat user={currentUser} />}
        />
        <Route
          path="/teachers/student/chat/:room_id"
          element={<Chat user={currentUser} />}
        />
        <Route
          path="/student/classes/"
          element={<StudentClasses user={currentUser} />}
        />
        <Route path="/user/" element={<ProfilePage user={currentUser} />} />
      </Routes>
    </>
  );
}

export default App;
