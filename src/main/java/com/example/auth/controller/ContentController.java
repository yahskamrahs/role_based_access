package com.example.auth.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Tag(name = "Content", description = "Endpoints to test Role-Based Access Control")
public class ContentController {

    @Operation(summary = "Public endpoint, accessible by anyone")
    @GetMapping("/public/hello")
    public ResponseEntity<String> publicHello() {
        return ResponseEntity.ok("Public content – no auth needed");
    }

    @Operation(summary = "User dashboard, requires USER or ADMIN role", security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/user/dashboard")
    public ResponseEntity<String> userDashboard() {
        return ResponseEntity.ok("Welcome USER");
    }

    @Operation(summary = "Admin dashboard, requires ADMIN role", security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping("/admin/dashboard")
    public ResponseEntity<String> adminDashboard() {
        return ResponseEntity.ok("Welcome ADMIN");
    }
}
