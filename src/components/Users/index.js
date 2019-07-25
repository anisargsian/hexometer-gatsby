import React, { useEffect, useState } from 'react';
import { Grid, Button } from 'tabler-react';
// import { ContentTextProps, UserProps, UsersProps } from "../../types";
import moment from "moment";
import SearchInput from "../searchInput";
import Pagination from "../pagination";
import TableCard from "../tableCard";
import FileSaver from "file-saver";
import { Link } from 'gatsby';

const Users = (props) => {
  const { data, loading } = props;

  const [baseUsers, setBaseUsers] = useState([]);
  const [userPagination, setUserPagination] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);


  const handlePaginationClick = (user) => setUsers(user);
  const handleSearchChange = (user) => setUserPagination(user);

  const tableData = {
    tData: users && users.map((item) => (
      {
        "Name": `${item.firstName} ${item.lastName}`,
        "Email": item.email,
        "Registration Date": moment(item.createdAt).format('DD-MM-YYYY'),
        "Verified": item.verified ? "yes" : "no",
        "Verification Code": item.verifyCode
      }
    ))
  };

  useEffect(() => {
    if (data.User && data.User.getMany && baseUsers.length === 0) {
      setCurrentPage(1);
      setDataLoading(loading);
      setBaseUsers(data.User.getMany );
      setUserPagination(data.User.getMany );
    }
  }, [data]);

  const handleCsvGenerateClick = async () => {
    let separator = ",";
    let heading = ["First Name", "Last Name", "Email", "Registration date", "Verified", "Verification code"];
    let columns = ["firstName", "lastName", "email", "createdAt", "verified", "verifyCode"];
    const csvFormat = [
      heading.join(separator),
      ...baseUsers.map((obj) =>
        columns.reduce(
          (acc, key) => `${acc}${acc.length ? separator : ''}"${obj[key] ? obj[key] : ''}"`,
          ''
        )
      )
    ].join('\n');

    const blob = new Blob([csvFormat], { type: "text/csv;charset=utf-8" });
    await FileSaver.saveAs(blob, "users.csv");
  };

  return (
    <Grid.Row cards deck>
      <Grid.Col width={12}>
        <Link to="/">Home</Link>
        <div>
          <Button className="float-left" onClick={handleCsvGenerateClick} color="primary">Download as CSV</Button>
          <SearchInput
            data={baseUsers}
            placeholder="Search for Name"
            onSubmit={handleSearchChange}
            fields={[{ name: 'firstName', concat: 'lastName' }]}
          />
        </div>
        <TableCard
          loading={dataLoading}
          data={users}
          tableData={tableData}
        />
        <Pagination
          rowPerPage={50}
          data={userPagination}
          onClick={handlePaginationClick}
        />
      </Grid.Col>
    </Grid.Row>
  )
};

export default Users;
