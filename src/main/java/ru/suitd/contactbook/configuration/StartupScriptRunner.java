package ru.suitd.contactbook.configuration;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.context.annotation.Configuration;

import java.io.BufferedReader;
import java.io.InputStreamReader;


@Slf4j
@Configuration
public class StartupScriptRunner implements BeanPostProcessor {

    @Value("${postgresStart}")
    private String commandDockerPostgresStart;

    @Value("${postgresStop}")
    private String commandDockerPostgresStop;

    @Value("${containerExists}")
    private String psExists;

    @Value("${postgresContainerName}")
    private String postgresContainerName;

    @PostConstruct
    @SneakyThrows
    public void init() {
        Process process = Runtime.getRuntime().exec(psExists + " " + postgresContainerName);
        process.waitFor();
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        if (reader.readLine().equals("false")) {
            process = Runtime.getRuntime().exec(commandDockerPostgresStart + " " + postgresContainerName);
            process.waitFor();
            process.getInputStream().transferTo(System.out);
        }
    }

    @PreDestroy
    @SneakyThrows
    public void shutdown() {
        Process process = Runtime.getRuntime().exec(commandDockerPostgresStop + " " + postgresContainerName);
        process.waitFor();
        process.getInputStream().transferTo(System.out);
        log.info("postgres stopped".toUpperCase());
    }
}
