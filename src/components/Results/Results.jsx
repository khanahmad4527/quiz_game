import { Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewUser } from "../../redux/action";

const Results = () => {
  const correctAnswer = {};

  const { questions, userAnsweredQuestions, userName } = useSelector(
    (store) => store
  );

  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [called, setCalled] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    for (let i = 0; i < questions.length; i++) {
      correctAnswer[i + 1] = questions[i].correct_answer;
    }

    let ca = 0;
    let wa = 0;

    for (let key in correctAnswer) {
      if (correctAnswer[key] === userAnsweredQuestions[key]) {
        ca++;
      } else {
        wa++;
      }
    }
    setCorrectAnswers(ca);
    setWrongAnswers(wa);

    if (called) {
      const data = {
        name: userName,
        score: ca * 10,
        userId: Date.now(),
      };

      dispatch(addNewUser(data));
      setCalled(false);
    }
  }, []);

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      minH={"100vh"}
      bg="#5D4EC2"
      gap={"50px"}
      color={"white"}
      flexDirection={"column"}
    >
      <Heading>Your Result</Heading>

      <Stack
        border="2px solid white"
        padding={{ base: "10px", lg: "50px" }}
        width={{ base: "95%", lg: "30%" }}
        fontSize={"25px"}
      >
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text>Correct answers</Text>
          <Text>{correctAnswers}</Text>
        </Flex>

        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text>Incorrect answers</Text>
          <Text>{wrongAnswers}</Text>
        </Flex>

        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text>Total score</Text>
          <Text>{correctAnswers * 10}</Text>
        </Flex>

        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text>Percentage</Text>
          <Text>{((correctAnswers * 100) / questions.length).toFixed(2)}</Text>
        </Flex>
      </Stack>

      <Link href="/dashboard">Go to Dashboard</Link>
    </Flex>
  );
};

export default Results;
