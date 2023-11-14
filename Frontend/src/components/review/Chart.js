import { Box } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ data, label }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
    },
  };
  const labels = Object.keys(data);
  const chartData = {
    labels,
    datasets: [
      { label: label, data: Object.values(data), backgroundColor: "#1a97f5" },
    ],
  };
  return (
    <Box>
      <Bar options={options} data={chartData} />
    </Box>
  );
};

export default Chart;
