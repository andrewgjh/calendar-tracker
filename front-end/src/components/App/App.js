import "./App.css";
import { Calendar, Navigation, Modal } from "components";
import { useModal } from "hooks";

export const App = () => {
  const { showModal, toggleModal } = useModal();
  return (
    <div className="App">
      <Navigation />
      <Calendar />
      {showModal && <Modal onClose={toggleModal}></Modal>}
    </div>
  );
};
