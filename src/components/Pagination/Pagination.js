
import React, { useState, useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Pagination = (props) => {
  const {
    pages,
    currentPage,
    setcurrentPage
  } = props;
const [pageData,setPageData] =useState([]);
  useEffect(() => {
    let pageDatas = pageData;
      for(let i = 0; i < pages; i++){
          pageDatas.push(i)
      }
      setPageData([...new Set(pageData)])
  }, [pages])
  console.log(pageData)
  return (
      <div className="d-flex justify-Center">
          {pageData.map((page)=>
              <div className="pageNumberContainer">{page}</div>
          )}
      </div>
  )
} 
export default Pagination;