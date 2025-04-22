package arkain.dev.back.common.ui;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {

    @GetMapping("/api")
    public String healthCheck() {
        return "ok";
    }
}
