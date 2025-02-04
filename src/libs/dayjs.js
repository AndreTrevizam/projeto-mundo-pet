import dayjs from "dayjs";
import "dayjs/locale/pt-br"; // Para locale em português
import utc from "dayjs/plugin/utc"; // Plugin UTC

dayjs.locale("pt-br"); // Define o locale para português
dayjs.extend(utc); // Adiciona suporte a UTC