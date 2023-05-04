import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";

const QuestionCard = ({
  question,
  questionData,
  fillQuestionData,
  Q,
  totalQ,
}) => {
  const handleSubmitQuizAnswer = (item) => {
    fillQuestionData(Q, item);
  };

  return (
    <Box
      border="2px solid white"
      borderRadius={"10px"}
      padding={"30px"}
      color={"white"}
      width={{ base: "95%", lg: "50%" }}
    >
      <Flex justifyContent={"space-between"} alignItems={"center"} mb={"20px"}>
        <Text width={{ base: "80%", lg: "90%" }}>
          <span>{Q && Q}</span>.{" "}
          <span
            dangerouslySetInnerHTML={{ __html: question && question.question }}
          />
        </Text>
        <Text>
          <span>{Q && Q}</span> of <span>{totalQ && totalQ}</span>
        </Text>
      </Flex>

      <Stack>
        {question.mcq.length &&
          question.mcq.map((item, i) => {
            return (
              <Box
                border="1px solid white"
                padding={"10px"}
                borderRadius={"6px"}
                cursor={"pointer"}
                _hover={{ bg: !questionData[Q] && "teal" }}
                key={Date.now() + Math.random() + i}
                onClick={() => !questionData[Q] && handleSubmitQuizAnswer(item)}
                bg={
                  item === questionData[Q] &&
                  question.correct_answer === questionData[Q]
                    ? "green"
                    : item === questionData[Q] &&
                      question.correct_answer !== questionData[Q]
                    ? "red"
                    : ""
                }
              >
                {item}
              </Box>
            );
          })}
      </Stack>
    </Box>
  );
};

export default QuestionCard;
