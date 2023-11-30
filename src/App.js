import { Button, Container, Heading } from "@chakra-ui/react";
import NewTask from "./components/NewTask";
import Tasks from "./components/Tasks";
import { useTracker } from "./useTracker";

function App() {
  const { show, handleShow } = useTracker();
  return (
    <Container textAlign="center">
      <Heading textAlign="center" my="20px">
        Task Tracker
      </Heading>

      <Button mt="20px" onClick={handleShow}>
        Add more Tasks
      </Button>
      {show && <NewTask />}

      <Tasks />
    </Container>
  );
}

export default App;
