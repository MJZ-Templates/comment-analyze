package arkain.dev.back.ai.app.dto;

import java.util.List;

public record PagedEmotionResponse(List<EmotionResponse> comments, String nextPageToken) {
}
