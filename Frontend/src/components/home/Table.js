import { Box, Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import { useDispatch } from "react-redux";
import { saveDescription } from "../../actions/modelAction";
import { BACKEND_BASE_URL } from "../../config/config.js";
import axios from "axios";
import Cookies from "js-cookie";
import "../../App.css";
import LoadingDialog from "./LoadingDialog";

const TableComponent = ({ rows, setPosts }) => {
  const dispatch = useDispatch();
  const csrfToken = Cookies.get("csrftoken");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-CSRFToken": csrfToken,
    },
  };
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleRemove = (id, evt) => {
    axios
      .delete(BACKEND_BASE_URL + id + `/`, config)
      .then((res) => {
        setPosts(res.data);
        console.log("payload", res);
        dispatch({ type: "GET_REVIEW_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [loadingOpen, setLoadingOpen] = useState(false);
  const handleOpen = (id) => {
    setLoadingOpen(true);
    axios
      .post(BACKEND_BASE_URL + 'dashboard/' + id + '/', config)
      .then(res => {
        console.log(res.data);
        if(res.data === 'Success') navigate('/model');
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  return (
    <Grid>
      <TableContainer sx={{ width: "100%", backgroundColor: "#ffffff", borderRadius: "15px", border: "1px solid lightgrey" }}
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                size="small"
                align="left"
                sx={{
                  fontFamily: "SF Pro Display",
                  fontSize: "1rem",
                  fontWeight: "700",
                }}
              >
                Open
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontFamily: "'SF Pro Display', sans-serif",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                Name
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontFamily: "'SF Pro Display', sans-serif",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                Type
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontFamily: "'SF Pro Display', sans-serif",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                Algorithm
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontFamily: "'SF Pro Display', sans-serif",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                Score
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontFamily: "'SF Pro Display', sans-serif",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * 5, page * 5 + 5).map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <IconButton onClick={() => handleOpen(row.id)}>
                    <OpenInNewIcon />
                  </IconButton>
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontFamily: "'SF Pro Display', sans-serif",
                    fontSize: "1rem",
                  }}
                >
                  {row.model_name}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontFamily: "'SF Pro Display', sans-serif",
                    fontSize: "1rem",
                  }}
                >
                  {row.model_type}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontFamily: "'SF Pro Display', sans-serif",
                    fontSize: "1rem",
                  }}
                >
                  {row.algorithm_name}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontFamily: "'SF Pro Display', sans-serif",
                    fontSize: "1rem",
                  }}
                >
                  {row.overall_score}
                </TableCell>
                <TableCell align="left">
                  <IconButton color="error" onClick={(evt) => handleRemove(row.id, evt)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={rows.length}
                rowsPerPage={5}
                page={page}
                rowsPerPageOptions={[]}
                onPageChange={handleChangePage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <LoadingDialog
        open={loadingOpen}
        setOpen={setLoadingOpen}
      />
    </Grid>
  );
};

export default TableComponent;
