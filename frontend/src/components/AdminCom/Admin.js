import React, { useState, useEffect } from "react";
import ListPage from "./ListPage";
import { Row, Col, Button, ButtonGroup } from "reactstrap";
import axios from "axios";

const Admin = () => {
  const [datas, setDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dataFetch = async () => {
    await axios.get("http://localhost:3050/admin").then((res) => {
      setData(res);
      setDatas(res);
    });
    setIsLoading(false);
  };
  useEffect(async () => {
    dataFetch();
  }, []);

  return (
    <div>
      <ListPage
        columns={column}
        data={data}
        //   keyField={this.state.keyField}
        //   totalCount={this.state.totalCount}
        //   rowClicked={this.HandleRowClicked}
        //   rowsPerPageOnChange={this.handlePerRowsChange}
        //   pageChange={this.handlePageChange}
        isDataLoading={isLoading}
        overFlowXRemoval={true}
      ></ListPage>
    </div>
  );
};

export default Admin;
