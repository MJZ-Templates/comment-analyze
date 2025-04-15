package arkain.dev.back.comment.infra.in.datasource;

import arkain.dev.back.comment.dto.PagedSocialComments;

public interface DataSource {

    boolean supports(String url);

    PagedSocialComments getComments(String identifier, String order, String nextPageToken);
}
