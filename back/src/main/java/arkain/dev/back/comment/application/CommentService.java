package arkain.dev.back.comment.application;

import arkain.dev.back.ai.app.EmotionAsyncService;
import arkain.dev.back.ai.app.dto.EmotionResponse;
import arkain.dev.back.ai.app.dto.PagedEmotionResponse;
import arkain.dev.back.comment.dto.PagedSocialComments;
import arkain.dev.back.comment.dto.PagedWordFrequencyResponse;
import arkain.dev.back.comment.dto.SocialComment;
import arkain.dev.back.comment.dto.WordFrequency;
import arkain.dev.back.comment.infra.in.datasource.DataSource;
import arkain.dev.back.comment.infra.in.stopword.StopwordLoader;
import arkain.dev.back.config.AsyncConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final List<DataSource> dataSources;
    private final EmotionAsyncService emotionAsyncService;
    private final StopwordLoader stopwordLoader;

    public PagedSocialComments getComments(String identifier, String order, String nextPageToken) {
        DataSource dataSource = getDataSource(identifier);

        return dataSource.getComments(identifier, order, nextPageToken);
    }

    public PagedEmotionResponse getEmotions(String identifier, String order, String nextPageToken) {
        PagedSocialComments pagedComments = getComments(identifier, order, nextPageToken);
        List<SocialComment> comments = pagedComments.comments();

        List<List<SocialComment>> batches = partition(comments, AsyncConfig.DEFAULT_POOL_SIZE);

        List<CompletableFuture<List<EmotionResponse>>> futures = batches.stream()
                .map(emotionAsyncService::analyze)
                .toList();

        List<EmotionResponse> emotions = futures.stream()
                .map(CompletableFuture::join)
                .flatMap(List::stream)
                .filter(e -> e.comment() != null && !e.comment().trim().isEmpty())
                .toList();

        return new PagedEmotionResponse(emotions, pagedComments.nextPageToken());
    }


    private <T> List<List<T>> partition(List<T> list, int size) {
        int total = list.size();
        int batchCount = (total + size - 1) / size;

        return java.util.stream.IntStream.range(0, batchCount)
                .mapToObj(i -> list.subList(i * size, Math.min(total, (i + 1) * size)))
                .toList();
    }

    private DataSource getDataSource(String url) {
        return dataSources.stream()
                .filter(source -> source.supports(url))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("No data source found"));
    }

    public PagedWordFrequencyResponse getWordFrequencies(String identifier, String order, String nextPageToken) {
        PagedSocialComments pagedComments = getComments(identifier, order, nextPageToken);
        String fullText = pagedComments.comments().stream()
                .map(SocialComment::comment)
                .collect(Collectors.joining(" "));

        List<String> tokens = tokenize(fullText);
        Map<String, Long> frequencyMap = tokens.stream()
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

        List<WordFrequency> sorted = frequencyMap.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .map(e -> new WordFrequency(e.getKey(), e.getValue()))
                .toList();

        return new PagedWordFrequencyResponse(sorted, pagedComments.nextPageToken());
    }


    private List<String> tokenize(String text) {
        return Arrays.stream(text.split("\\W+"))
                .map(String::trim)
                .filter(s -> !s.isBlank())
                .filter(s -> !stopwordLoader.isStopword(s))
                .filter(s -> !s.matches("\\d+")) // 숫자만 있는 토큰 제외
                .map(String::toLowerCase)
                .toList();
    }
}
