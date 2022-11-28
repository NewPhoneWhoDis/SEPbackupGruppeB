package com.example.tipphub.hubSystem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;



@RestController
@RequestMapping(path = "/date")
@CrossOrigin(origins = "http://localhost:4200")
public class HubSystemController {

    private final HubSystemService hubSystemService;

    @Autowired
    public HubSystemController(HubSystemService hubSystemService) {
        this.hubSystemService = hubSystemService;
    }

    @PostMapping("/save")
    public ResponseEntity<LocalDate> saveDate(@RequestBody HubSystem hubSystem) {
        hubSystemService.saveDate(hubSystem);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PutMapping("/change/{dateId}")
    public void changeDate(@PathVariable("dateId") Long dateId, @RequestBody HubSystem hubSystem){
        hubSystemService.changeDate(dateId,hubSystem);
    }

    @GetMapping("/get")
    public LocalDate getDate(){
        return hubSystemService.getDate();
    }

}