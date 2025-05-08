import instance from "./instance";

export async function getEmotions(identifier, order, nextPageToken) {
  try {
    const params = { identifier };

    if (order) params.order = order;
    if (nextPageToken) params.nextPageToken = nextPageToken;

    const response = await instance.get("/api/comment/emotion", {
      params,
    });

    return response.data.data;
  } catch (error) {
    console.error("fail to getEmotions:", error);
    throw error;
  }
}
