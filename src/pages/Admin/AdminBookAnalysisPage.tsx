import FullBookAnalysis from "../../components/FullBookAnalysis";
import { useBookAnalysis } from "../../hooks/useAnalysis";
import useAnalysisStore from "../../stores/useAnalysisStore";
import { dayToString } from "../../utils/date";

const AdminBookAnalysisPage = () => {
  const { startDate, endDate, keyword } = useAnalysisStore();
  const TimeQuery = {
    start: dayToString(startDate),
    end: dayToString(endDate),
    keyword: keyword,
  };
  const { data, isLoading, isError } = useBookAnalysis(TimeQuery);
  return (
    <FullBookAnalysis analysis={data} isLoading={isLoading} isError={isError} />
  );
};

export default AdminBookAnalysisPage;
