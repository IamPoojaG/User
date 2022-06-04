import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Table from "./components/Table";
import Profile from "./components/Details";

import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(13);
  const [order, setOrder] = useState("ASC");
  const [search, setSearch] = useState("");

  let url =
    "https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json";
  const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setUser(data);
  };
  useEffect(() => {
    fetchData();
  }, [search]);

  // get the current users
  const indexOfLastPost = currentPage * postPerPage;
  // console.log(indexOfLastPost)
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  // console.log(indexOfFirstPost)
  const currentPosts = user.slice(indexOfFirstPost, indexOfLastPost);
  // console.log(currentPosts)
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Search function
  const searching = () => {
    const searchedData = user.filter((value) => {
      if (
        value.first_name.toLowerCase().includes(search.toLowerCase()) ||
        value.last_name.toLowerCase().includes(search.toLowerCase())
      )
        return value;
    });
    setUser(searchedData);
  };
  // sort function
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...user].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setUser(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...user].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setUser(sorted);
      setOrder("ASC");
    }
  };

  const sortNumber = (col) => {
    if (order === "ASC") {
      const sorted = [...user].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setUser(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...user].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setUser(sorted);
      setOrder("ASC");
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route
          path="/users"
          element={
            <Table
              computedUser={currentPosts}
              totalPosts={user.length}
              postPerPage={postPerPage}
              paginate={paginate}
              sorting={sorting}
              sortNumber={sortNumber}
              searching={searching}
              search={search}
              setSearch={setSearch}
            />
          }
        ></Route>
        <Route path="/users/:id" element={<Profile user={user} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
