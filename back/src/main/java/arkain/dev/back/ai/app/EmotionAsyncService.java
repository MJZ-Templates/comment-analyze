package arkain.dev.back.ai.app;

import arkain.dev.back.ai.app.dto.EmotionResponse;
import arkain.dev.back.comment.dto.SocialComment;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class EmotionAsyncService {

    private final AiService aiService;

    @Async("emotionTaskExecutor")
    public CompletableFuture<List<EmotionResponse>> analyze(List<SocialComment> comments) {
        List<String> commentTexts = comments.stream().map(SocialComment::comment).toList();
        List<EmotionResponse> emotionResults = aiService.getEmotion(commentTexts);

        // id 붙이기
        List<EmotionResponse> withIds = zipWithId(comments, emotionResults);
        return CompletableFuture.completedFuture(withIds);
    }

    private List<EmotionResponse> zipWithId(List<SocialComment> originals, List<EmotionResponse> results) {
        int size = Math.min(originals.size(), results.size());
        return java.util.stream.IntStream.range(0, size)
                .mapToObj(i -> new EmotionResponse(
                        originals.get(i).id(),
                        originals.get(i).comment(),
                        originals.get(i).likeCount(),
                        results.get(i).emotion()
                ))
                .toList();
    }

}
