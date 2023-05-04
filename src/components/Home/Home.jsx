import {
  Flex,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Link,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authUser } from "../../redux/action";

const initForm = {
  name: "",
  category: "",
  level: "",
  questions: "",
};

const Home = () => {
  const [form, setForm] = useState(initForm);

  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const dispatch = useDispatch();

  const handleStartQuiz = (e) => {
    e.preventDefault();

    dispatch(authUser(form.name, form.questions, form.category, form.level));

    navigate("/quiz");
  };

  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      textAlign={"center"}
      color={"teal.500"}
      gap={"20px"}
    >
      <Heading textTransform={"uppercase"} mt="20px">
        Set up your quiz
      </Heading>

      <Flex
        width={{ base: "98%", md: "80%", lg: "40%" }}
        margin={"auto"}
        justifyContent={"center"}
        border="2px solid"
        p={{ base: "10px", md: "30px", lg: "50px" }}
      >
        <form style={{ width: "100%" }} onSubmit={handleStartQuiz}>
          <Stack spacing={"20px"}>
            <FormControl isRequired>
              <FormLabel>Enter your name</FormLabel>
              <Input
                type="text"
                name="name"
                value={form.name}
                onChange={handleFormChange}
                placeholder="Ahmad Khan"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Category</FormLabel>
              <Select
                placeholder="Select category"
                name="category"
                value={form.category}
                onChange={handleFormChange}
              >
                <option value="9">General Knowledge</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Difficulty level</FormLabel>
              <Select
                placeholder="Select level"
                name="level"
                value={form.level}
                onChange={handleFormChange}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Number of questions</FormLabel>
              <Input
                type="number"
                placeholder="5"
                name="questions"
                value={form.questions}
                onChange={handleFormChange}
              />
            </FormControl>

            <Button type="submit" colorScheme="teal">
              START QUIZ
            </Button>
          </Stack>
        </form>
      </Flex>

      <Link href="/dashboard">Go to Dashboard</Link>
    </Flex>
  );
};

export default Home;
