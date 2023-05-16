import "./styles.css";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Close from "../../assets/close.svg";
import { getItem } from "../../utils/storage";
import { ajustaValor, dataForm } from "../../utils/utils";
import { useNavigate } from "react-router";

function ModalEdit({ transacao, id = "modal", onClose = () => {} }) {
  const navigate = useNavigate();
  const [idCategoria, setIdCategoria] = useState(0);
  const [listaCategoria, setListaCategoria] = useState([]);
  const [alert, setAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [form, setForm] = useState({
    tipo: transacao.tipo,
    descricao: transacao.descricao,
    valor: transacao.valor.toFixed(2).toLocaleString(),
    data: dataForm(transacao.data),
    categoria_id: transacao.categoria_id.toString(),
  });

  console.log(form);

  const handleOutsideClick = (event) => {
    if (event.target.id === id) onClose();
  };

  async function ListarCategoria() {
    try {
      const response = await api.get("/categorias", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setListaCategoria(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleAddInputValue(event) {
    const { name, value } = event.target;
    if (name === "data") {
      setForm({ ...form, data: dataForm(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  async function handleSubmitEdit(event) {
    event.preventDefault();
    try {
      if (
        !form.tipo ||
        !form.valor ||
        !form.categoria_id ||
        !form.data ||
        !form.descricao
      ) {
        handleFail();
        showAlert(false);
      }

      const response = await api.put(
        `/transacao/${transacao.id}`,
        {
          tipo: form.tipo.trim(),
          descricao: form.descricao,
          valor: ajustaValor(form.valor),
          data: form.data,
          categoria_id: idCategoria,
        },
        {
          headers: { Authorization: "Bearer " + getItem("token") },
        }
      );

      console.log(response.status);

      setForm({
        tipo: "saida",
        valor: 0,
        categoria_id: "",
        data: "",
        descricao: "",
      });

      if (response.status === 204) {
        setAlert(true);
        handleSuccess();
      } else {
        setAlert(false);
        handleFail();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    ListarCategoria();
  }, []);

  function handleFail() {
    setShowAlert(!showAlert);
    setTimeout(() => {
      setShowAlert(!showAlert);
      navigate("/", { replace: true });
    }, 1000);
  }

  function handleSuccess() {
    setShowAlert(!showAlert);
    setTimeout(() => {
      setShowAlert(!showAlert);
      navigate("/");
    }, 1000);
  }

  return (
    <div id={id} className="modal" onClick={handleOutsideClick}>
      <div className="container_modal">
        <button className="close" onClick={onClose}>
          <img src={Close} alt="fechar" />
        </button>
        <div className="content">
          <form className="form_add" onSubmit={handleSubmitEdit}>
            <h1 className="form_title">Editar Registro</h1>
            <div className="btn_input">
              <div className="radio btn1">
                <label>
                  <input
                    type="radio"
                    name="tipo"
                    value="entrada"
                    onChange={handleAddInputValue}
                  />
                  <span>Entrada</span>
                </label>
              </div>
              <div className="radio btn2">
                <label>
                  <input
                    type="radio"
                    name="tipo"
                    defaultChecked
                    value="saida"
                    onChange={handleAddInputValue}
                  />
                  <span>Saída</span>
                </label>
              </div>
            </div>
            <div className="group_input_add">
              <label htmlFor="valor" className="form_add_label">
                Valor
              </label>
              <input
                id="valor"
                className="form_add_input"
                type="text"
                name="valor"
                value={form.valor}
                onChange={handleAddInputValue}
              />
            </div>
            <div className="group_input_add">
              <label htmlFor="categoria" className="form_add_label">
                Categoria
              </label>
              <select
                id="categoria"
                className="form_add_input"
                name="categoria_id"
                onChange={(t) => setIdCategoria(t.target.value)}
              >
                {listaCategoria.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.descricao}
                  </option>
                ))}
              </select>
            </div>

            <div className="group_input_add">
              <label htmlFor="data" className="form_add_label">
                Data
              </label>
              <input
                id="data"
                className="form_add_input"
                type="date"
                name="data"
                value={form.data}
                onChange={handleAddInputValue}
              />
            </div>

            <div className="group_input_add">
              <label htmlFor="descricao" className="form_add_label">
                Descrição
              </label>
              <input
                id="descricao"
                className="form_add_input"
                type="text"
                name="descricao"
                value={form.descricao}
                onChange={handleAddInputValue}
              />
            </div>
            <button className="form_add__btn" type="submit">
              Confirmar
            </button>
            {showAlert ? (
              <div className={alert ? "alert green" : "alert red"}>
                {alert
                  ? "Registro atualizado com sucesso!"
                  : "Ocorreu um erro! verifique os dados."}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalEdit;
