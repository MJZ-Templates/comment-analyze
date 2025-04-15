package arkain.dev.back.comment.dto;

import java.util.List;

public record PagedWordFrequencyResponse(List<WordFrequency> wordFrequencies, String nextPageToken) {
}
