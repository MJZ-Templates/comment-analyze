package arkain.dev.back.comment.infra.in.datasource.youtube.converter;

import com.google.api.client.util.DateTime;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

public class DateTimeConverter {
    public static LocalDateTime convert(DateTime dateTime) {
        return Instant.ofEpochMilli(dateTime.getValue())
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();
    }
}
