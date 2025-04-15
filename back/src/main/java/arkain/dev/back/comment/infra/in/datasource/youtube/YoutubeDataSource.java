package arkain.dev.back.comment.infra.in.datasource.youtube;

import arkain.dev.back.comment.dto.PagedSocialComments;
import arkain.dev.back.comment.dto.SocialComment;
import arkain.dev.back.comment.infra.in.datasource.DataSource;
import arkain.dev.back.comment.infra.in.datasource.sanitizer.TextSanitizer;
import arkain.dev.back.comment.infra.in.datasource.youtube.converter.DateTimeConverter;
import arkain.dev.back.comment.infra.in.datasource.youtube.domain.YoutubeCommentOrder;
import arkain.dev.back.comment.infra.in.datasource.youtube.parser.YoutubeUrlParser;
import arkain.dev.back.common.exception.CommonException;
import arkain.dev.back.common.exception.ErrorCode;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.Comment;
import com.google.api.services.youtube.model.CommentSnippet;
import com.google.api.services.youtube.model.CommentThread;
import com.google.api.services.youtube.model.CommentThreadListResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class YoutubeDataSource implements DataSource {

    private static final String YOUTUBE_DOMAIN = "youtube";

    @Value("${youtube.api.key}")
    private String apiKey;

    private final YouTube youTube;

    @Override
    public boolean supports(String url) {
        return url.contains(YOUTUBE_DOMAIN);
    }

    @Override
    public PagedSocialComments getComments(String identifier, String order, String nextPageToken) {
        String videoId = YoutubeUrlParser.extractVideoId(identifier);
        YoutubeCommentOrder commentOrder = initOrder(order);
        CommentThreadListResponse response = fetchComments(videoId, commentOrder, nextPageToken);

        List<SocialComment> comments = new ArrayList<>();
        if (response == null) {
            return new PagedSocialComments(comments, null);
        }

        response.getItems()
                .forEach(thread -> {
                    Comment topLevelComment = thread.getSnippet().getTopLevelComment();
                    comments.add(toSocialComment(topLevelComment));
                    addReplies(thread, comments);
                });

        return new PagedSocialComments(comments, response.getNextPageToken());
    }

    private YoutubeCommentOrder initOrder(String order) {
        if (order != null) {
            return YoutubeCommentOrder.from(order);
        }

        return YoutubeCommentOrder.DEFAULT;
    }

    private CommentThreadListResponse fetchComments(String videoId, YoutubeCommentOrder order, String nextPageToken) {
        try {
            YouTube.CommentThreads.List request = youTube.commentThreads().list("snippet,replies")
                    .setKey(apiKey)
                    .setVideoId(videoId)
                    .setMaxResults(100L)
                    .setOrder(order.getOrder())
                    .setPageToken(nextPageToken);

            return request.execute();
        } catch (IOException e) {
            throw new CommonException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

    private SocialComment toSocialComment(Comment comment) {
        CommentSnippet snippet = comment.getSnippet();
        return new SocialComment(
                comment.getId(),
                snippet.getAuthorDisplayName(),
                TextSanitizer.sanitize(snippet.getTextDisplay()),
                snippet.getLikeCount(),
                DateTimeConverter.convert(snippet.getPublishedAt()
                ));
    }

    private void addReplies(CommentThread thread, List<SocialComment> comments) {
        if (thread.getReplies() == null) {
            return;
        }
        thread.getReplies().getComments().stream()
                .map(this::toSocialComment)
                .forEach(comments::add);
    }
}
