import { format, add, isValid } from "date-fns/esm";
import { ptBR } from "date-fns/locale";

export function formataData(date) {
  const d = isValid(new Date(date))
    ? add(new Date(date), { hours: 3 })
    : new Date();
  return format(d, "dd/MM/yy");
}

export function dataForm(date) {
  const d = add(new Date(date), { hours: 3 });
  return format(d ? d : new Date(), "yyyy-MM-dd");
}

export function diaDaSemana(date) {
  const d = isValid(new Date(date)) ? new Date(date) : 0;
  const localDate = format(d, "EEE", { locale: ptBR });
  return localDate.slice(0, 1).toUpperCase() + localDate.slice(1).toLowerCase();
}

export function formataMoeda(valor) {
  if (!valor) {
    return "R$ 0,00";
  }
  const num = Number(valor);
  return isNaN(num)
    ? "R$ 0,00"
    : num.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
}

export function ajustaValor(valor) {
  if (valor.indexOf(",") !== -1) {
    valor = valor.replace(",", ".");
  }

  const num = Number(valor);
  return isNaN(num) ? 0 : num;
}

export function formatClass(string) {
  return string === "entrada" ? "linha plus" : "linha minus";
}
