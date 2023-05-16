import "./styles.css";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Close from "../../assets/close.svg";
import { ajustaValor } from "../../utils/utils";
import { useNavigate } from "react-router";
import { cadastrar } from "../../utils/funcoes";

function ModalAdd({ titulo, id = "modal", onClose = () => {} }) {
  const rota = "/transacao";
  const navigate = useNavigate();
  const [idCategoria, setIdCategoria] = useState(0);
  const [listaCategoria, setListaCategoria] = useState([]);
  const [alert, setAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [form, setForm] = useState({
    tipo: "saida",
    descricao: "",
    valor: 0,
    data: "",
    categoria_id: idCategoria,
  });

  const handleOutsideClick = (event) => {
    if (event.target.id === id) onClose();
  };

  function handleResetForm() {
    setForm({
      tipo: "saida",
      descricao: "",
      valor: 0,
      data: "",
      categoria_id: idCategoria,
    });
    return;
  }

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
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmitAdd(event) {
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
      }

      const dataObj = {
        tipo: form.tipo,
        descricao: form.descricao,
        valor: ajustaValor(form.valor),
        data: form.data,
        categoria_id: idCategoria,
      };

      console.log(dataObj);

      const response = await cadastrar(rota, dataObj);
      console.log(response);
      handleResetForm();

      if (response.status === 201) {
        setAlert(true);
        return handleSuccess();
      } else {
        setAlert(false);
        return handleFail();
      }
    } catch (error) {
      console.log(error);
    }
    return;
  }

  useEffect(() => {
    ListarCategoria();
  }, []);

  function handleFail() {
    setShowAlert(!showAlert);
    setTimeout(() => {
      setShowAlert(!showAlert);
      navigate("/", { replace: false });
    }, 1000);
  }

  function handleSuccess() {
    setShowAlert(!showAlert);
    setTimeout(() => {
      setShowAlert(!showAlert);
      navigate("/login");
    }, 1000);
  }

  return (
    <div id={id} className="modal" onClick={handleOutsideClick}>
      <div className="container_modal">
        <button className="close" onClick={onClose}>
          <img src={Close} alt="fechar" />
        </button>
        <div className="content">
          <form className="form_add" onSubmit={handleSubmitAdd}>
            <h1 className="form_title">{titulo} Registro</h1>
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
                type="text"
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
                  ? "Registro adiconado com sucesso!"
                  : "Ocorreu um erro! verifique os dados!"}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalAdd;
