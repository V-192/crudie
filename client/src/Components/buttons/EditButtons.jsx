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
import { DeleteIcon, EditIcon, CheckIcon, AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import axios from "../axios.js";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export const EditButtons = function (contracts) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [form, setForm] = useState({
    firmName: contracts.value.firmName,
    docNumber: contracts.value.docNumber,
    service: contracts.value.service,
    endDate: contracts.value.endDate,
    docLink: contracts.value.docLink,
  });

  const deleteContract = async (_id) => {
    const res = await axios.delete(`http://localhost:3000/api/license/${_id}`);
    //TODO: Впиндюрить нормальное обновление окна
  };

  const updateContract = async (_id) => {
    const res = await axios.put(
      `http://localhost:3000/api/license/${_id}`,
      form
    );
    //TODO: Впиндюрить нормальное обновление окна
  };
  return (
    <Box display="flex" alignItems="right" justifyContent="right">
      <ButtonGroup size="sm">
        <Button colorScheme="orange" variant="outline" onClick={onOpen}>
          <EditIcon />
        </Button>
      </ButtonGroup>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Изменить</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Input
                onChange={(e) => setForm({ ...form, firmName: e.target.value })}
                name="firmName"
                placeholder="Название фирмы"
                defaultValue={contracts.value.firmName}
              />
              <Input
                onChange={(e) =>
                  setForm({ ...form, docNumber: e.target.value })
                }
                name="docNumber"
                placeholder="Номер документа основания"
                defaultValue={contracts.value.docNumber}
              />
              <Textarea
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                name="service"
                placeholder="Вид услуг"
                defaultValue={contracts.value.service}
              />
              <Input
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                name="endDate"
                placeholder="Дата окончания"
                defaultValue={contracts.value.endDate}
                type="date"
              />
              <Input
                onChange={(e) => setForm({ ...form, docLink: e.target.value })}
                name="docLink"
                placeholder="Ссылка на документы в fog"
                defaultValue={contracts.value.docLink}
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup size="sm">
              <Button
                leftIcon={<CheckIcon />}
                colorScheme="green"
                variant="solid"
                onClick={() => updateContract(contracts.value._id)}
              >
                Сохранить
              </Button>
              <Button
                leftIcon={<DeleteIcon />}
                colorScheme="red"
                variant="outline"
                onClick={() => deleteContract(contracts.value._id)}
              >
                Удалить
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

//Add license
export const AddButton = function () {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [form, setForm] = useState({
    firmName: "",
    docNumber: "",
    service: "",
    endDate: "",
    docLink: "",
  });
  const addForm = async () => {
    await axios.post("http://localhost:3000/api/license", form);
    setForm({
      firmName: "",
      docNumber: "",
      service: "",
      endDate: "",
      docLink: "",
    });
  };

  return (
    <Box display="flex" alignItems="right" justifyContent="right">
      <ButtonGroup size="sm">
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
