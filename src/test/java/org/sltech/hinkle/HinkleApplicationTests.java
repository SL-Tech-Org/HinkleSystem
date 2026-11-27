package org.sltech.hinkle;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.jdbc.core.JdbcTemplate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class HinkleApplicationTests {
    @Test
    void reportsHealthyApplication(@LocalServerPort int port) throws Exception {
        var request = HttpRequest.newBuilder(URI.create("http://localhost:" + port + "/actuator/health")).build();
        var response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        assertEquals(200, response.statusCode());
        assertTrue(response.body().contains("\"UP\""));
    }

    @Test
    void canQueryDatabase(@Autowired JdbcTemplate database) {
        assertEquals(1, database.queryForObject("select 1", Integer.class));
    }
}
