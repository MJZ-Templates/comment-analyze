package arkain.dev.back.ai.app;

import arkain.dev.back.ai.app.dto.EmotionResponse;

import java.util.List;

public interface AiService {
    List<EmotionResponse> getEmotion(List<String> comments);
}
