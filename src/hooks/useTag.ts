import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { CommonResponse } from "../common/common";

type Tag = string;
type TagResponse = CommonResponse<Tag[]>
const fetchTags = async () => {
    const apiClientInstance = new apiClient<TagResponse>("/tags");
    return apiClientInstance
      .get()
      .then((res) => res.data);
};
const useTags = () => {
    const { data, isError, isLoading } = useQuery<Tag[], Error>({
      queryKey: ["tags", "all"],
      queryFn: () =>
        fetchTags(),
    });
    return { data, isError, isLoading };
};

export { useTags };