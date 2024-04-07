import {
  Box,
  Input,
  Button,
  ButtonGroup,
  Stack,
  useDisclosure,
  Textarea,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { CheckIcon, AddIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "../../axios.js";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const AddButton = function () {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [form, setForm] = useState({
    firmName: "",
    docNumber: "",
    service: "",
    endDate: "",
    docLink: "",
    comment: "",
  });
  const addForm = async () => {
    await axios.post("/api/license", form);
    setForm({
      firmName: "",
      docNumber: "",
      service: "",
      endDate: "",
      docLink: "",
      comment: "",
    });
    window.location.reload();
    //TODO: Впиндюрить нормальное обновление окна
  };
  const logout = async () => {
    localStorage.removeItem("token");
    window.location.reload();
    //TODO: Впиндюрить нормальное обновление окна
  };
  return (
    <Box>
      <Button leftIcon={<CloseIcon />} size="sm" colorScheme="red" justifyContent="left" onClick={logout}>
          Выйти
        </Button>
      <ButtonGroup
        size="sm"
        display="flex"
        justifyContent="right"
      >
        <Button
          leftIcon={<AddIcon />}
          colorScheme="green"
          variant="solid"
          onClick={onOpen}
        >
          Добавить
        </Button>
      </ButtonGroup>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <FormControl>
                <FormLabel>Название фирмы</FormLabel>
                <Input
                  value={form?.firmName}
                  onChange={(e) =>
                    setForm({ ...form, firmName: e.target.value })
                  }
                  name="firmName"
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Номер документа основания</FormLabel>
                <Input
                  value={form?.docNumber}
                  onChange={(e) =>
                    setForm({ ...form, docNumber: e.target.value })
                  }
                  name="docNumber"
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Вид услуг</FormLabel>
                <Textarea
                  value={form?.service}
                  onChange={(e) =>
                    setForm({ ...form, service: e.target.value })
                  }
                  name="service"
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Дата окончания</FormLabel>
                <Input
                  value={form?.endDate}
                  onChange={(e) =>
                    setForm({ ...form, endDate: e.target.value })
                  }
                  name="endDate"
                  type="date"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Ссылка на документы в fog</FormLabel>
                <Input
                  value={form?.docLink}
                  onChange={(e) =>
                    setForm({ ...form, docLink: e.target.value })
                  }
                  name="docLink"
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Комментарий</FormLabel>
                <Textarea
                  value={form?.comment}
                  onChange={(e) =>
                    setForm({...form,comment: e.target.value})
                  }
                  name="comment"
                  type="text"
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup size="sm">
              <Button
                leftIcon={<CheckIcon />}
                colorScheme="green"
                variant="solid"
                onClick={addForm}
              >
                Сохранить
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AddButton;
