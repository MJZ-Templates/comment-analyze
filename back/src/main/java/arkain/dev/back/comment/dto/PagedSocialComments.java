package arkain.dev.back.comment.dto;

import java.util.List;

public record PagedSocialComments(List<SocialComment> comments, String nextPageToken) {
}
