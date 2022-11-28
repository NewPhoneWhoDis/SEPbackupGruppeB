package com.example.tipphub.league;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface GamedayRepository extends JpaRepository<Gameday, LocalDate> {
    public void deleteById(Long id);
}
