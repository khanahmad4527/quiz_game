import React, { useState } from "react";
import QuestionCard from "./QuestionCard";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateScore } from "../../redux/action";

const Quiz = () => {
  const [Q, setQ] = useState(1);

  const { questions } = useSelector((store) => store);

  const [questionData, setQuestionData] = useState({});

  const fillQuestionData = (question, selectedAnswer) => {
    setQuestionData({
      ...questionData,
      [question]: selectedAnswer,
    });
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleQuestions = (val) => {
    setQ(Q + val);
  };

  const handleQuizSubmit = () => {
    dispatch(updateScore(questionData));
    navigate("/results");
  };

  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      minW={"100vw"}
      minH={"100vh"}
      bg="#5D4EC2"
      gap={"50px"}
    >
      {!questions.length ? (
        <Heading mt="20px">Loading...</Heading>
      ) : (
        <>
          <QuestionCard
            question={questions.length && questions[Q - 1]}
            questionData={questionData}
            fillQuestionData={fillQuestionData}
            Q={Q}
            totalQ={questions && questions.length}
          />

          <Flex gap={{ base: "100px", lg: "200px" }} alignItems={"center"}>
            <Button
              colorScheme="teal"
              isDisabled={Q === 1}
              onClick={() => handleQuestions(-1)}
            >
              PREV
            </Button>

            {Q < (questions && questions.length) && (
              <Button colorScheme="teal" onClick={() => handleQuestions(1)}>
                NEXT
              </Button>
            )}

            {Q === (questions && questions.length) && (
              <Button colorScheme="teal" onClick={handleQuizSubmit}>
                SUBMIT
              </Button>
            )}
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default Quiz;
