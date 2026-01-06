package com.project.ems.controller;

import com.project.ems.dto.EmployeeDto;
import com.project.ems.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // Add employee
    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(employeeService.createEmployee(employeeDto));
    }

    // Get employee by id
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable Long id){
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    // Get All employees
    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployees(){
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    // Update a employee
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable Long id, @RequestBody EmployeeDto employeeDto){
        return ResponseEntity.ok(employeeService.updateEmployee(id, employeeDto));
    }

    // Delete a employee
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id){
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok("Employee deleted successfully!.");
    }
}
