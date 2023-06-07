class EfficiencyMapper {
  toPersitence(domainEfficiency) {}

  toDomain(persistenceEfficiencyPeriods, date, user) {
    const toDatabase = persistenceEfficiencyPeriods.reduce(
      (acc, period, index) => {
        console.log("acc", acc);

        //Transforma as horas em minutos

        //Hora
        const startHourInMinutes =
          period.startHour.$H * 60 + period.startHour.$m;

        let endHourInMinutes = 0;

        if (period.endHour.$H === 23 && period.endHour.$m === 55) {
          endHourInMinutes = 1440;
        } else {
          endHourInMinutes = period.endHour.$H * 60 + period.endHour.$m;
        }

        console.log("period.equipmentRatio", period.equipmentRatio);

        if (period.equipmentRatio) {
          acc["equipment_ratio"].push(period.equipmentRatio);
        }

        if (period.fluidRatio) {
          acc["fluid_ratio"].push(period.fluidRatio);
        }

        acc["totalHoursInMinutes"] += endHourInMinutes - startHourInMinutes;

        //Transforma as horas em String

        //Função para adicionar um dígito na string
        const addDigit = (digits) => {
          let string = digits.toString();

          if (string.length < 2) {
            string = `0${string}`;
            return string;
          }

          return digits;
        };

        const startHour = addDigit(period.startHour.$H);
        const endHour = addDigit(period.endHour.$H);
        const startMinute = addDigit(period.startHour.$m);
        const endMinute = addDigit(period.endHour.$m);

        if (period.type === "working") {
          acc["available_hours"] +=
            (endHourInMinutes - startHourInMinutes) / 60;

          acc["working_periods"].push({
            start_time: `${startHour}:${startMinute}:00`,
            end_time: `${endHour}:${endMinute}:00`,
            description: period.description,
            oil_well_id: period.oilWell,
          });
        }

        if (period.type === "dtm") {
          acc["dtm_periods"].push({
            start_time: `${startHour}:${startMinute}:00`,
            end_time: `${endHour}:${endMinute}:00`,
            dtm_distance: period.DTMDistance,
            description: period.description,
            oil_well_id: period.oilWell,
          });

          acc["available_hours"] +=
            (endHourInMinutes - startHourInMinutes) / 60;

          acc["dtm_hours"] += (endHourInMinutes - startHourInMinutes) / 60;

          return acc;
        }

        if (period.type === "repair") {
          acc["repair_periods"].push({
            start_time: `${startHour}:${startMinute}:00`,
            end_time: `${endHour}:${endMinute}:00`,
            repair_classification: period.repairClassification,
            description: period.description,
            oil_well_id: period.oilWell,
          });

          return acc;
        }

        if (period.type === "gloss") {
          acc["gloss_periods"].push({
            start_time: `${startHour}:${startMinute}:00`,
            end_time: `${endHour}:${endMinute}:00`,
            gloss_classification: period.glossClassification,
            description: period.description,
            oil_well_id: period.oilWell,
          });

          return acc;
        }

        return acc;
      },
      {
        working_periods: [],
        gloss_periods: [],
        repair_periods: [],
        dtm_periods: [],
        equipment_ratio: [],
        fluid_ratio: [],
        available_hours: 0,
        dtm_hours: 0,

        totalHoursInMinutes: 0,
      }
    );

    return {
      ...toDatabase,
      date: date,
      user_id: user.id,
      rig_id: user.rig_id,
      efficiency: (toDatabase.available_hours.toFixed(2) / 24) * 100,
    };
  }

  toDataGrid(efficiencyData) {
    let allPeriods = [];

    // Função para adicionar períodos ao array
    const addPeriodsToArray = (periods, type) => {
      periods.forEach((period) => {
        let formattedPeriod = null;
        if (type === "repair") {
          formattedPeriod = {
            id: period.id,
            start_hour: period.start_hour,
            end_hour: period.end_hour,
            description: period.description,
            classification: period.classification,
            oil_well_name: period.oil_well_name,
            type: "Reparo",
          };
        }

        if (type === "gloss") {
          formattedPeriod = {
            id: period.id,
            start_hour: period.start_hour,
            end_hour: period.end_hour,
            description: period.description,
            classification: period.type,
            oil_well_name: period.oil_well_name,
            type: "Glosa",
          };
        }

        if (type === "working") {
          formattedPeriod = {
            id: period.id,
            start_hour: period.start_hour,
            end_hour: period.end_hour,
            description: period.description,
            oil_well_name: period.oil_well_name,
            type: "Operando",
          };
        }

        if (type === "DTM") {
          formattedPeriod = {
            id: period.id,
            start_hour: period.start_hour,
            end_hour: period.end_hour,
            description: period.description,
            classification: period.distance,
            oil_well_name: period.oil_well_name,
            type: "DTM",
          };
        }
        allPeriods.push(formattedPeriod);
      });
    };

    // Adicionando os períodos de cada tipo ao array
    addPeriodsToArray(efficiencyData.gloss_periods, "gloss");
    addPeriodsToArray(efficiencyData.repair_periods, "repair");
    addPeriodsToArray(efficiencyData.operating_periods, "working");
    addPeriodsToArray(efficiencyData.dtm_periods, "DTM");

    // Imprimindo o array com todos os períodos
    console.log("All PEriods =>", allPeriods);

    return allPeriods;
  }
}

export default new EfficiencyMapper();
