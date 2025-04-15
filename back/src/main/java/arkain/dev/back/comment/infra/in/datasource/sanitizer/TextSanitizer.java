package arkain.dev.back.comment.infra.in.datasource.sanitizer;

import java.util.regex.Pattern;

public class TextSanitizer {

    private static final Pattern A_TAG_PATTERN = Pattern.compile("<a[^>]*?>[^<]*?</a>");
    private static final Pattern BR_TAG_PATTERN = Pattern.compile("(?i)<br\\s*/?>");
    private static final Pattern HTML_TAG_PATTERN = Pattern.compile("<[^>]+>");
    private static final Pattern TIME_PATTERN = Pattern.compile("\\b\\d{1,2}:\\d{2}(?::\\d{2})?(?:\\.\\d+)?\\b");
    private static final Pattern EMOJI_PATTERN = Pattern.compile("[\uD83C-\uDBFF\uDC00-\uDFFF]+");
    private static final Pattern MULTIPLE_DOTS_PATTERN = Pattern.compile("\\.{2,}");
    private static final Pattern NEWLINE_PATTERN = Pattern.compile("[\\r\\n]+");
    private static final Pattern MULTIPLE_SPACES_PATTERN = Pattern.compile("\\s{2,}");

    public static String sanitize(String html) {
        if (html == null || html.isEmpty()) {
            return "";
        }

        String result = html;

        // 1. remove <a> tags
        result = A_TAG_PATTERN.matcher(result).replaceAll("");
        // 2. replace <br> with space
        result = BR_TAG_PATTERN.matcher(result).replaceAll(" ");
        // 3. remove other HTML tags
        result = HTML_TAG_PATTERN.matcher(result).replaceAll("");
        // 4. remove time patterns
        result = TIME_PATTERN.matcher(result).replaceAll("");
        // 5. remove emojis
        result = EMOJI_PATTERN.matcher(result).replaceAll("");
        // 6. replace multiple dots with one
        result = MULTIPLE_DOTS_PATTERN.matcher(result).replaceAll(".");
        // 7. replace line breaks
        result = NEWLINE_PATTERN.matcher(result).replaceAll(" ");
        // 8. collapse multiple spaces
        result = MULTIPLE_SPACES_PATTERN.matcher(result).replaceAll(" ");

        return result.trim();
    }
}
