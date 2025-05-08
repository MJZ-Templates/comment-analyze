import instance from "./instance";

export async function getFrequency(identifier, order, nextPageToken) {
  try {
    const params = { identifier };

    if (order) params.order = order;
    if (nextPageToken) params.nextPageToken = nextPageToken;

    const response = await instance.get("/api/comment/frequency", {
      params,
    });

    console.log("getFrequency response:", response.data);
    console.log("getFrequency data:", response.data.data);

    return response.data.data;
  } catch (error) {
    console.error("fail to getFrequency:", error);
    throw error;
  }
}
