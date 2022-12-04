import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import { AppTheme } from "../lib/theme";
import { ThemeProvider } from "@mui/styles";
import {createTheme} from "@mui/material";
import { Container } from "@material-ui/core";

// import "./styles.css"

export default function App() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [amount, setAmount] = React.useState(100);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // Example data (invoice items)
  const invoiceItems = [
    {
      Id : 1,
      Basic: 14,
      Tax: 84.99,
      InvestmentContribution: 84.99,
      Others: 123
      
    }

  ];
  

  const reducer = (acc, value) => acc + value;

  console.log("jisoo", Object.keys(invoiceItems[0]));
  console.log("lisa", invoiceItems.map((item) => item.Id).sort());

  return (
<ThemeProvider theme={createTheme(AppTheme)}>
<Container maxWidth="md">
      <h2 style={{ textAlign: "center" }}>Invoice</h2>
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
            <TableRow>
                <TableCell align="left">
                  <strong>Id : 886</strong>
                  <br/><br/>
                  <strong>Additional Notes</strong>
                </TableCell>
                <TableCell align="left">
                <strong>Account : 14d50eeb-2c46-4202-be39-ecdb1887d15e</strong>
                <br/><br/>
                Payment for December
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="right">{Object.keys(invoiceItems[0])[1]}</TableCell>
                <TableCell align="right">
                  {Object.keys(invoiceItems[0])[2]}
                </TableCell>
                <TableCell align="right">
                  {Object.keys(invoiceItems[0])[3]}
                </TableCell>
                <TableCell align="right">
                  {Object.keys(invoiceItems[0])[4]}
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

              {invoiceItems
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                // .filter((item) => item.subtotal > 0)
                .sort((a, b) => (a.Tax > b.Tax ? 1 : -1))
                .map((item) => {
                  return (
                    <TableRow key={item.Id}>
                      <TableCell align="right">{(amount * 0.65).toFixed(2)}</TableCell>
                      <TableCell align="right">{(amount * 0.15).toFixed(2)} </TableCell>
                      <TableCell align="right">
                        {(amount * 0.2).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        {(amount * 0.05 ).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="right">
                  <strong>Total Amount in EUR</strong>
                </TableCell>
                <TableCell align="right">100
                  {/* {invoiceItems
                    .map((item) => item.subtotal * 0.84)
                    .reduce((acc, value) => acc + value)
                    .toFixed(2)}{" "} */}
                </TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 25, 100]}
          component="div"
          count={invoiceItems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
</ThemeProvider>
  );
}
