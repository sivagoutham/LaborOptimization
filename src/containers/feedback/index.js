import React, { useState, useEffect } from "react";
import LoggedHeader from "../header";

function Feedback() {
  let data = [
    {
      userId: "ABC001",
      currentSub: "Mix Picking",
      RecommandedSub: "Enternal Picking",
    },
    {
      userId: "ABC002",
      currentSub: "Mix Picking",
      RecommandedSub: "Enternal Picking",
    },
    {
      userId: "ABC003",
      currentSub: "Mix Picking",
      RecommandedSub: "Enternal Picking",
    },
    {
      userId: "ABC004",
      currentSub: "Mix Picking",
      RecommandedSub: "Enternal Picking",
    },
    {
      userId: "ABC005",
      currentSub: "Mix Picking",
      RecommandedSub: "Enternal Picking",
    },
  ];
  const [items, setItems] = useState(data);
  
  const [checkAll, setCheckAll] = useState(false);

  const Table = (props) => {
    console.log(props);
    return (
      <>
        {props.items.map((item, i) => (
          <tr key={i}>
            <th scope="row">
              <input type="checkbox" class="singlechkbox" name={item.userId} />
            </th>
            <td>{item.userId}</td>
            <td>{item.currentSub}</td>
            <td>{item.RecommandedSub}</td>
            <td>
              <select name="cars" id="cars" className="p-1">
                <option disabled selected value>
                  {" "}
                  -- select an option --{" "}
                </option>
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
            </td>
            <td>
              <select name="cars" id="cars" className="p-1">
                <option disabled selected value>
                  {" "}
                  -- select an option --{" "}
                </option>
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
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
                  <th scope="col">
                    <input
                      type="checkbox"
                      id="selectall"
                      onChange={handleCheckAll}
                      checked={checkAll}
                    />
                  </th>
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
                SUBMIT
              </button>
              <button
                style={{ marginLeft: "auto" }}
                type="submit"
                className="btn btn-secondary btn-block btn-style"
              >
                ACCEPT ALL
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Feedback;
