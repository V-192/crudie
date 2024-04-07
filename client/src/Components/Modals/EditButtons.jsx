import {
  Box,
  Input,
  Button,
  ButtonGroup,
  Stack,
  useDisclosure,
  Textarea,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, CheckIcon } from "@chakra-ui/icons";
import { useState } from "react";
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


const EditButtons = function (contracts) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [form, setForm] = useState({
    firmName: contracts.value.firmName,
    docNumber: contracts.value.docNumber,
    service: contracts.value.service,
    endDate: contracts.value.endDate,
    docLink: contracts.value.docLink,
    comment: contracts.value.comment
  });

  const deleteContract = async (_id) => {
    const res = await axios.delete(`/api/license/${_id}`);
    window.location.reload()
    //TODO: Впиндюрить нормальное обновление окна
  };

  const updateContract = async (_id) => {
    const res = await axios.put(
      `/api/license/${_id}`,
      form
    );
    window.location.reload()
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
              <Textarea
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                name="comment"
                placeholder="Комментарий"
                defaultValue={contracts.value.comment}
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

export default EditButtons