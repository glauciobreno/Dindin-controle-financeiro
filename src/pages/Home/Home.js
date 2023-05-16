import "./home.css";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Header from "../../components/Header/Header";
import IconFilter from "../../assets/icon_filter.svg";
import Lista from "../../components/Lista";
import Summary from "../../components/Resumo";
import { getItem } from "../../utils/storage";

function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [listaTrasacao, setListaTrasacao] = useState([]);
  const [extrato, setExtrato] = useState({});
  const [isVisiblePanel, setIsvisiblePanel] = useState(false);
  const [categories, setCategories] = useState([]);

  async function getResumo() {
    try {
      const response = await api.get("/transacao/extrato", {
        headers: {
          Authorization: `Bearer ${getItem("token")}`,
        },
      });
      setExtrato({ ...response.data });
    } catch (error) {
      console.log(error.message);
    }
  }

  async function listarTransiction() {
    const response = await api.get("/transacao", {
      headers: {
        Authorization: `Bearer ${getItem("token")}`,
      },
    });
    setListaTrasacao(response.data);
  }

  async function handleGetCategories() {
    try {
      const response = await api.get("/categorias", {
        headers: {
          Authorization: `Bearer ${getItem("token")}`,
        },
      });

      setCategories(response.data);
    } catch {}
  }

  const [filtros, setFiltros] = useState([]);

  function handleAddFiltro(value) {
    const localFilter = filtros;
    localFilter.push(value.toLowerCase());
    setFiltros(localFilter);
    return;
  }

  async function handleApplyFilter() {
    try {
      const response = await api.get("/transacao", {
        params: {
          filtro: filtros,
        },
        headers: {
          Authorization: `Bearer ${getItem("token")}`,
        },
      });
      console.log(response);
      setListaTrasacao(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function cleanFiltros() {
    await listarTransiction();
    setFiltros([]);
  }

  useEffect(() => {
    listarTransiction();
    getResumo();
    handleGetCategories();
  }, []);

  return (
    <div className="container">
      <Header />
      <div className="conteiner_main">
        <div className="content_table">
          <div className="conteiner_table">
            <div className="conteiner_filter">
              <button
                className="btn_filter"
                onClick={() => setIsvisiblePanel(!isVisiblePanel)}
              >
                <img src={IconFilter} alt="" /> Filtrar
              </button>
              {isVisiblePanel && (
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="filter_panel-list dflex dflex--column">
                    <span className="filters_title">Categoria</span>
                    <ul className="filters_list dflex dflex--row">
                      {categories.map((categories) => (
                        <li key={categories.id} className="filters_list-item">
                          <label>
                            {categories.descricao}
                            <input
                              className="filter_add"
                              type="checkbox"
                              value={categories.descricao}
                              onChange={(e) => handleAddFiltro(e.target.value)}
                            />
                          </label>
                        </li>
                      ))}
                    </ul>
                    <div className="filter_buttons dflex dflex--row">
                      <button
                        onReset={cleanFiltros}
                        className="filter_btn dflex dflex--row flex--center-center"
                        type="reset"
                      >
                        Limpar Filtros
                      </button>
                      <button
                        onClick={handleApplyFilter}
                        className="filter_btn filter_btn-apply dflex dflex--row flex--center-center"
                        type="submit"
                      >
                        Aplicar Filtros
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
            <div className="list_values">
              <div className="header_list">
                <ul className="headerTabela">
                  <li className="linha">Data</li>
                  <li className="linha">Dia da semana</li>
                  <li className="linha">Descrição</li>
                  <li className="linha">Categoria</li>
                  <li className="linha">Valor</li>
                </ul>
              </div>
              <div className="table__list">
                {listaTrasacao &&
                  listaTrasacao.map((transacao) => (
                    <Lista key={transacao.id} transacao={transacao} />
                  ))}
              </div>
            </div>
          </div>
          <Summary
            extrato={extrato}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
