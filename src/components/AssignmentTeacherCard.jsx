import SchoolIcon from "@mui/icons-material/School";
import { Link, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";

export function TeacherAssignmentCard({ teacherAssignmentData }) {
  const [assignmentDesc, setAssignmentDesc] = useState("");
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/teacher/assignments/feedback/${teacherAssignmentData.id}`);
  };
  useEffect(() => {
    if (teacherAssignmentData && teacherAssignmentData.work) {
      let counter = 0;
      const description = teacherAssignmentData.work
        .split("")
        .filter((char) => {
          if (char === " ") {
            counter++;
          }
          if (counter !== 10 && counter <= 10) {
            return char;
          }
        })
        .join("");
      setAssignmentDesc(description);
    }
  });

  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        mt: 5,
        cursor: "pointer",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Link color="inherit" underline="none" onClick={handleClick}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="body2" gutterBottom>
                  Student: {teacherAssignmentData.name}{" "}
                  {teacherAssignmentData.surname}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Work: {assignmentDesc}...
                </Typography>
                {teacherAssignmentData.submit_date ? (
                  <Typography variant="body2" gutterBottom>
                    Date submitted:{" "}
                    {moment(teacherAssignmentData.submit_date).format("LLL")}
                  </Typography>
                ) : (
                  <Typography variant="body2" gutterBottom>
                    Date submitted:{" "}
                  </Typography>
                )}
                <Typography variant="body2">
                  Mark: {teacherAssignmentData.mark}
                </Typography>
                {teacherAssignmentData.feedback && (
                  <Typography variant="body2" gutterBottom>
                    Feedback: {teacherAssignmentData.feedback}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                <SchoolIcon />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Link>
    </Paper>
  );
}
