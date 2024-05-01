import React from "react";
import { Table, Tag } from "antd";

const PostsTable = ({ posts }) => {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags) => (
        <>
          {tags.map((tag) => (
            <Tag key={tag} color="blue">
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
  ];
  
  return (
    <Table
      columns={columns}
      dataSource={posts.map((post) => ({ ...post, key: post.id }))}
  
     
    />
  );
};

export default PostsTable;
