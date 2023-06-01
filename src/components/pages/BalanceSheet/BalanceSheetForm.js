import React, { useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";

function BalanceSheetForm() {
  const [formData, setFormData] = useState({
    companyId: "",
    year: "",
    current_assets: {
      cash_and_cash_equivalents: "",
      marketable_securities: "",
      accounts_receivablenet: "",
      inventories: "",
      vendor_non_trade_receivables: "",
      other_current_assets: "",
      deferred_taxes_sets: "",
      other_items_2: "",
    },
    non_current_assets: {
      marketable_securities: "",
      Property_Plant_Equipment_Net: "",
      Other_Non_Current_Assets: "",
      Goodwill: "",
      Acquired_Intangible_Assets: "",
    },
    current_liabilities: {
      Accounts_Payable: "",
      Other_Current_Liabilities: "",
      Deferred_Revenue: "",
      Commercial_Paper: "",
      Term_Debt: "",
      Accrued_Expenses: "",
      Other_Item_2: "",
    },
    non_current_liabilities: {
      Term_Debt: "",
      Other_Non_Current_Liabilities: "",
      Deferred_Revenue: "",
      Other_Item_2: "",
    },
    share_holders_equity: {
      common_stock_and_additional_paid_in_capital: "",
      retained_earnings_accumulated_deficit: "",
      accumulated_other_comprehensive_income_Loss: "",
      Other_Item_1: "",
      Other_Item_2: "",
    },
  });
  const [balanceSheetData, setBalanceSheetData] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/balancesheet/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert("Balance sheet created successfully!");
      } else {
        const errorData = await response.json();
        console.error(errorData);
        alert("Error creating balance sheet");
      }
    } catch (error) {
      console.error(error);
      alert("Error creating balance sheet");
    }
  };
  const handleShowData = async () => {
    try {
      const response = await fetch("http://localhost:3001/balancesheet");

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setBalanceSheetData(data);
      } else {
        const errorData = await response.json();
        console.error(errorData);
        alert("Error fetching balance sheet data");
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching balance sheet data");
    }
  };

  return (
    <Container maxWidth="md">
      <h1>Balance Sheet</h1>
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
                      onChange={(e) => {
                        const { name, value } = e.target;
                        const [sectionName, fieldName] = name.split(".");
                        setFormData({
                          ...formData,
                          [sectionName]: { ...formData[sectionName], [fieldName]: value },
                        });
                      }}
                    />
                  </Grid>
                ))}
              </React.Fragment>
            );
          })}

          {Object.keys(formData).map((section) => {
            if (section === "companyId" || section === "year") return null;
            return Object.keys(formData[section]).map((key) => (
              <Grid item xs={12} sm={6} key={`${section}_${key}`}>
                <TextField
                  fullWidth
                  label={key.replace(/_/g, " ")}
                  name={`${section}.${key}`}
                  type="number"
                  value={formData[section][key]}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    const [sectionName, fieldName] = name.split(".");
                    setFormData({
                      ...formData,
                      [sectionName]: { ...formData[sectionName], [fieldName]: value },
                    });
                  }}
                />
              </Grid>
            ));
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
      {balanceSheetData.length > 0 && (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            Balance Sheet Data
          </Typography>
          <pre>{JSON.stringify(balanceSheetData, null, 2)}</pre>
        </>
      )}
    </Container>
  );
}

export default BalanceSheetForm;