package arkain.dev.back.comment.ui;

import arkain.dev.back.ai.app.dto.PagedEmotionResponse;
import arkain.dev.back.comment.app.CommentService;
import arkain.dev.back.comment.dto.PagedSocialComments;
import arkain.dev.back.comment.dto.PagedWordFrequencyResponse;
import arkain.dev.back.common.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class CommentController {

    private final CommentService commentService;

    @GetMapping
    public ResponseDto<PagedSocialComments> getComments(
            @RequestParam("identifier") String identifier,
            @RequestParam(value = "order", required = false) String order,
            @RequestParam(value = "nextPageToken", required = false) String nextPageToken) {
        return ResponseDto.ok(commentService.getComments(identifier, order, nextPageToken));
    }

    @GetMapping("/emotion")
    public ResponseDto<PagedEmotionResponse> getEmotions(
            @RequestParam("identifier") String identifier,
            @RequestParam(value = "order", required = false) String order,
            @RequestParam(value = "nextPageToken", required = false) String nextPageToken
    ) {
        return ResponseDto.ok(commentService.getEmotions(identifier, order, nextPageToken));
    }

    @GetMapping("/frequency")
    public ResponseDto<PagedWordFrequencyResponse> getWordFrequency(
            @RequestParam("identifier") String identifier,
            @RequestParam(value = "order", required = false) String order,
            @RequestParam(value = "nextPageToken", required = false) String nextPageToken
    ) {
        PagedWordFrequencyResponse result = commentService.getWordFrequencies(identifier, order, nextPageToken);
        return ResponseDto.ok(result);
    }
}
