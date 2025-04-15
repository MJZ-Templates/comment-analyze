package arkain.dev.back.ai.app.helper;

import arkain.dev.back.ai.app.dto.EmotionResponse;

import java.util.List;

public record EmotionListWrapper(List<EmotionResponse> items) {
}
