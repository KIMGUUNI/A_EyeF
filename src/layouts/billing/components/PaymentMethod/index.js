/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
// import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// Images

// Material Dashboard 2 React context
import Dialog from "@mui/material/Dialog";
import { useState, useEffect} from "react";
import Payment from "../Payment";

function PaymentMethod({ result }) {
  console.log("result3",result)
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    if (result) {
      let sum = 0;
      result.forEach(row => {
        // 금액이 숫자인 경우에만 합산
        if (!isNaN(row.금액)) {
          sum += parseInt(row.금액);
        }
      });
      setTotalAmount(sum);
    }
  }, [result]);

  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);

  const handleOpenAddCardModal = () => {
    setIsAddCardModalOpen(true);
  };

  const handleCloseAddCardModal = () => {
    setIsAddCardModalOpen(false);
  };

  return (
    <Card id="delete-account">
        <MDButton variant="gradient" color="dark" onClick={handleOpenAddCardModal}
        style={{ minWidth: '200px', minHeight: '70px', fontSize: '1.2rem' }}>
          &nbsp; 결제하기
        </MDButton>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
          </Grid>
          <Grid item xs={12} md={6}>
          </Grid>
        </Grid>
      <Dialog open={isAddCardModalOpen} onClose={handleCloseAddCardModal}>
        {isAddCardModalOpen && <Payment onCloseModal={handleCloseAddCardModal} totalAmount={totalAmount} result={result} />}
      </Dialog>
    </Card>
  );
}


export default PaymentMethod;
