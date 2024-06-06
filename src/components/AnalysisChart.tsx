import { Spin } from "antd";
import { Column } from "@ant-design/plots";
import { BookAnalysis } from "../hooks/useAnalysis";

interface AnalysisChartProps {
  analysis: BookAnalysis[];
  isError?: boolean;
  isLoading?: boolean;
}
const AnalysisChart = ({
  analysis: AllBookAnalysis,
  isError,
  isLoading,
}: AnalysisChartProps) => {
  // console.log(data);
  // statistic by book
  const PartHideText = (text: string) => {
    return text.length > 8 ? text.substring(0, 8) + "..." : text;
  };
  type renderDataType = {
    title: string;
    number: number;
    price: number;
  };
  const renderData: renderDataType[] = AllBookAnalysis.map((bi) => ({
    title: PartHideText(bi.book.title),
    number: bi.total_sales,
    price: bi.total_price,
  }));
  const config = {
    title: {
      title: "书籍热销榜",
      size: 36,
      titleFontSize: 28,
      align: "center",
    },
    data: {
      value: renderData,
    },
    xField: "title",
    yField: "number",
    colorField: "title",

    label: {
      text: (bi: renderDataType) => `${PartHideText(bi.title)}: ${bi.number}本`,
      textBaseline: "bottom",
      fontSize: 14,
    },
    axis: {
      x: {
        title: "书籍名称",
      },
    },
    style: {
      // 圆角样式
      radiusTopLeft: 10,
      radiusTopRight: 10,
    },
  };
  return (
    <>
      {isError && <div>Failed to load data</div>}
      {isLoading && <Spin size="large" />}
      <Column {...config} />
    </>
  );
};
export default AnalysisChart;
