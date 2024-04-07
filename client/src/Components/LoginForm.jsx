import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Button,
  Card,
  CardBody,
  Box,
  Center,
  Stack,
  ButtonGroup,
  Container,
  VStack,
  Heading,
  Text
} from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fetchUserData, isAuthSelector } from "../redux/slices/auth";
const LoginForm = () => {
  const isAuth = useSelector(isAuthSelector);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchUserData(values));
    if (!data.payload) {
      return alert("Иди отсюда");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    } else {
      alert("Иди отсюда");
    }
  };

  if (isAuth) {
    return <Navigate to="/license" />;
  }

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Box
        py={{ base: "0", sm: "8" }}
        px={{ base: "4", sm: "10" }}
        bg={{ base: "transparent", sm: "bg.surface" }}
        boxShadow={{ base: "none", sm: "md" }}
        borderRadius={{ base: "none", sm: "xl" }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing="20px">
            <Text fontSize="3xl" >Вход</Text>
          <Input
            type="text"
            name="name"
            {...register("name", { required: "Enter username" })}
            placeholder="Логин"
            required
          />
          <Input
            type="password"
            name="password"
            {...register("password", { required: "Enter password" })}
            placeholder="Пароль"
            required
          />
            <Button type="submit" colorScheme="green" variant="solid">
              Войти
            </Button>
            </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;
