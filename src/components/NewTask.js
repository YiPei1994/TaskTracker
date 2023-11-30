import { useState } from "react";
import { useTracker } from "../useTracker";
import { Button, Container, Input } from "@chakra-ui/react";

function NewTask() {
  const { handleAdd } = useTracker();
  const [idea, setIdea] = useState("");
  const [date, setDate] = useState("");
  function handleClick() {
    if (!idea) return;
    const newTask = {
      id: Math.random(),
      name: idea,
      status: false,
      date: date,
    };
    handleAdd(newTask);
    setIdea("");
  }
  return (
    <Container my="20px">
      <Input
        mb="5px"
        type="text"
        value={idea}
        placeholder="type new task"
        onChange={(e) => setIdea(e.target.value)}
      />
      <Input
        mb="5px"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <Button my="10px" onClick={handleClick}>
        Add task
      </Button>
    </Container>
  );
}

export default NewTask;
