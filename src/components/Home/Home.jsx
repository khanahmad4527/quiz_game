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
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../../redux/action";

const initForm = {
  name: "",
  category: "",
  level: "",
  questions: "",
};

const Home = () => {
  const [form, setForm] = useState(initForm);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuth } = useSelector((store) => store);

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
    setIsLoading(true);

    e.preventDefault();

    dispatch(authUser(form.name, form.questions, form.category, form.level));
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/quiz");
    }
  }, [isAuth]);

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
                name="category"
                value={form.category}
                onChange={handleFormChange}
              >
                <option value="any">Any Category</option>
                <option value="9">General Knowledge</option>
                <option value="10">Entertainment: Books</option>
                <option value="11">Entertainment: Film</option>
                <option value="12">Entertainment: Music</option>
                <option value="13">
                  Entertainment: Musicals &amp; Theatres
                </option>
                <option value="14">Entertainment: Television</option>
                <option value="15">Entertainment: Video Games</option>
                <option value="16">Entertainment: Board Games</option>
                <option value="17">Science &amp; Nature</option>
                <option value="18">Science: Computers</option>
                <option value="19">Science: Mathematics</option>
                <option value="20">Mythology</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                <option value="24">Politics</option>
                <option value="25">Art</option>
                <option value="26">Celebrities</option>
                <option value="27">Animals</option>
                <option value="28">Vehicles</option>
                <option value="29">Entertainment: Comics</option>
                <option value="30">Science: Gadgets</option>
                <option value="31">
                  Entertainment: Japanese Anime &amp; Manga
                </option>
                <option value="32">
                  Entertainment: Cartoon &amp; Animations
                </option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Difficulty level</FormLabel>
              <Select
                name="level"
                value={form.level}
                onChange={handleFormChange}
              >
                <option value="any">Any Difficulty</option>
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

            <Button type="submit" colorScheme="teal" isLoading={isLoading}>
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
