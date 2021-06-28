import React, { useState, useEffect } from "react";
import LoggedHeader from "../header";

function Feedback() {
  let data = [
    {"USER_ID": "OG1",
    "FUNCTION":"PICKING",
    "SUB_FUNCTION":"0 Picking",
    "TYPE":"Actual",
    "HOUR_BUCKET":2,
    "LINES":41.0,
    "MEASURED_MIN":57.6,
    "DATE":"2021-06-12",
    "currentSub": "Mix Picking",
    "overridenfn":"","reasons":""
    }  ,
    {"USER_ID": "CL13",
        "FUNCTION":"PUTAWAY",
        "SUB_FUNCTION":"Case Pull",
        "TYPE":"Actual",
        "HOUR_BUCKET":2,
        "LINES":11.0,
        "MEASURED_MIN":43.2,
        "DATE":"2021-06-12",
        "currentSub": "Mix Picking",
        "overridenfn":"","reasons":""
        } ,
        {"USER_ID": "JM12",
            "FUNCTION":"PUTAWAY",
            "SUB_FUNCTION":"Case Pull",
            "TYPE":"Actual",
            "HOUR_BUCKET":2,
            "LINES":7.0,
            "MEASURED_MIN":37.2,
            "DATE":"2021-06-12",
            "currentSub": "Mix Picking",
            "overridenfn":"","reasons":""
            } ,
            {"USER_ID": "WH1",
                "FUNCTION":"PUTAWAY",
                "SUB_FUNCTION":"Case Pull",
                "TYPE":"Actual",
                "HOUR_BUCKET":2,
                "LINES":10.0,
                "MEASURED_MIN":55.2,
                "DATE":"2021-06-12",
                "currentSub": "Mix Picking",
                "overridenfn":"","reasons":""
                } ,
                {"USER_ID": "CV2",
                    "FUNCTION":"PUTAWAY",
                    "SUB_FUNCTION":"Case Pull",
                    "TYPE":"Actual",
                    "HOUR_BUCKET":2,
                    "LINES":10.0,
                    "MEASURED_MIN":42.0,
                    "DATE":"2021-06-12",
                    "currentSub": "Mix Picking",
                    "overridenfn":"","reasons":""
                    }  
  ];

  const [items, setItems] = useState(data);
  
  const [checkAll, setCheckAll] = useState(false);
  const Table = (props) => {
    console.log(props);
    return (
      <>
        {props.items.map((item, i) => (
          <tr key={i}>
            {/* <th scope="row">
              <input type="checkbox" class="singlechkbox" name={item.userId} />
            </th> */}
            <td scope="row">{item.USER_ID}</td>
            <td>{item.currentSub}</td>
            <td>{item.SUB_FUNCTION}</td>
            <td>
              <select name="overridenfn" id="overridenfn" className="p-1"  value={item.overridenfn} onChange={(e)=>alert(e.target.value)}>
                <option disabled selected value>
                  {" "}
                  none{" "}
                </option>
                <option value="Incont Picking">Incont Picking</option>
                <option value="Mix Picking">Mix Picking</option>
                <option value="0 Picking">0 Picking</option>
                <option value="Enteral Picking">Enteral Picking</option>
                <option value="Enteral Packing">Enteral Packing</option>
                <option value="Numina Packing">Numina Packing</option>
                <option value="Manual Packing">Manual Packing</option>
              </select>
            </td>
            <td>
              <select name="reasons" id="reasons" className="p-1"  value={item.reasons} onChange={(e)=>alert(e.target.value)}>
                <option disabled selected value>
                  {" "}
                  none{" "}
                </option>
                <option value="Cross Train">Cross Train</option>
                <option value="Missed Service">Missed Service</option>
                <option value="Receiving Priority">Receiving Priority</option>
                <option value="Heavy Volume">Heavy Volume</option>
                <option value="Future Dated Orders">Future Dated Orders</option>
                <option value="Manager Override">Manager Override</option>
                <option value="Equipment down – PackSize">Equipment down – PackSize</option>
                <option value="Equipment Down – Numina">Equipment Down – Numina</option>
                <option value="Disaster Recovery">Disaster Recovery</option>
                <option value="New Business">New Business</option>
              </select>
            </td>
          </tr>
        ))}
      </>
    );
  };
  const handleCheckAll = () => {
    setCheckAll(!checkAll);
  };

  return (
    <>
      <LoggedHeader />
      <div className="container" style={{ paddingTop: "5.2em" }}>
        <h5>Feedback loop for cross-training</h5>
        <div className="horizontal-custom"></div>
        <div className="contentDisplay pt-4">
          <div className="justify-content-center align-items-center">
            <div className="text-center headerSection">
              <p className="m-0 pt-2 timeSlot">Upcoming Time Slot</p>
              <p className="m-0 pb-2 timerCSS">11:00 PM - 1:00 PM</p>
            </div>
          </div>
        </div>
        <div className="contentContainer">
          <p className="text-center pt-3">
            Floor manager will have to make sure they are submitting this data
            before start of work in that hour bucket
          </p>
          <div className="d-flex flex-start">
            <div className="text-center d-flex">
              <div
                className="grayBackground p-3"
                style={{ marginLeft: "15px" }}
              >
                <div>
                  <p className="mb-0">Orders outstanding </p>
                </div>
                <div>
                  <p className="mb-0">1003</p>
                </div>
              </div>

              <div
                className="grayBackground p-3"
                style={{ marginLeft: "15px" }}
              >
                <div>
                  <p className="mb-0">Orders Completed </p>
                </div>
                <div>
                  <p className="mb-0">3003</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-3">
            <table className="table ml-3">
              <thead className="tableHeader">
                <tr>
                  {/* <th scope="col"> */}
                    {/* <input
                      type="checkbox"
                      id="selectall"
                      onChange={handleCheckAll}
                      checked={checkAll}
                    /> */}
                  {/* </th> */}
                  <th scope="col">User ID</th>
                  <th scope="col">Current Subfunction</th>
                  <th scope="col">Recommended Subfunction</th>
                  <th scope="col">Overridden Subfunction</th>
                  <th scope="col">Reason</th>
                </tr>
              </thead>
              <tbody>
                <Table items={items} parentState={checkAll} />
              </tbody>
            </table>
            <div className="d-flex">
              <button
                type="submit"
                className="btn btn-secondary btn-block btn-style"
              >
              ACCEPT ALL
              </button>
              <button
                style={{ marginLeft: "auto" }}
                type="submit"
                className="btn btn-secondary btn-block btn-style"
              >
                  SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Feedback;
