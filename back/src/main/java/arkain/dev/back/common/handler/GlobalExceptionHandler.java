package arkain.dev.back.common.handler;

import arkain.dev.back.common.dto.ResponseDto;
import arkain.dev.back.common.exception.CommonException;
import arkain.dev.back.common.exception.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.NoHandlerFoundException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = {NoHandlerFoundException.class, HttpRequestMethodNotSupportedException.class})
    public ResponseDto<?> handleNoHandlerFoundException(Exception e) {
        log.error("handleNoHandlerFoundException() in GlobalExceptionHandler throw NoHandlerFoundException : {}", e.getMessage());
        return ResponseDto.fail(new CommonException(ErrorCode.NOT_FOUND_ENDPOINT));
    }

    @ExceptionHandler(value = {MethodArgumentTypeMismatchException.class})
    public ResponseDto<?> handleArgumentNotValidException(MethodArgumentTypeMismatchException e) {
        log.error("handleArgumentNotValidException() in GlobalExceptionHandler throw MethodArgumentTypeMissMatchException : {}", e.getMessage());
        return ResponseDto.fail(e);
    }

    @ExceptionHandler(value = {MissingServletRequestParameterException.class})
    public ResponseDto<?> handleArgumentNotValidException(MissingServletRequestParameterException e) {
        log.error("handleArgumentNotValidException() in GlobalExceptionHandler throw MissingServletRequestParameterException : {}", e.getMessage());
        return ResponseDto.fail(e);
    }

    @ExceptionHandler(value = {CommonException.class})
    public ResponseDto<?> handleCommonException(CommonException e) {
        log.error("handleCommonException() in GlobalExceptionHandler throw CommonException : {}", e.getMessage());
        return ResponseDto.fail(e);
    }

    @ExceptionHandler(value = {Exception.class})
    public ResponseDto<?> handleException(Exception e) {
        log.error("handleException() in GlobalExceptionHandler throw Exception : {}", e.getMessage());
        return ResponseDto.fail(new CommonException(ErrorCode.INTERNAL_SERVER_ERROR));
    }
}