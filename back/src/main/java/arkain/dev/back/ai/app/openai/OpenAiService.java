package arkain.dev.back.ai.app.openai;

import arkain.dev.back.ai.app.AiService;
import arkain.dev.back.ai.app.dto.EmotionResponse;
import arkain.dev.back.ai.app.helper.EmotionListWrapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.converter.BeanOutputConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Recover;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class OpenAiService implements AiService {

    private final ChatModel chatModel;
    private final ObjectMapper objectMapper;

    @Value("classpath:/templates/prompt.txt")
    private Resource prompt;

    @Retryable(
            backoff = @Backoff(delay = 1000)
    )
    public List<EmotionResponse> getEmotion(List<String> comments) {
        BeanOutputConverter<EmotionListWrapper> converter = getConverter(EmotionListWrapper.class);
        String format = converter.getFormat();
        PromptTemplate template = createPromptTemplate(prompt);

        String response = callModel(template, Map.of(
                "commentList", comments,
                "format", format));
        EmotionListWrapper result = converter.convert(response);

        assert result != null;
        return result.items();
    }

    private PromptTemplate createPromptTemplate(Resource resource) {
        return new PromptTemplate(resource);
    }

    private <T> BeanOutputConverter<T> getConverter(Class<T> clazz) {
        return new BeanOutputConverter<>(clazz);
    }

    private String callModel(PromptTemplate promptTemplate, Map<String, Object> variables) {
        Prompt prompt = promptTemplate.create(variables);
        ChatResponse response = chatModel.call(prompt);
        return response.getResult().getOutput().getContent();
    }

    @Recover
    public List<EmotionResponse> recover(RuntimeException e, List<String> message) {
        log.error("[OpenAiService] Error occurred while getting emotion: {}", e.getMessage());
        return List.of();
    }
}
