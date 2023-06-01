import React, { useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";


function Company() {
  const [CompanyName, setCompanyName] = useState("");
  const [CompanyDetail, setCompanyDetail] = useState("");
  const [ProjectDetail, setProjectDetail] = useState("");
  const [CompanySector, setCompanySector] = useState("");
  const [CompanyDataCreationDate, setCompanyDataCreationDate] = useState("");
  const [User, setUser] = useState("");

  const [formData, setFormData] = useState();
  
  const [Company, setCompany] = useState([]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const check={companyName:CompanyName,
      companyDetail:CompanyDetail,
      projectDetail:ProjectDetail,
      companySector:CompanySector,
      companyDataCreationDate:CompanyDataCreationDate,
      user:User}
      console.log('check: ', check);
    setFormData({
      companyName: CompanyName,
      companyDetail: CompanyDetail,
      projectDetail: ProjectDetail,
      companySector: CompanySector,
      companyDataCreationDate: CompanyDataCreationDate,
      user: User,
    });
    console.log('formData: ', formData);

    try {
      const response = await fetch("http://localhost:3001/company/addcompany", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(check),
      });
      console.log("formData: ", formData);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert("Company model created successfully!");
      } else {
        const errorData = await response.json();
        console.error(errorData);
        alert("Error creating Company model");
      }
    } catch (error) {
      console.error(error);
      alert("Error creating Company model");
    }
  };
  const handleShowData = async () => {
    try {
      const response = await fetch("http://localhost:3001/company/companies");

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCompany(data);
      } else {
        const errorData = await response.json();
        console.error(errorData);
        alert("Error fetching Company model data");
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching Company model data");
    }
  };

  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Company name"
              name="companyname"
              value={CompanyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="companyDetail"
              name="companyDetail"
              type="text"
              value={CompanyDetail}
              onChange={(e) => setCompanyDetail(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="projectDetail"
              name="projectDetail"
              type="text"
              value={ProjectDetail}
              onChange={(e) => setProjectDetail(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="companySector"
              name="companySector"
              type="text"
              value={CompanySector}
              onChange={(e) => setCompanySector(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="companyDataCreationDate"
              name="companyDataCreationDate"
              type="date"
              value={CompanyDataCreationDate}
              onChange={(e) => setCompanyDataCreationDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="user"
              name="user"
              type="text"
              value={User}
              onChange={(e) => setUser(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginRight: 1 }}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleShowData}
          >
            Show Data
          </Button>
        </Grid>
      </form>
      {Company.length > 0 && (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            Company Data
          </Typography>
          <pre>{JSON.stringify(Company, null, 2)}</pre>
        </>
      )}
    </Container>
  );
}

export default Company;
