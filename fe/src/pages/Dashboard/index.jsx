import "react-datepicker/dist/react-datepicker.css";

//Styles
import {GridContainer, StatBoxContainer, GridFiller} from "./styles";

//MUI
import {Box, useMediaQuery, useTheme} from "@mui/material";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import EngineeringIcon from "@mui/icons-material/Engineering";

import StatBox from "../../components/StatBox";

//Hooks
import {useAuth} from "../../hooks/useAuth";

import Loader from "../../components/Loader";
import FiltersContainer from "../../components/FiltersContainer";

import {useDashboard} from "./DashboardContext/useDashboard";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import EmptyList from "../../components/EmptyList";

const Dashboard = () => {
  const {isUserAdm} = useAuth();
  const theme = useTheme();

  const isNonMobile = useMediaQuery("(min-width:800px)");

  const {
    efficiencies,
    isLoading,
    rigs,
    selectedRig,
    handleRigChange,
    totalAvailableHours,
    totalHoursPercentage,
    totalGlossHours,
    totalGlossHoursPercentage,
    totalDtmss,
    totalMovimentations,
    handleStartDateFiltersChange,
    handleEndDateFiltersChange,
    startDate,
    endDate,
    currentDate,
  } = useDashboard();

  const isRigSelected = selectedRig !== undefined;

  const hasEfficiencies = efficiencies?.length > 0;

  return (
    <Box height="90%" width="100%" padding="0 2rem">
      <FiltersContainer
        isSelectVisible
        startDate={startDate}
        endDate={endDate}
        handleStartDateChange={handleStartDateFiltersChange}
        handleEndDateChange={handleEndDateFiltersChange}
        currentDate={currentDate}
        rigs={rigs}
        handleRigChange={handleRigChange}
        selectedRig={selectedRig}
        isUserAdm={isUserAdm}
      />
      {isLoading && <Loader size="100" />}

      {!isLoading && !isRigSelected && (
        <EmptyList>
          Selecione uma <strong>Sonda</strong>!
        </EmptyList>
      )}

      {!isLoading && !hasEfficiencies && isRigSelected && (
        <EmptyList>
          Não existe <strong>dados</strong> para a sonda na data{" "}
          <strong>selecionada</strong>!
        </EmptyList>
      )}

      {!isLoading && isRigSelected && hasEfficiencies && (
        <>
          <GridContainer isNonMobile={isNonMobile}>
            <StatBoxContainer theme={theme}>
              <StatBox
                red={false}
                icon={<EngineeringIcon />}
                title={`${totalAvailableHours} Hrs`}
                subtitle="Horas Disponível"
                percentage={`${totalHoursPercentage}%`}
                progress={totalHoursPercentage / 100}
              />
            </StatBoxContainer>
            <StatBoxContainer theme={theme}>
              <StatBox
                red={true}
                color={theme.palette.red[500]}
                icon={<HighlightOffOutlinedIcon />}
                title={`${totalGlossHours} Hrs`}
                subtitle="Horas Indisponível"
                percentage={`${totalGlossHoursPercentage}%`}
                progress={totalGlossHoursPercentage / 100}
              />
            </StatBoxContainer>
            <StatBoxContainer theme={theme}>
              <StatBox
                icon={<DataThresholdingIcon />}
                title={` DTMs: ${totalDtmss}`}
                subtitle="Quantidade de DTMs no mês"
                percentage=""
                progress={0}
              />
            </StatBoxContainer>
            <StatBoxContainer theme={theme}>
              <StatBox
                icon={<DataThresholdingIcon />}
                title={`Movimentações: ${totalMovimentations}`}
                subtitle="Movimentações no mês"
                percentage=""
                progress={0}
              />
            </StatBoxContainer>

            {isNonMobile && <GridFiller />}

            <Box
              gridColumn="span 10"
              gridRow="span 3"
              backgroundColor={theme.palette.grey[400]}
              borderRadius=".25rem"
            >
              <LineChart
                isDashboard
                efficiencies={efficiencies}
                selectedRig={selectedRig}
              />
            </Box>

            {isNonMobile && <GridFiller />}

            {isNonMobile && <GridFiller />}

            {isUserAdm && (
              <Box
                gridColumn="span 10"
                gridRow="span 3"
                backgroundColor={theme.palette.grey[400]}
                borderRadius=".25rem"
              >
                <BarChart
                  chartKeys="availableHours"
                  barChartLegend="Horas Disponível"
                  isDashboard
                  dataType="hours"
                />
              </Box>
            )}

            {!isUserAdm && (
              <Box
                gridColumn="span 10"
                gridRow="span 3"
                backgroundColor={theme.palette.grey[400]}
                borderRadius=".25rem"
                overflow="auto"
              >
                {/* <ListEfficiencies
                  efficiencies={efficiencies}
                  selectedRig={selectedRig}
                  startDate={startDate}
                  endDate={endDate}
                /> */}
              </Box>
            )}

            {isNonMobile && <GridFiller />}
          </GridContainer>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
