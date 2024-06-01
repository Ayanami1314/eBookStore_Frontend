import { DatePicker, Button } from "antd";
import { Dayjs } from "dayjs";
import useAnalysisStore from "../stores/useAnalysisStore";

const AnalysisDateFilter = () => {
  const { startDate, endDate, setStart, setEnd } = useAnalysisStore();
  return (
    <>
      <DatePicker.RangePicker
        size="large"
        placeholder={["Any Time", "Till Now"]}
        allowEmpty={[true, true]}
        defaultValue={[startDate, endDate]}
        onChange={(dates: (Dayjs | null)[], dateString) => {
          console.log(dates, dateString);
          setStart(dates == null ? null : dates[0]);
          setEnd(dates == null ? null : dates[1]);
        }}
        allowClear={{ clearIcon: <Button>{"清空"}</Button> }}
      />
    </>
  );
};

export default AnalysisDateFilter;
