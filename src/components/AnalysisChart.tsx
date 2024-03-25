import { Spin } from "antd";
import { Column } from "@ant-design/plots";
import { BookInfo } from "./AnalysisInfo";
import useAnalysisStore from "../stores/useAnalysisStore";
import { useEffect, useState } from "react";

interface AnalysisChartProps {
  AllBookInfo: BookInfo[];
  isError?: boolean;
  isLoading?: boolean;
}
const AnalysisChart = ({
  AllBookInfo,
  isError,
  isLoading,
}: AnalysisChartProps) => {
  // console.log(data);
  // statistic by book
  console.log(AllBookInfo);
  const PartHideText = (text: string) => {
    return text.length > 8 ? text.substring(0, 8) + "..." : text;
  };
  const { startDate, endDate } = useAnalysisStore();
  const [renderBookInfo, setRender] = useState<BookInfo[]>(AllBookInfo);
  useEffect(() => {
    console.log(startDate);
    console.log(endDate);
    setRender(AllBookInfo);
  }, [AllBookInfo, endDate, startDate]);

  const config = {
    title: {
      title: "书籍热销榜",
      size: 36,
      titleFontSize: 28,
      align: "center",
    },
    data: {
      value: renderBookInfo,
    },
    xField: "title",
    yField: "number",
    colorField: "title",

    label: {
      text: (bi: BookInfo) => `${PartHideText(bi.title)}: ${bi.number}本`,
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
