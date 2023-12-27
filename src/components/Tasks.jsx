import { format } from "date-fns";
import { useTracker } from "../useTracker";
import { Button, Container, Flex, Text, Select } from "@chakra-ui/react";

function Tasks() {
  const { handleSort } = useTracker();
  const { handleDelete, handleStatus, tasks } = useTracker();

  return (
    <Flex flexDirection="column">
      <Select onChange={(e) => handleSort(e.target.value)}>
        <option value="default">Sort</option>
        <option value="asc">Sort incomplete first</option>
        <option value="desc">Sort complete first </option>
        <option value="dateAsc">Sort date earlier first</option>
        <option value="dateDesc">Sort date late first </option>
      </Select>
      <Container>
        {tasks?.map((task) => (
          <Flex align="center" my="10px" key={task.id}>
            <Text mr="5px">{task.name}</Text>
            <Text mr="5px">{format(new Date(task.date), "MM dd yyyy")}</Text>
            <Button mr="5px" onClick={() => handleDelete(task.id)}>
              Delete
            </Button>
            <Button mr="5px" onClick={() => handleStatus(task.id)}>
              {task.status ? "complete" : "incomplete"}
            </Button>
          </Flex>
        ))}
      </Container>
    </Flex>
  );
}

export default Tasks;
