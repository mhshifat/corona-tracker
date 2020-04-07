import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { fetchDailyData } from "../../api";
import styles from "./Chart.module.css";

const Chart = ({ data, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    (async () => {
      const fetchedData = await fetchDailyData();
      setDailyData(fetchedData);
    })();
  }, []);

  const barChart = data.confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [
              data.confirmed.value,
              data.recovered.value,
              data.deaths.value,
            ],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;

  const lineChart = !!dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            label: "Infected",
            data: dailyData.map(({ confirmed }) => confirmed),
            borderColor: "#3333ff",
            fill: true,
          },
          {
            label: "Deaths",
            data: dailyData.map(({ deaths }) => deaths),
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, .5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
