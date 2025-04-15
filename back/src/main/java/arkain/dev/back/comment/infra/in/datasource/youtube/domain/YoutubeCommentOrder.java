package arkain.dev.back.comment.infra.in.datasource.youtube.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum YoutubeCommentOrder {
    DEFAULT("time"),
    RELEVANCE("relevance");

    private final String order;

    public static YoutubeCommentOrder from(String value) {
        for (YoutubeCommentOrder order : YoutubeCommentOrder.values()) {
            if (order.getOrder().equalsIgnoreCase(value)) {
                return order;
            }
        }
        return DEFAULT;
    }
}
