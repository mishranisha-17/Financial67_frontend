import React, { useState } from 'react'

import { Button, Container, Grid, TextField, Typography } from "@mui/material";

function CashFlowStatementForm() {
  const [formData, setFormData] = useState({
    companyId: "",
    year: "",
    cash_equivalent_and_restricted_cash_at_the_beginning_of_year: "",
    operating_activities: {
      net_income: "",
    },
    adjustment_for_non_cash_items: {
      depreciation_and_amortization: "",
      share_based_compensation_expense: "",
      other_item_1: "",
      other_item_2: "",
    },
    investing_activities: {
      net_sale_purchase_of_marketable_securities: "",
      capital_expenditure_purchase_of_ppe: "",
      business_acquisitions_net: "",
      other_item_1: "",
      other_item_2: "",
    },
    financing_activities: {
      dividends_and_equivalents: "",
      net_repurchase_of_common_stock: "",
      net_issuance_repayments_of_debt_and_commercial_paper: "",
      other_item_1: "",
      payments_for_taxes_related_to_net_share_settlement_of_equity_awards: "",
    },
  });

  const [cashFlowData, setCashFlowData] = useState([]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    const [sectionName, fieldName] = name.split(".");
    setFormData({
      ...formData,
      [sectionName]: { ...formData[sectionName], [fieldName]: value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/cashflowstatement/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert("Cash Flow Statement created successfully!");
      } else {
        const errorData = await response.json();
        console.error(errorData);
        alert("Error creating Cash Flow Statement");
      }
    } catch (error) {
      console.error(error);
      alert("Error creating Cash Flow Statement");
    }
  };

  const handleShowData = async () => {
    try {
      const response = await fetch("http://localhost:3001/cashflowstatement");

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCashFlowData(data);
      } else {
        const errorData = await response.json();
        console.error(errorData);
        alert("Error fetching Cash Flow Statement data");
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching Cash Flow Statement data");
    }
  };

  return (
    <Container maxWidth="md">
      <h1>Cash Flow Statement</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Company ID"
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Year"
              name="year"
              type="number"
              value={formData.year}
              onChange={handleChange}
            />
          </Grid>
          {Object.keys(formData).map((section) => {
            if (section === "companyId" || section === "year") return null;
            return (
              <React.Fragment key={section}>
                <Grid item xs={12}>
                  <Typography variant="h6">{section.replace(/_/g, " ")}</Typography>
                </Grid>
                {Object.keys(formData[section]).map((key) => (
                  <Grid item xs={12} sm={6} key={`${section}_${key}`}>
                    <TextField
                      fullWidth
                      label={key.replace(/_/g, " ")}
                      name={`${section}.${key}`}
                      type="number"
                      value={formData[section][key]}
                      onChange={handleChange}
                    />
                  </Grid>
                ))}
              </React.Fragment>
            );
          })}
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" sx={{ marginRight: 1 }}>
            Submit
          </Button>
          <Button variant="contained" color="secondary" onClick={handleShowData}>
            Show Data
          </Button>
        </Grid>
      </form>
      {cashFlowData.length > 0 && (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            Cash Flow Statement Data
          </Typography>
          <pre>{JSON.stringify(cashFlowData, null, 2)}</pre>
        </>
      )}
    </Container>
  );
}
export default CashFlowStatementForm;