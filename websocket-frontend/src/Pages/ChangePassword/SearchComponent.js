import React, { useState } from "react";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

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
      <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Search Box */}
        <TextField
          fullWidth
          label="Search to Highlight"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: "10px" }}
        />

        {/* Up and Down Buttons */}
        <Box>
          <IconButton
            onClick={handleUpClick}
            disabled={highlightedCount === 0}
            style={{
              backgroundColor: "#f0f0f0",
              marginBottom: "5px",
            }}
          >
            <ArrowUpwardIcon />
          </IconButton>
          <IconButton
            onClick={handleDownClick}
            disabled={highlightedCount === 0}
            style={{
              backgroundColor: "#f0f0f0",
            }}
          >
            <ArrowDownwardIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Display the count of highlighted matches */}
      <Box style={{ marginBottom: "10px", fontSize: "16px" }}>
        <strong>Highlighted Matches: </strong>{highlightedCount}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#ddd" }}>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => {
              const startIndex = user.name.toLowerCase().indexOf(searchTerm.toLowerCase());
              const endIndex = startIndex + searchTerm.length;

              // Highlight only if search term is found
              const highlightedText =
                startIndex !== -1 ? (
                  <>
                    {user.name.substring(0, startIndex)}
                    <span style={{ backgroundColor: "yellow" }}>
                      {user.name.substring(startIndex, endIndex)}
                    </span>
                    {user.name.substring(endIndex)}
                  </>
                ) : (
                  user.name
                );

              return (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell
                    onMouseEnter={() =>
                      searchTerm && startIndex !== -1 ? setHoveredCell(user.id) : setHoveredCell(null)
                    }
                    onMouseLeave={() => setHoveredCell(null)}
                    style={{
                      backgroundColor: hoveredCell === user.id ? "#f0f0f0" : "white",
                      transition: "background-color 0.2s",
                      border: selectedIndex === index ? "2px solid blue" : "none",
                    }}
                  >
                    {highlightedText}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SearchComponent;
