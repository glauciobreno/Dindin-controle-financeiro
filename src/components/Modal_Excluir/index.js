import "./styles.css";
import Arrow from "../../assets/arrow.svg";

function ModalExcluir({
  id,
  userId,
  deleteTransaction,
  showExcluir,
  setShowExcluir,
}) {
  function handleCancelar() {
    setShowExcluir(!showExcluir);
  }

  return (
    <div className="modal-excluir" id={id}>
      <div className="modal-title">
        <img src={Arrow} alt="Seta" className="seta" />
        <h3 className="question">Apagar Item?</h3>
      </div>
      <div className="btn-group">
        <button
          type="button"
          onClick={() => deleteTransaction(id)}
          className="btn btn-sim"
        >
          Sim
        </button>
        <button
          type="button"
          onClick={() => handleCancelar()}
          className="btn btn-nao"
        >
          Não
        </button>
      </div>
    </div>
  );
}

export default ModalExcluir;
