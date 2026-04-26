import { color } from "@styles/colors";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import useReportsState from "./hooks/useReportsState";

const ReportChart = (): React.ReactElement => {
  const { reportData } = useReportsState();
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={reportData.equityCurve}>
        <defs>
          <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={color("SystemLightGreen")}
              stopOpacity={0.4}
            />
            <stop
              offset="100%"
              stopColor={color("SystemLightGreen")}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <Area
          type="monotone"
          dataKey="equity"
          stroke={color("SystemLightGreen")}
          strokeWidth={2}
          fill="url(#colorEquity)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ReportChart;
