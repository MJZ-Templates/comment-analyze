package arkain.dev.back.comment.dto;

import java.time.LocalDateTime;

public record SocialComment(
        String id,
        String author,
        String comment,
        long likeCount,
        LocalDateTime publishedAt
) {
}
