import React, { useState, useEffect } from "react";
import { Pagination, Spin } from "antd";
import axios from "axios";
import PostsTable from "./PostTable";
import Filter from "./Filter";
import SearchInput from "./SearchInput";

const PostsPage = () => {
  const [loading, setLoading] = useState(false);
  const [originalPosts, setOriginalPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    fetchData();
  }, [pagination]);

  const fetchData = async () => {
    setLoading(true);
    const skip = (pagination.current - 1) * pagination.pageSize;
    const limit = pagination.pageSize;
    try {
      const response = await axios.get(
        `https://dummyjson.com/posts?skip=${skip}&limit=${limit}`
      );
      if (Array.isArray(response.data.posts)) {
        setOriginalPosts(response.data.posts);
        applyFilterAndSearch(response.data.posts, searchQuery, selectedFilters);
      } else {
        console.error("Posts array not found in API response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilterAndSearch = (data, query, filters) => {
    let filteredData = data;

    
    if (filters.length > 0) {
      filteredData = filteredData.filter((post) =>
        filters.some((filter) => post.tags.includes(filter))
      );
    }

  
    if (query) {
      filteredData = filteredData.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.body.toLowerCase().includes(query.toLowerCase())
      );
    }

    setPosts(filteredData);
  };

  const handlePageChange = (page, pageSize) => {
    setPagination({ ...pagination, current: page });
  };

  const handleFilterChange = (selectedFilters) => {
    setSelectedFilters(selectedFilters);
    applyFilterAndSearch(originalPosts, searchQuery, selectedFilters);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    applyFilterAndSearch(originalPosts, query, selectedFilters);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          backgroundColor: "mediumvioletred",
          margin: "auto",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <Filter
          onChange={handleFilterChange}
          selectedFilters={selectedFilters}
          style={{ marginBottom: "20px", width: "80%" }}
        />
        <SearchInput
          onSearch={handleSearch}
          style={{ marginBottom: "20px", width: "80%" }}
        />
      </div>
      <div
        style={{
          backgroundColor: "mediumturquoise",
          margin: "auto",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <Spin spinning={loading}>
          <div style={{ width: "70%", margin: "auto" }}>
            <PostsTable posts={posts} />
          </div>
        </Spin>
      </div>

      <div
        style={{
          backgroundColor: "mediumvioletred",
          margin: "auto",
          justifyContent: "space-around",
          padding: "10px",
        }}
      >
       
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={100}
          onChange={handlePageChange}
          style={{ marginTop: "20px" }}
        />
      </div>
    </div>
  );
};

export default PostsPage;
