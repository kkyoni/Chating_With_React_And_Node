import React, { useState } from "react";
import { Input, Table, Button, Row, Col, Typography } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";

const { Text } = Typography;

const users = [
  { id: 1, name: "Fidel Carter" },
  { id: 2, name: "Alice Johnson" },
  { id: 3, name: "Bob Smith" },
  { id: 4, name: "Charlie Brown" },
  { id: 5, name: "demo Brown" },
  { id: 6, name: "demi Brown" },
];

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredCell, setHoveredCell] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null); // Track the selected index for navigation

  // Filter users based on search term and count highlighted matches
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const highlightedCount = filteredUsers.length;

  const handleUpClick = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === null || prevIndex <= 0 ? filteredUsers.length - 1 : prevIndex - 1
    );
  };

  const handleDownClick = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === null || prevIndex >= filteredUsers.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div style={{ width: "400px", margin: "150px auto" }}>
      <Row style={{ marginBottom: "10px" }} justify="space-between" align="middle">
        {/* Search Box */}
        <Col span={16}>
          <Input
            placeholder="Search to Highlight"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>

        {/* Up and Down Buttons */}
        <Col>
          <Button
            icon={<UpOutlined />}
            onClick={handleUpClick}
            disabled={highlightedCount === 0}
            style={{ marginBottom: "5px" }}
          />
          <Button
            icon={<DownOutlined />}
            onClick={handleDownClick}
            disabled={highlightedCount === 0}
          />
        </Col>
      </Row>

      {/* Display the count of highlighted matches */}
      <Text strong>Highlighted Matches: {highlightedCount}</Text>

      <Table
        dataSource={users}
        rowKey="id"
        pagination={false}
        style={{ marginTop: "20px" }}
      >
        <Table.Column title="ID" dataIndex="id" key="id" />
        <Table.Column
          title="Name"
          dataIndex="name"
          key="name"
          render={(text, record, index) => {
            const startIndex = text.toLowerCase().indexOf(searchTerm.toLowerCase());
            const endIndex = startIndex + searchTerm.length;

            // Highlight only if search term is found
            const highlightedText =
              startIndex !== -1 ? (
                <>
                  {text.substring(0, startIndex)}
                  <span style={{ backgroundColor: "yellow" }}>
                    {text.substring(startIndex, endIndex)}
                  </span>
                  {text.substring(endIndex)}
                </>
              ) : (
                text
              );

            return (
              <div
                onMouseEnter={() =>
                  searchTerm && startIndex !== -1 ? setHoveredCell(record.id) : setHoveredCell(null)
                }
                onMouseLeave={() => setHoveredCell(null)}
                style={{
                  backgroundColor: hoveredCell === record.id ? "#f0f0f0" : "white",
                  transition: "background-color 0.2s",
                  border: selectedIndex === index ? "2px solid blue" : "none",
                }}
              >
                {highlightedText}
              </div>
            );
          }}
        />
      </Table>
    </div>
  );
};

export default SearchComponent;
