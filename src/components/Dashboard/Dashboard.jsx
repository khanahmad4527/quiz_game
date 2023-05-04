import { Box, Heading, Link, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUser } from "../../redux/action";

const styles = {
  table: {
    borderCollapse: "collapse",
    width: "100%",
    border: "1px solid white",
  },
  th: {
    fontWeight: "bold",
    padding: "8px",
    textAlign: "left",
    border: "1px solid white",
  },
  td: {
    border: "1px solid white",
    padding: "8px",
    textAlign: "left",
  },
};

const Dashboard = () => {
  const { allUser } = useSelector((store) => store);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!allUser.length) {
      dispatch(getAllUser());
    }
  }, [allUser, dispatch]);

  return (
    <Stack
      bg="#5D4EC2"
      color={"white"}
      width={"100%"}
      minHeight={"100vh"}
      gap={"10px"}
      align={"center"}
    >
      {!allUser.length ? (
        <Heading mt="20px">Loading...</Heading>
      ) : (
        <>
          <Heading textAlign={"center"} mt="20px">
            Dashboard
          </Heading>

          <Box width={{ base: "95%", lg: "50%" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Player Name</th>
                  <th style={styles.th}>Score</th>
                </tr>
              </thead>
              <tbody>
                {allUser.length &&
                  allUser
                    .sort((a, b) => b.score - a.score)
                    .map((item, i) => {
                      return (
                        <tr key={Date.now() + Math.random() + i}>
                          <td style={styles.td}>{item.name}</td>
                          <td style={styles.td}>{item.score}</td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </Box>

          <Link href="/">Back to Home</Link>
        </>
      )}
    </Stack>
  );
};

export default Dashboard;
