package com.example.tipphub.hubSystem;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class HubSystem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hubSystemId;
    private LocalDate systemDate;

    public HubSystem() {

    }

    public HubSystem(LocalDate systemDate) {
        this.systemDate = systemDate;
    }

    public Long getId() {
        return hubSystemId;
    }

    public void setId(Long hubSystemId) {
        this.hubSystemId = hubSystemId;
    }

    public LocalDate getSystemDate() {
        return systemDate;
    }

    public void setSystemDate(LocalDate systemDate) {
        this.systemDate = systemDate;
    }

}
