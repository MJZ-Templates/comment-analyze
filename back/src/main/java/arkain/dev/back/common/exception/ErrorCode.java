package arkain.dev.back.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    MISSING_REQUEST_PARAMETER(400, HttpStatus.BAD_REQUEST, "Missing request parameter"),
    INVALID_PARAMETER(400, HttpStatus.BAD_REQUEST, "Invalid parameter"),
    INVALID_PARAMETER_FORMAT(400, HttpStatus.BAD_REQUEST, "Invalid type value"),

    NOT_FOUND_ENDPOINT(400, HttpStatus.NOT_FOUND, "Not found endpoint"),

    INTERNAL_SERVER_ERROR(500, HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error");

    private final Integer code;
    private final HttpStatus httpStatus;
    private final String message;
}
