import React, { useState } from "react";
import "./homepage.css";
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import axios from "axios";
import { calcAppHRA1, calcAppHRA2, calcTaxInc } from "./Calc";

const Homepage = ({ setLoginUser }) => {

    const [para, setPara] = useState({
        Bas: "",
        LTA: "",
        HRA: "",
        FA: "",
        Inv: "",
        Rent: "",
        CityType: "",
        Med: "",
    })

    const [taxInc, setTaxInc] = useState("");

    const handleChange = e => {
        const { name, value } = e.target
        setPara({
            ...para,   //... => spread operator used to update value without affecting other values
            [name]: value
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let AppHRA;
        if (para.CityType === "Metro") {

            AppHRA = calcAppHRA1(para.Bas, para.Rent, para.HRA)
        }
        else if (para.CityType === "Non metro") {

            AppHRA = calcAppHRA2(para.Bas, para.Rent, para.HRA)
            // setPara({
            //     [para.AppHRA]: minVal
            // })
        }
        else {
            alert("invalid input")
        }

        let TaxInc = calcTaxInc(para.Bas, para.LTA, para.HRA, para.FA, AppHRA, para.Inv, para.Med)

        axios.post("http://localhost:3030/homepage", para)
            .then(res => {
                alert(res.data.message)
                setTaxInc(TaxInc)
                setPara({
                    Bas: "",
                    LTA: "",
                    HRA: "",
                    FA: "",
                    Inv: "",
                    Rent: "",
                    CityType: "",
                    Med: "",
                    AppHRA: ""
                })
                // navigate("/")
            }) 
    }

    return (
        <form className="homepage" onSubmit={handleFormSubmit}>
            <h1>Taxable Income Calculator</h1>
            <p>Enter following parameters:</p>
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">Bas</InputGroup.Text>
                <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    type="number"
                    name="Bas"
                    value={para.Bas}
                    placeholder="Enter Basic"
                    onChange={handleChange}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">LTA</InputGroup.Text>
                <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    type="number"
                    name="LTA"
                    value={para.LTA}
                    placeholder="Enter LTA"
                    onChange={handleChange}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">HRA</InputGroup.Text>
                <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    type="number"
                    name="HRA"
                    value={para.HRA}
                    placeholder="Enter HRA"
                    onChange={handleChange}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">FA</InputGroup.Text>
                <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    type="number"
                    name="FA"
                    value={para.FA}
                    placeholder="Enter Food Allowance"
                    onChange={handleChange}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">Inv</InputGroup.Text>
                <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    type="number"
                    name="Inv"
                    value={para.Inv}
                    placeholder="Enter Investments under section 80C"
                    onChange={handleChange}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">Rent</InputGroup.Text>
                <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    type="number"
                    name="Rent"
                    value={para.Rent}
                    placeholder="Enter Actual Rent paid"
                    onChange={handleChange}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">City Type</InputGroup.Text>
                <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    type="text"
                    name="CityType"
                    value={para.CityType}
                    placeholder="Enter Metro/Non metro"
                    onChange={handleChange}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">Med</InputGroup.Text>
                <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    type="number"
                    name="Med"
                    value={para.Med}
                    placeholder="Enter Mediclaim policy premium paid"
                    onChange={handleChange}
                />
            </InputGroup>
            <Button type="submit" variant="outline-primary" >Submit</Button>
            <div className="output">Taxable Income: {taxInc}</div>
            <div className="button" onClick={() => setLoginUser({})} >Logout</div>
        </form>
    );
}

export default Homepage;