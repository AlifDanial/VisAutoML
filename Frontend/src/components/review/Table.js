import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import { useSelector } from "react-redux";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const CustomTooltip = withStyles({
  tooltip: {
    minWidth: "450px",
    textAlign: "center",
  }
})(Tooltip);

const TableComponent = ({ descrip, setDescrip, tooltipId, setTooltipId }) => {
  const { response, description } = useSelector((state) => state.model);
  const [page, setPage] = useState(0);
  const columnsPerPage = 8; // Number of data columns per page

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleOpen = () => { };

  const handleClose = () => { };

  useEffect(() => {
    if (description && description.description) {
      setDescrip(description.description);
    }
  }, [description]);

  const onChange = (e, name) => {
    let new_descr = { ...descrip };
    new_descr[name] = e.target.value;
    setDescrip(new_descr);
  };

  const rowStyle = {
  height: '65px', // Set the desired height
  '&:last-child td, &:last-child th': { border: 0 },
};

  return (
    <CustomTooltip
      open={(tooltipId === 17 || tooltipId === 18) ? true : false}
      onOpen={handleOpen}
      onClose={handleClose}
      title={
        tooltipId === 17 ? (
          <Box padding="10px" display="flex" flexDirection="column" gap="10px">
            <Typography>Columns are also known as features or variables in ML
              prediction.</Typography>
            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" startIcon={<ArrowBackIos />} onClick={() => setTooltipId(16)}>PREVIOUS</Button>
              <Button variant="contained" endIcon={<ArrowForwardIos />} onClick={() => setTooltipId(18)}>NEXT</Button>
            </Box>
          </Box>
        ) : (
          <Box padding="10px" display="flex" flexDirection="column" gap="10px">
            <Typography>{"Review the percentage empty per column, >50% empty makes the column/feature less reliable for prediction."}</Typography>
            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" startIcon={<ArrowBackIos />} onClick={() => setTooltipId(17)}>PREVIOUS</Button>
              <Button variant="contained" endIcon={<ArrowForwardIos />} onClick={() => setTooltipId(19)}>NEXT</Button>
            </Box>
          </Box>
        )
      }
      placement={tooltipId === 17 ? "left" : 'bottom-start'}
      arrow
    >
<TableContainer component={Paper} sx={{ backgroundColor: "#ffffff" }}>
      <Table>
        <TableBody>
          {/* Header Row for 'Name' */}
          <TableRow sx={rowStyle}>
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
            {response && response.result.slice(page * columnsPerPage, page * columnsPerPage + columnsPerPage).map((row) => (
              <TableCell
                key={row.name}
                align="left"
                sx={{
                  fontFamily: "Open Sans",
                  fontSize: "1rem",
                }}
              >
                {row.name}
              </TableCell>
            ))}
          </TableRow>
          
          {/* Header Row for 'Empty' */}
          <TableRow sx={rowStyle}>
            <TableCell
              align="left"
              sx={{
                fontFamily: "'SF Pro Display', sans-serif",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              {"Empty (%)"}
            </TableCell>
            {response && response.result.slice(page * columnsPerPage, page * columnsPerPage + columnsPerPage).map((row) => (
              <TableCell
                key={row.name}
                align="left"
                sx={{
                  fontFamily: "Open Sans",
                  fontSize: "1rem",
                }}
              >
                {row.empty}%
              </TableCell>
            ))}
          </TableRow>
          
          {/* Header Row for 'Fit For Use' */}
          <TableRow sx={rowStyle}>
            <TableCell
              align="left"
              sx={{
                fontFamily: "'SF Pro Display', sans-serif",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              Fit For Use
            </TableCell>
            {response && response.result.slice(page * columnsPerPage, page * columnsPerPage + columnsPerPage).map((row) => (
              <TableCell
                key={row.name}
                align="left"
                sx={{
                  fontFamily: "Open Sans",
                  fontSize: "1rem",
                }}
              >
                {row.fit_for_use ? "Yes" : "No"}
              </TableCell>
            ))}
          </TableRow>
          
          {/* Header Row for 'Data Type' */}
          <TableRow sx={rowStyle}>
            <TableCell
              align="left"
              sx={{
                fontFamily: "'SF Pro Display', sans-serif",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              Data Type
            </TableCell>
            {response && response.result.slice(page * columnsPerPage, page * columnsPerPage + columnsPerPage).map((row) => (
              <TableCell
              key={row.name}
              align="left"
              sx={{
                fontFamily: "Open Sans",
                fontSize: "1rem",
              }}
            >
              {row.type === "int64" || row.type === "float64" ? "numeric" : "text"}
            </TableCell>
            
            ))}
          </TableRow>
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={response ? response.result.length : 0}
        rowsPerPage={columnsPerPage}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[]}
        sx={{
          '.MuiTablePagination-toolbar': {
            justifyContent: 'center'
          }
        }}
      />
    </TableContainer>

    </CustomTooltip>
  );
};

export default TableComponent;
