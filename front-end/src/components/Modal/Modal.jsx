export const Modal = props => {
  return (
    <div className="backdrop" onClick={props.onClose}>
      <section className="modal">{props.children}</section>
    </div>
  );
};
