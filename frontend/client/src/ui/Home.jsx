import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Grid,
  Button,TextField,
  Typography,
  createTheme,
  ListItem,
  ThemeProvider,
  Stack,
  Alert,
  AlertTitle
} from "@mui/material";
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { useNavigate } from "react-router-dom";
import { AppTheme } from "../lib/theme";
import { MyContractContext } from "../lib/MyContractContext";

import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import zkBobService, { payToSubscriber } from "../services/zkBobService";
import zIndex from "@mui/material/styles/zIndex";


const Home = (props) => {
  const rows = [
    {
      id: 1,
      col1: "Alice",
      col2: "0x2ce15a8e487983c21faec460a7a6b745dcf083d10b6beadad3f58fd1db902ab4",
      col3: 3,
      col4: "Not Subscribed",
    },
    {
      id: 2,
      col1: "Bob",
      col2: "0x154191681c7ab472b76d3421ce2564afd90dd717fe6f504627cc978f3b725215",
      col3: 1,
      col4: "Subscribed",
    },
    {
      id: 3,
      col1: "Carol",
      col2: "0x1eec7c4b58c66f68a6044798e031d2c01cb6ed45e0745fee1db22fd04862b92c",
      col3: 0,
      col4: "Not Subscribed",
    },
  ];

  const columns = [
    { field: "col2", headerName: "Receiver Address", width: 150 },
    { field: "col3", headerName: "Amount", width: 150 },
    { field: "col1", headerName: "Name", width: 150 },
    { field: "col4", headerName: "Status", width: 150 },
  ];
  const MyContract = useContext(MyContractContext);
  const [data, setData] = useState(0);
  const [showReceipt, setReceipt] = useState(false);
  const [showToast,setToast] = useState(false);
  const [txInitiated, updateTxState] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [memo, setMemo] = useState(false);
  const navigate = useNavigate();
  const handleAction = () => {
    // Do some actions here...
    var requestOptions = {
      "Content-Type": "application/json",
      Accept: "application/json",
      method: "GET",
      mode: "no-cors",
      redirect: "follow",
    };
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToast(false);
};

const updateMemo = (event, item) => {
  console.log(item);
  console.log(event.target.value);
    setMemo(item);
}

  const initiatePayment = () => {
    setToast(true);
    updateTxState(true);
      

    payToSubscriber().then(result => {
      var msg = "Transaction RequestId: "+result;
      <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={showToast}
      autoHideDuration={3000}
      action={
        <Button color="inherit" size="small" onClick={handleClose}>
          Close
        </Button>
      }
      message={msg}
      key={'topright'}
      />
      console.log(result)
    })
  }

  const getReceipt = () => {
    setReceipt(!showReceipt)
  }

  const upatetxHash = (event, item) => {
    console.log(item);
    console.log(event.target.value);
    setTxHash(event.target.value)
  }

  const payToSubcriber = () => {
    zkBobService.payToSubscriberReceipt(txHash);
    setToast(true);
  }

  useEffect(() => {
    MyContract?.deployed()
      ?.then(async function (instance) {
        // Do something with instance...
      })
      ?.catch((e) => {
        // Failed to load web3, accounts, or contract. Check console for details.
        // console.error(e);
      });
  });

  return (
    <ThemeProvider theme={createTheme(AppTheme)}>
{showToast ?                       <Snackbar
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    open={showToast}
    autoHideDuration={3000}
    action={
      <Button color="inherit" size="small" onClick={handleClose}>
        Close
      </Button>
    }
    message="Transaction Initiated!"
    key={'topright'}
    /> : ""}
      {showReceipt ? "" :       <div>

        <Box sx={{ p: 3, pt: 10, flexGrow: 1 }}>

          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >

            <Grid item container xs={12} md={8} lg={8} justifyContent="center">
              <Stack direction="column">

                {/* <Typography component="div" align="center" gutterBottom>
                <img
                  alt=""
                  style={{ height: 250 }}
                  src="Ethereum_Two Color.svg"
                />
              </Typography> */}
                {/* <Typography variant="h8" align="center" gutterBottom>
                Welcome to React+Mui truffle box
              </Typography> */}
              </Stack>
            </Grid>
            <div
              align="center"
              justifyContent="center"
              style={{ height: 300, width: "50%" }}
            >
              <DataGrid rows={rows} columns={columns} />
              <div></div>
            </div>
          </Grid>
        </Box>

        <Box textAlign="center">


          <div>
          {txInitiated ? 
          <div>
            <TextField id="outlined-basic" label="Receipt Memo" variant="outlined" onChange={updateMemo}/>
            <br/>
            <TextField id="outlined-basic" label="Tx Hash" variant="outlined" onChange={upatetxHash}/>
            <br />
                  <br />
        
                  <Button
                    size="large"
                    target="_blank"
                    align="left"
                    color="primary"
                    disableElevation
                    variant="contained"
                    onClick={payToSubcriber}
                  >
                    Submit Receipt Information 
                  </Button>
            </div>
          :   <div>
             <Button
          size="large"
          target="_blank"
          color="primary"
          disableElevation
          variant="contained"
          onClick={initiatePayment}
          textAlign="right"
        >
          Pay Payroll Subscribers
        </Button> 
                  <br />
                  <br />
        
                  <Button
                    size="large"
                    target="_blank"
                    align="left"
                    color="primary"
                    disableElevation
                    variant="contained"
                    onClick={() => navigate("/Receipt")}
                  >
                    View Subscribers Receipt
                  </Button>
          </div>       
        }
          </div>

        </Box>

        <Box textAlign="right">
          <div>
            <br />
            <br />

          </div>
        </Box>

      </div>}

    </ThemeProvider>
  );
};

export default Home;
