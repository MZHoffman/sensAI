/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAssignmentByStudentId } from "../utils/api";
import { StudentAssignmentsCard } from "./StudentAssignmentsCard";
import { Skeleton, Typography } from "@mui/material";

export function StudentAssignmentsList({ user }) {
  const [studentAssignments, setStudentAssignment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getAssignmentByStudentId(user.id)
      .then(({ assignments }) => {
        setIsLoading(false);
        setStudentAssignment(assignments);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [user]);

  function handleAssignmentToDisplay(assignment_id) {
    navigate(`/student/assignments/${assignment_id}`);
  }

  return isLoading ? (
    <>
      <Typography pl={3} pr={3} variant="h1">
        <Skeleton />
      </Typography>

      <Typography pl={3} pt={1} pr={3} variant="h1">
        <Skeleton />
      </Typography>

      <Typography pl={3} pt={1} pr={3} variant="h1">
        <Skeleton />
      </Typography>
    </>
  ) : (
    <ul className="student-lesson-container">
      {studentAssignments.map((assignment) => {
        return (
          <li
            key={assignment.id}
            onClick={() => {
              handleAssignmentToDisplay(assignment.id);
            }}
          >
            <StudentAssignmentsCard assignmentData={assignment} />
          </li>
        );
      })}
    </ul>
  );
}
