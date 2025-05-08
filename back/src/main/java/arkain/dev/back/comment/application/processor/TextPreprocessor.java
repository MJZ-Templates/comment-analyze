package arkain.dev.back.comment.application.processor;

import java.util.regex.Pattern;

public class TextPreprocessor {

    // 정규식 패턴
    private static final Pattern HTML_TAG_PATTERN = Pattern.compile("<[^>]*>");
    private static final Pattern EMOJI_PATTERN = Pattern.compile("[\\p{So}\\p{Cn}]"); // 유니코드 기호, 이모지
    private static final Pattern URL_PATTERN = Pattern.compile("https?://\\S+|www\\.\\S+");
    private static final Pattern AD_PATTERN = Pattern.compile("(?i)(구독|좋아요|클릭|광고|이벤트|할인|무료|배송비|지금 신청|바로가기)");

    public static String cleanText(String raw) {
        if (raw == null || raw.isBlank()) return "";

        String cleaned = raw;

        // 1. HTML 태그 제거
        cleaned = HTML_TAG_PATTERN.matcher(cleaned).replaceAll(" ");

        // 2. URL 제거
        cleaned = URL_PATTERN.matcher(cleaned).replaceAll(" ");

        // 3. 이모지 제거
        cleaned = EMOJI_PATTERN.matcher(cleaned).replaceAll(" ");

        // 4. 광고 문구 제거
        cleaned = AD_PATTERN.matcher(cleaned).replaceAll(" ");

        // 5. 불필요한 공백 정리
        cleaned = cleaned.replaceAll("\\s+", " ").trim();

        return cleaned;
    }
}
