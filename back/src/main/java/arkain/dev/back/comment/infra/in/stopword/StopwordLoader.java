package arkain.dev.back.comment.infra.in.stopword;

import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Slf4j
@Component
public class StopwordLoader {

    private static final String FILE_PATH = "static/stopwords-en.txt";

    private final Set<String> stopwords = new java.util.HashSet<>();

    @PostConstruct
    public void loadStopwords() {
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(new ClassPathResource(FILE_PATH).getInputStream(), StandardCharsets.UTF_8))) {

            stopwords.addAll(reader.lines()
                    .map(String::trim)
                    .filter(line -> !line.isBlank())
                    .map(String::toLowerCase)
                    .collect(Collectors.toSet()));

            log.info("[StopwordLoader] Loaded {} stopwords", stopwords.size());
        } catch (Exception e) {
            log.error("[StopwordLoader] Failed to load stopwords", e);
        }
    }

    public boolean isStopword(String word) {
        return stopwords.contains(word.toLowerCase());
    }
}
