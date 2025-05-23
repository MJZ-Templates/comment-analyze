package arkain.dev.back.common.dto;

import arkain.dev.back.common.exception.CommonException;
import arkain.dev.back.common.exception.ErrorCode;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

public record ResponseDto<T>(
        @JsonIgnore HttpStatus httpStatus,
        Boolean success,
        T data,
        ExceptionDto error) {

    public static <T> ResponseDto<T> ok(final T data) {
        return new ResponseDto<>(HttpStatus.OK, true, data, null);
    }

    public static <T> ResponseDto<T> created(final T data) {
        return new ResponseDto<>(HttpStatus.CREATED, true, data, null);
    }

    public static <T> ResponseDto<T> fail(final MissingServletRequestParameterException e) {
        return new ResponseDto<>(HttpStatus.BAD_REQUEST, false, null, ExceptionDto.of(ErrorCode.MISSING_REQUEST_PARAMETER));
    }

    public static <T> ResponseDto<T> fail(final MethodArgumentTypeMismatchException e) {
        return new ResponseDto<>(HttpStatus.BAD_REQUEST, false, null, ExceptionDto.of(ErrorCode.INVALID_PARAMETER_FORMAT));
    }

    public static <T> ResponseDto<Object> fail (final CommonException e) {
        return new ResponseDto<>(e.getErrorCode().getHttpStatus(), false, null, ExceptionDto.of(e.getErrorCode()));
    }
}
