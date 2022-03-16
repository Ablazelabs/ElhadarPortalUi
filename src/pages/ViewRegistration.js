import React, { useEffect, useState } from "react";
import { axiosGet, axiosPatch } from "../utils/config";
import "../assets/css/ViewRegistration.css";
import { Checkbox } from "@mui/material";
import { CheckBox } from "@mui/icons-material";
//this component was made with html and jquery( that's why i didnt use a component(only translation from that to this ;) )
const ViewRegistration = () => {
    const [tableData, setTableData] = useState([]);
    const [limit, setLimit] = useState(1);
    const [skip, setSkip] = useState(0);
    const [prevDisabled, setPrevDisabled] = useState(false);
    const [nextDisabled, setNextDisabled] = useState(false);
    const [checkedIds, setCheckedIds] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const rowsPerPage = ({ target }) => {
        const { value } = target;
        if (value < 1 || value > 50) {
            return;
        }
        setLimit(value);
    };
    const onlyUnique = (value, index, self) => self.indexOf(value) === index;
    const next = () => {
        setSkip(skip + limit);
        setPrevDisabled(false);
    };
    const prev = () => {
        setNextDisabled(false);
        if (skip === 0) {
            setPrevDisabled(true);
            return;
        }
        const tempSkip = skip - limit;
        setSkip(tempSkip < 0 ? 0 : tempSkip);
    };
    useEffect(() => {
        const fetchData = async () => {
            const data = await axiosGet(
                "/customer-form",
                { limit, skip },
                true
            );
            if (!data) {
                return;
            }
            const { data: resJson } = data;
            if (resJson.length === 0) {
                setNextDisabled(true);
                setSkip(skip - limit);
                return;
            }
            const tableDataFromHere = resJson.map(
                (
                    {
                        id,
                        name_of_company,
                        streeet_name,
                        aluminum_profile,
                        glass_color,
                        aluminum_color,
                        quantity_remark,
                        sales_rep,
                        full_name,
                        email,
                        region,
                        phone_number,
                        city,
                        isContacted,
                        created_time,
                    },
                    index
                ) => {
                    if (
                        isContacted &&
                        checkedIds.length !==
                            [...checkedIds, id].filter(onlyUnique).length
                    )
                        setCheckedIds((c) => [...c, id].filter(onlyUnique));
                    return (
                        <React.Fragment key={index}>
                            <tr>
                                <td rowSpan="4">
                                    {parseInt(skip) + index + 1 || ""}
                                </td>
                                <td colSpan="2">{name_of_company || "-"}</td>
                                <td rowSpan="2" colSpan="2">
                                    {streeet_name || "-"}
                                </td>
                                <td rowSpan="2">
                                    {aluminum_profile[0] || "-"}
                                </td>
                                <td rowSpan="2">
                                    {aluminum_profile[1] || "-"}
                                </td>
                                <td rowSpan="2">
                                    {aluminum_profile[2] || "-"}
                                </td>
                                <td rowSpan="2">{glass_color[0] || "-"}</td>
                                <td rowSpan="2">{glass_color[1] || "-"}</td>
                                <td rowSpan="2">{aluminum_color[0] || "-"}</td>
                                <td rowSpan="2">{aluminum_color[1] || "-"}</td>
                                <td rowSpan="4">{quantity_remark || "-"}</td>
                                <td rowSpan="4">{sales_rep || "-"}</td>
                                <td rowSpan="4">
                                    {checkedIds.indexOf(id) !== -1 ? (
                                        <CheckBox selected disabled />
                                    ) : (
                                        <Checkbox
                                            selected={false}
                                            onChange={({ target }) => {
                                                target.checked && updatedId(id);
                                            }}
                                        />
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">{full_name || "-"}</td>
                            </tr>
                            <tr>
                                <td colSpan="2">{email || "-"}</td>
                                <td colSpan="2">{region || "-"}</td>
                                <td>{aluminum_profile[3] || "-"}</td>
                                <td>{aluminum_profile[4] || "-"}</td>
                                <td>{aluminum_profile[5] || "-"}</td>
                                <td>{glass_color[2] || "-"}</td>
                                <td>{glass_color[3] || "-"}</td>
                                <td>{aluminum_color[2] || "-"}</td>
                                <td>{aluminum_color[3] || "-"}</td>
                            </tr>
                            <tr>
                                <td colSpan="2">{phone_number || "-"}</td>
                                <td colSpan="2">{city || "-"}</td>
                                <td>{aluminum_profile[6] || "-"}</td>
                                <td>{aluminum_profile[7] || "-"}</td>
                                <td>{aluminum_profile[8] || "-"}</td>
                                <td>{glass_color[4] || "-"}</td>
                                <td>{glass_color[5] || "-"}</td>
                                <td>{aluminum_color[4] || "-"}</td>
                                <td>{aluminum_color[5] || "-"}</td>
                            </tr>
                            <tr>
                                <td colSpan="12" className="separatorRow"></td>
                                <td colSpan={3}>
                                    {new Date(created_time).toDateString()}
                                </td>
                            </tr>
                        </React.Fragment>
                    );
                }
            );
            setTableData(tableDataFromHere);
        };
        const updatedId = async (id) => {
            setCheckedIds((c) => [...c, id]);
            try {
                const patched = await axiosPatch(
                    "/customer-form",
                    { id },
                    true
                );
                if (!patched) {
                    console.log("something went wrong");
                    return;
                }
            } catch {}
        };

        fetchData();
        setInterval(() => {
            setRefresh(!refresh);
        }, 600000);
    }, [limit, skip, checkedIds, refresh]);
    return (
        <div id="headDiv">
            <table id="specialTable">
                <thead>
                    <tr style={{ position: "sticky", top: "7ch" }}>
                        <th rowSpan="2">index</th>
                        <th rowSpan="2" colSpan="2">
                            Personal Detail
                        </th>
                        <th rowSpan="2" colSpan="2">
                            Address
                        </th>
                        <th rowSpan="1" colSpan="7">
                            Project Details
                        </th>
                        <th rowSpan="2">Quantity &amp; Remark</th>
                        <th rowSpan="2">Sales Rep</th>
                        <th rowSpan="2">Contacted</th>
                    </tr>
                    <tr style={{ position: "sticky", top: "12ch" }}>
                        <td colSpan="3">Aluminum Profile</td>
                        <td colSpan="2">Glass Color</td>
                        <td colSpan="2">Aluminum Color</td>
                    </tr>
                </thead>
                <tbody>{tableData}</tbody>
            </table>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    float: "right",
                }}
            >
                Rows Per Page
                <input
                    className="specialInput"
                    type="number"
                    max={50}
                    min={1}
                    id="rowsPerPage"
                    value={limit}
                    onChange={rowsPerPage}
                />
                <button
                    className="specialButton"
                    id="prev"
                    disabled={prevDisabled}
                    onClick={prev}
                >
                    <i className="fa fa-arrow-left"></i> Previous
                </button>
                <button
                    className="specialButton"
                    id="next"
                    disabled={nextDisabled}
                    onClick={next}
                >
                    Next <i className="fa fa-arrow-right"></i>
                </button>
            </div>
        </div>
    );
};
export default ViewRegistration;
