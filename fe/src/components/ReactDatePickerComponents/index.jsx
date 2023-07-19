//DatePicker
import ReactDatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";

import { Box, Typography } from "@mui/material";

const ReactDatePickerComponents = ({
  startDate,
  setStartDate,
  setEndDate,
  endDate,
  currentDate,
}) => {
  return (
    <Box display="flex" gap="5px" justifyContent="flex-end">
      <Typography color="#000">Início:</Typography>
      <Box>
        <ReactDatePicker
          locale="ptBR"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
      </Box>
      <Typography color="#000">Fim:</Typography>

      <Box>
        <ReactDatePicker
          locale="ptBR"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={currentDate}
        />
      </Box>
    </Box>
  );
};

export default ReactDatePickerComponents;