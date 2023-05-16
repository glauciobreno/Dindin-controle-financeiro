import { formataMoeda } from "../../utils/utils";
import ModalAdd from "../Modal_Adicionar/index";

function Summary({ extrato, isModalVisible, setIsModalVisible }) {
  return (
    <div className="conteiner_summary">
      <h1 className="summary_title">Resumo</h1>
      <div className="container_entrada">
        <strong>
          Entradas<p>{formataMoeda(extrato.entrada)}</p>
        </strong>
      </div>
      <div className="container_saida">
        <strong>
          Saídas<p>{formataMoeda(extrato.saida)}</p>
        </strong>
        <hr />
      </div>
      <div className="container_saldo">
        <strong>
          Saldo<p>{formataMoeda(extrato.entrada - extrato.saida)}</p>
        </strong>
        <button className="tbn_add" onClick={() => setIsModalVisible(true)}>
          Adicionar Registro
        </button>
        {isModalVisible ? (
          <ModalAdd
            titulo={"Adicionar"}
            onClose={() => setIsModalVisible(false)}
          ></ModalAdd>
        ) : null}
      </div>
    </div>
  );
}

export default Summary;
