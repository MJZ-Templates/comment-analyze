package arkain.dev.back.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@Configuration
@EnableAsync
public class AsyncConfig {

    public static final int DEFAULT_POOL_SIZE = 10;
    public static final int DEFAULT_MAX_POOL_SIZE = 20;
    public static final int DEFAULT_QUEUE_CAPACITY = 500;

    @Bean(name = "emotionTaskExecutor")
    public Executor emotionTaskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(DEFAULT_POOL_SIZE);
        executor.setMaxPoolSize(DEFAULT_MAX_POOL_SIZE);
        executor.setQueueCapacity(DEFAULT_QUEUE_CAPACITY);
        executor.setThreadNamePrefix("EmotionExecutor-");
        executor.initialize();
        return executor;
    }
}
