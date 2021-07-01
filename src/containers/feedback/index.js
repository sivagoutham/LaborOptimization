import React, { useState, useEffect, useRef } from "react";
import LoggedHeader from "../header";
import Modal from "../../components/ModalComponent/Modal";
import Data from "../../data/data.json";
import {
  AiOutlineSearch,
  AiFillCaretDown,
  AiFillCheckSquare,
  AiOutlineCheckSquare,
} from "react-icons/ai";
import Pagination from "../../components/Pagination/Pagination";
import Filter from "../../components/FilterComponent/Filter";
import {
  Table,
  Dropdown,
  ButtonDropdown,
  Button,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
function Feedback() {
  document.title = "Feedback loop for cross-training";
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
  let index = 0;
  if (findvalue.id === "12") {
    index = 0;
  } else {
    index = parseInt(findvalue.id) || 0;
  }
  const onChangeOverridenfn = (e, index) => {
    let data = items;
    data[index].overridenfn = e.target.value;
    setItems([...data]);
    setSearchItems([...data]);
  };
  const onChangeReasons = (e, index) => {
    if (errorFields.includes(index)) {
      errorFields.splice(errorFields.indexOf(index), 1);
    }
    let data = items;
    data[index].reasons = e.target.value;
    setItems([...data]);
    setSearchItems([...data]);
  };
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("admin")) || Data
  );
  const currentItemFilters = [
    ...new Set(items.map(({ ExistingSubfunction }) => ExistingSubfunction)),
  ];
  const recommendedItemFilters = [
    ...new Set(items.map(({ ProjectedSubfunction }) => ProjectedSubfunction)),
  ];
  const [errorFields, setErrorFields] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [currentFilterText, setcurrentFilterText] = useState([]);
  const [recommendFilterText, setrecommendFilterText] = useState([]);
  const [currentPage, setcurrentPage] = useState([0]);
  const totalPages = Math.ceil(items.length / 5);
  const [searchItems, setSearchItems] = useState(
    JSON.parse(localStorage.getItem("admin")) || Data
  );
  const [openCurrentSelect, setOpenCurrentSelect] = useState(false);
  const [openCurrentRecommend, setOpenCurrentRecommend] = useState(false);
  const closeCurrentSelect = () => {
    setOpenCurrentSelect(!openCurrentSelect);
  };
  const checkSelectCurrent = (e) => {
    let filterData = currentFilterText;
    if (filterData.indexOf(e) === -1) {
      filterData.push(e);
    } else {
      filterData.splice(filterData.indexOf(e), 1);
    }
    setcurrentFilterText(filterData);
    let data = items.filter((data)=> (searchText.length > 0
      ? data.USER_ID.includes(searchText.toUpperCase())
      : true));
    // (searchText.length>0?data.USER_ID.includes(searchText.toUpperCase()):true)&&
    if (filterData.length > 0) {
      data = data.filter(
        (data) =>
          filterData.includes(data.ExistingSubfunction) &&
          (recommendFilterText.length > 0
            ? recommendFilterText.includes(data.ProjectedSubfunction)
            : true)
      );
    } else {
      data = data.filter((data) =>
       recommendFilterText.length > 0
          ? recommendFilterText.includes(data.ProjectedSubfunction)
          : true
      );
    }
    setSearchItems(data);
  };
  const closeCurrentRecommend = () => {
    setOpenCurrentRecommend(!openCurrentRecommend);
  };
  const checkSelectRecommend = (e) => {
    let filterData = recommendFilterText;
    if (filterData.indexOf(e) === -1) {
      filterData.push(e);
    } else {
      filterData.splice(filterData.indexOf(e), 1);
    }
    setrecommendFilterText(filterData);
    let data = items.filter((data)=> (searchText.length > 0
      ? data.USER_ID.includes(searchText.toUpperCase())
      : true));
    console.log(searchText);
    if (filterData.length !== 0) {
      data = data.filter(
        (data) =>
          filterData.includes(data.ProjectedSubfunction) &&
          (currentFilterText.length > 0
            ? currentFilterText.includes(data.ExistingSubfunction)
            : true)
      );
    } else {
      console.log(searchText);
      data = data.filter((data) =>
        currentFilterText.length > 0
          ? currentFilterText.includes(data.ExistingSubfunction)
          : true
      );
    }
    setSearchItems(data);
  };
  const dataReset = () => {
    setShowModal(true);
    setModalText("Thanks you for accepting the recommendations.");
    let datas = items;
    datas.map((data) => {
      data.overridenfn = "";
      data.reasons = "";
    });
    setItems([...datas]);
    setSearchItems([...datas]);
    setErrorFields([]);
  };
  const dataSubmit = () => {
    let datas = items;
    let validErrorData = [];
    let newDataArray = [];
    datas.map((data, i) => {
      if (data.overridenfn.length != 0 && data.reasons == 0) {
        validErrorData.push(i);
      } else {
        if (data.overridenfn.length != 0) {
          data.ProjectedSubfunction = data.overridenfn;
        }
        data.overridenfn = "";
        data.reasons = "";
        newDataArray.push(data);
      }
    });
    setErrorFields(validErrorData);
    if (validErrorData.length === 0) {
      //submit function call here
      // let userName = localStorage.getItem("userName");
      let userName = "admin";
      localStorage.setItem(userName, JSON.stringify(newDataArray));
      setShowModal(true);
      setModalText("Message-You Feedback has been recorded successfully.");
    }
  };
  const TableData = (props) => {
    return (
      <>
        {props.items.length>0?props.items.map((item, i) => (
          <tr key={i}>
            <th scope="row" width="10%" >{item.USER_ID}</th>
            <td width="20%">{item.ExistingSubfunction}</td>
            <td width="25%" >{item.ProjectedSubfunction}</td>
            <td  width="20%">
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
            <td width="25%" >
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
        )):<tr key="nodata" ><td colspan="5" width="100%">No Data</td></tr>}
      </>
    );
  };
  
  const searchValueAdd = (e) => {
    setSearchText(e.target.value);
    if (e.target.value.length === 0) {
      setSearchItems([...items]);
    }
  };
  const searchByUserID = () => {
    let updatedData = items;
    updatedData =
      searchText.length > 0
        ? updatedData.filter((item) =>
            item.USER_ID.includes(searchText.toUpperCase())
          )
        : items;
    setSearchItems([...updatedData]);
    console.log(searchText)
  };
  const [isOpen, setIsOpen] = useState(false);
  const currentref = useRef(null);
  const recommendRef = useRef(null);
  const handleClickOutside = (event) => {
    if (openCurrentRecommend) {
      if (currentref.current && !currentref.current.contains(event.target)) {
        setOpenCurrentRecommend(!openCurrentRecommend);
      }
    }
    if (openCurrentSelect) {
      if (
        recommendRef.current &&
        !recommendRef.current.contains(event.target)
      ) {
        setOpenCurrentSelect(!openCurrentSelect);
      }
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
  });
  return (
    <>
      <LoggedHeader />
      <div className="container" style={{ paddingTop: "7rem" }}>
        <h5>Feedback loop for cross-training</h5>

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
          <div className="searchBoxContainer">
            <p>Search User</p>
            <div className="search-container">
              <input
                type="text"
                placeholder="USER ID"
                name="search"
                onChange={searchValueAdd}
              />
              <button onClick={searchByUserID}>
                <AiOutlineSearch />
              </button>
            </div>
          </div>
          <div className="px-3 pb-3 pt-1 tableConetent table-responsive">
            <table className="table table-hover table-dark ml-3"  style={{width: "100% !important"}}>
              <thead>
                <tr style={{ borderBottom: "3px solid black" }}>
                  <th scope="col"  width="10% !important">User ID</th>
                  <th scope="col"  width="20% !important">
                    <div className="d-flex currentDropdown">
                      Current Subfunction{" "}
                      <div ref={recommendRef}>
                        <button onClick={closeCurrentSelect}>
                          {" "}
                          <AiFillCaretDown />
                        </button>
                        {openCurrentSelect && (
                          <Filter
                            selectFilter={checkSelectCurrent}
                            filters={currentFilterText}
                            options={currentItemFilters}
                          />
                        )}
                      </div>
                    </div>
                  </th>
                  <th scope="col"  width="25% !important">
                    <div className="d-flex currentDropdown">
                      Recommended Subfunction
                      <div ref={currentref}>
                        <button onClick={closeCurrentRecommend}>
                          {" "}
                          <AiFillCaretDown />
                        </button>
                        {openCurrentRecommend && (
                          <Filter
                            selectFilter={checkSelectRecommend}
                            filters={recommendFilterText}
                            options={recommendedItemFilters}
                          />
                        )}
                      </div>
                    </div>
                  </th>
                  <th scope="col" width="20% !important">Overridden Subfunction</th>
                  <th scope="col"  width="25% !important">Reason</th>
                </tr>
              </thead>
              <tbody>
                <TableData items={searchItems} />
              </tbody>
            </table>

          </div>
          {errorFields.length > 0 && (
            <div className="errorData">
              ***Please fill data in mandatory fields***
            </div>
          )}
          {/* <Pagination  pages={totalPages} currentPage={currentPage} setcurrentPage={setcurrentPage}/> */}
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
