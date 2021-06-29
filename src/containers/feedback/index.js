import React, { useState, useEffect } from "react";
import LoggedHeader from "../header";
import Modal from '../../components/ModalComponent/Modal';
import Data from '../../data/data.json';
function Feedback() {
  // let data = [
  //   {
  //     USER_ID: "OG1",
  //     FUNCTION: "PICKING",
  //     SUB_FUNCTION: "0 Picking",
  //     TYPE: "Actual",
  //     HOUR_BUCKET: 2,
  //     LINES: 41.0,
  //     MEASURED_MIN: 57.6,
  //     DATE: "2021-06-12",
  //     currentSub: "Mix Picking",
  //     overridenfn: "",
  //     reasons: "",
  //   },
  //   {
  //     USER_ID: "CL13",
  //     FUNCTION: "PUTAWAY",
  //     SUB_FUNCTION: "Case Pull",
  //     TYPE: "Actual",
  //     HOUR_BUCKET: 2,
  //     LINES: 11.0,
  //     MEASURED_MIN: 43.2,
  //     DATE: "2021-06-12",
  //     currentSub: "Mix Picking",
  //     overridenfn: "",
  //     reasons: "",
  //   },
  //   {
  //     USER_ID: "JM12",
  //     FUNCTION: "PUTAWAY",
  //     SUB_FUNCTION: "Case Pull",
  //     TYPE: "Actual",
  //     HOUR_BUCKET: 2,
  //     LINES: 7.0,
  //     MEASURED_MIN: 37.2,
  //     DATE: "2021-06-12",
  //     currentSub: "Mix Picking",
  //     overridenfn: "",
  //     reasons: "",
  //   },
  //   {
  //     USER_ID: "WH1",
  //     FUNCTION: "PUTAWAY",
  //     SUB_FUNCTION: "Case Pull",
  //     TYPE: "Actual",
  //     HOUR_BUCKET: 2,
  //     LINES: 10.0,
  //     MEASURED_MIN: 55.2,
  //     DATE: "2021-06-12",
  //     currentSub: "Mix Picking",
  //     overridenfn: "",
  //     reasons: "",
  //   },
  //   {
  //     USER_ID: "CV2",
  //     FUNCTION: "PUTAWAY",
  //     SUB_FUNCTION: "Case Pull",
  //     TYPE: "Actual",
  //     HOUR_BUCKET: 2,
  //     LINES: 10.0,
  //     MEASURED_MIN: 42.0,
  //     DATE: "2021-06-12",
  //     currentSub: "Mix Picking",
  //     overridenfn: "",
  //     reasons: "",
  //   },
  // ];
  let timer = [
    { id: "1", value: "00:00 AM - 02:00 AM" },
    { id: "2", value: "02:00 AM - 04:00 AM" },
    { id: "3", value: "04:00 AM - 06:00 AM" },
    { id: "4", value: "06:00 AM - 08:00 AM" },
    { id: "5", value: "08:00 AM - 10:00 AM" },
    { id: "6", value: "10:00 AM - 12:00 PM" },
    { id: "7", value: "12:00 PM - 02:00 PM" },
    { id: "8", value: "02:00 PM - 04:00 PM" },
    { id: "9", value: "04:00 PM - 06:00 PM" },
    { id: "10", value: "06:00 PM - 08:00 PM" },
    { id: "11", value: "08:00 PM - 10:00 PM" },
    { id: "12", value: "10:00 PM - 12:00 AM" },
  ];

  let now = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  });
  function getTwentyFourHourTime(amPmString) {
    var d = new Date("1/1/2021 " + amPmString);
    return d.getHours();
  }
  const findvalue = timer.find((element, i) => {
    let split = element.value.split("-");
    if (
      getTwentyFourHourTime(split[0]) <= getTwentyFourHourTime(now) &&
      getTwentyFourHourTime(split[1]) > getTwentyFourHourTime(now)
    ) {
      return element;
    } else if (getTwentyFourHourTime(split[0]) == getTwentyFourHourTime(now)) {
      return element;
    }
  });
  let index = "";
  if (findvalue.id === "12") {
    index = 0;
  } else {
    index = parseInt(findvalue.id);
  }
  const onChangeOverridenfn = (e, index) => {
    console.log(e.target.value, index);
    let data = items;
    data[index].overridenfn = e.target.value;
    setItems([...data]);
  };
  const onChangeReasons = (e, index) => {
    console.log(e.target.value, index);
    if (errorFields.includes(index)) {
      errorFields.splice(errorFields.indexOf(index), 1);
    }
    let data = items;
    data[index].reasons = e.target.value;
    setItems([...data]);
  };
  const [items, setItems] = useState(JSON.parse(localStorage.getItem(localStorage.getItem("userName")))||Data);
  const [errorFields, setErrorFields] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const dataReset = () => {
    setShowModal(true);
    setModalText('Thanks you for accepting the recommendations.');
    let datas = items;
    datas.map((data) => {
      data.overridenfn = "";
      data.reasons = "";
    });
    setItems([...datas]);
    setErrorFields([]);
  };
  const dataSubmit = () => {
    let datas = items;
    let validErrorData = [];
    let newDataArray = [];
    datas.map((data,i)=>{
      if(data.overridenfn.length!=0 && data.reasons==0){
        validErrorData.push(i)
      }else{
        if(data.overridenfn.length!=0){
          data.ProjectedSubfunction =  data.overridenfn;
        }
        data.overridenfn = "";
        data.reasons = "";
        newDataArray.push(data);
      }
    });
    console.log("newDataArray", newDataArray);
    setErrorFields(validErrorData);
    if (validErrorData.length === 0) {
      //submit function call here
      let userName = localStorage.getItem("userName");
      localStorage.setItem(userName, JSON.stringify(newDataArray));
      setShowModal(true);
      setModalText('Message-You Feedback has been recorded successfully.');
    }
  };
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
            <td>{item.ProjectedSubfunction}</td>
            <td>
              <select
                name="overridenfn"
                id="overridenfn"
                className="p-1"
                value={item.overridenfn}
                onChange={(e) => onChangeOverridenfn(e, i)}
              >
                <option disabled value="">
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
              <select
                name="reasons"
                id="reasons"
                className={`p-1 ${errorFields.includes(i) ? "errorData" : ""}`}
                value={item.reasons}
                disabled={item.overridenfn.length === 0}
                onChange={(e) => onChangeReasons(e, i)}
              >
                <option disabled value="">
                  {" "}
                  none{" "}
                </option>
                <option value="Cross Train">Cross Train</option>
                <option value="Missed Service">Missed Service</option>
                <option value="Receiving Priority">Receiving Priority</option>
                <option value="Heavy Volume">Heavy Volume</option>
                <option value="Future Dated Orders">Future Dated Orders</option>
                <option value="Manager Override">Manager Override</option>
                <option value="Equipment down – PackSize">
                  Equipment down – PackSize
                </option>
                <option value="Equipment Down – Numina">
                  Equipment Down – Numina
                </option>
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
      <div className="container" style={{ paddingTop: "7rem" }}>
        <div className="backgroundImageGIF">
          <div className="contentDisplay pt-4">
            <div className="justify-content-center align-items-center">
              <div className="text-center headerSection">
                <p className="m-0 pt-2 timeSlot">Upcoming Time Slot</p>
                <div className="m-0 pb-2 timerCSS d-flex">
                  <div style={{ paddingLeft: "10px", paddingRight: "30%" }}>
                    {new Date().toLocaleDateString()}
                  </div>
                  <div>{timer[index].value}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="contentContainer">
          <div className="d-flex contentCenter">
            <div className="text-center d-flex">
              <div
                className="greenBackground p-3"
                style={{ marginLeft: "15px" }}
              >
                <div>
                  <p className="mb-0">Orders Outstanding </p>
                </div>
                <div>
                  <p className="mb-0">1003</p>
                </div>
              </div>

              <div
                className="greenBackground p-3"
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
          <Modal
            isOpen={showModal}
            setShowModal={setShowModal}
            text={modalText}
          />
          <div className="px-3 pb-3 pt-1 tableConetent table-responsive">
            <table className="table table-hover table-dark ml-3">
              <thead>
                <tr style={{ borderBottom: "3px solid black" }}>
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
            
          </div>
          {errorFields.length > 0 && (
              <div className="errorData">
                ***Please fill data in mandatory fields***
              </div>
            )}
          <div>
            <ol className="content__">
              <li className="content__item">
                <button className="button button--pan" onClick={dataReset}>
                  <span>Accept All</span>
                </button>
              </li>
              <li className="content__item">
                <button className="button button--pan" onClick={dataSubmit}>
                  <span>Submit</span>
                </button>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}

export default Feedback;
